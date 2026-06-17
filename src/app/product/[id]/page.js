"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { shopConfig } from "@/config/shop";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Send, Heart, Shield, RefreshCw, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetail({ params }) {
  // Resolve params as Promise (Next.js 15+ & 16 convention)
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { addToCart } = useCart();

  // Find product by resolved ID
  const product = shopConfig.products.find((p) => p.id === productId);

  // Set default interactive states
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [isFavorite, setIsFavorite] = useState(false);

  // If product not found
  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center text-foreground">
        <h2 className="font-display text-2xl font-bold">Product Not Found</h2>
        <p className="text-sm text-foreground/50 mt-2">
          The sneaker you are looking for does not exist in our catalog.
        </p>
        <button className="mt-8 rounded-full bg-brand-primary px-6 py-2.5 font-display text-xs font-bold text-white hover:bg-brand-primary-hover shadow-lg">
          <Link href="/shop">Back to Shop Catalog</Link>
        </button>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  // Single Product WhatsApp Link Builder
  const handleWhatsAppCheckout = () => {
    const text = `Hello SoleVibe! I would like to order:
*${product.name}*
- Brand: ${product.brand}
- Size: ${selectedSize}
- Color: ${selectedColor}
- Price: ${shopConfig.currency}${product.price}

Please verify availability and payment details. Thank you!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${shopConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background text-foreground min-h-screen">
      {/* Breadcrumbs trail */}
      <nav className="mb-8 text-xs font-bold text-foreground/45 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-primary transition-colors">SoleVibe</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-primary transition-colors">Catalog</Link>
        <span>/</span>
        <span className="text-foreground capitalize">{product.category}</span>
      </nav>

      {/* Main product presentation */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Gallery & Hero Image Presentation (7/12 Width) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative aspect-square rounded-[40px] overflow-hidden border border-foreground/5 bg-card-light dark:bg-card-dark flex items-center justify-center p-6 shadow-xs">
            {/* Tag label overlay */}
            {product.tag && (
              <span className="absolute left-6 top-6 z-10 rounded-full bg-brand-primary px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-primary/20">
                {product.tag}
              </span>
            )}
            
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center rounded-[32px] drop-shadow-[0_20px_20px_rgba(0,0,0,0.06)]"
            />
          </div>

          {/* Micro showcase galleries (UI only) */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="aspect-square rounded-2xl overflow-hidden border border-foreground/5 bg-card-light dark:bg-card-dark cursor-pointer hover:border-brand-primary/40 transition-colors p-2 flex items-center justify-center"
              >
                <img
                  src={product.image}
                  alt={`${product.name} alternate view`}
                  className="h-full w-full object-cover object-center rounded-xl opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Specifications & checkout actions (5/12 Width) */}
        <div className="lg:col-span-5 flex flex-col justify-between pr-2">
          <div className="flex flex-col gap-6">
            
            {/* Brand Title section */}
            <div>
              <span className="text-xs font-black tracking-widest text-brand-primary uppercase">
                {product.brand} COLLECTION
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-2 leading-tight">
                {product.name}
              </h1>
              
              {/* Reviews score placeholder */}
              <div className="flex items-center gap-2 mt-3 text-sm">
                <span className="flex text-orange-400">★★★★★</span>
                <span className="text-foreground/50 text-xs font-bold font-display">(24 reviews)</span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-foreground/10">
              <span className="font-display text-3xl font-extrabold text-foreground">
                {shopConfig.currency}
                {product.price}
              </span>
              {hasDiscount && (
                <span className="font-display text-lg text-foreground/40 line-through">
                  {shopConfig.currency}
                  {product.originalPrice}
                </span>
              )}
              <span className="rounded-full bg-brand-accent/10 border border-brand-accent/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 font-display text-[10px] font-bold uppercase ml-2 animate-pulse">
                In Stock & ready
              </span>
            </div>

            {/* Colors Selection Swatches */}
            <div>
              <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40 mb-3">
                Select Color: <span className="text-foreground">{selectedColor}</span>
              </h4>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-xl px-4 py-2.5 font-display text-xs font-bold border transition-colors ${
                      selectedColor === color
                        ? "bg-foreground text-background border-foreground font-black"
                        : "border-foreground/10 hover:bg-foreground/5 text-foreground"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes Selection Swatches */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                  Select Size (UK/US): <span className="text-foreground">{selectedSize}</span>
                </h4>
                <button className="text-[10px] font-bold text-brand-primary underline hover:text-brand-primary-hover">
                  Size Guide
                </button>
              </div>
              
              <div className="grid grid-cols-5 gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-xl py-3 text-sm font-bold font-display border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/10 font-extrabold"
                        : "border-foreground/10 hover:bg-foreground/5 text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Details and Bullet description */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                Shoe Description
              </h4>
              <p className="text-sm text-foreground/75 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>
          </div>

          {/* ACTION BUTTON CTAS */}
          <div className="flex flex-col gap-3 mt-8 pt-8 border-t border-foreground/10">
            <div className="flex gap-3">
              {/* Add to Cart button */}
              <button
                onClick={() => addToCart(product, selectedSize, selectedColor)}
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-foreground text-background font-display text-sm font-bold py-4 hover:bg-foreground/80 hover:scale-102 active:scale-98 shadow-md transition-all duration-300"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Bag Drawer</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all ${
                  isFavorite
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "border-foreground/10 hover:bg-foreground/5 text-foreground"
                }`}
                aria-label="Add to favorites"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Order Now on WhatsApp Checkout CTA */}
            <button
              onClick={handleWhatsAppCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display text-sm font-bold py-4 shadow-lg shadow-emerald-600/10 hover:scale-102 active:scale-98 transition-all duration-300"
            >
              <Send className="h-4 w-4" />
              <span>Instant Buy via WhatsApp</span>
            </button>
          </div>

          {/* Value points badges bar */}
          <div className="grid grid-cols-3 gap-4 border-t border-foreground/10 pt-6 mt-8 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="h-4 w-4 text-brand-primary" />
              <span className="text-[10px] text-foreground/60 font-bold">Free Premium Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <RefreshCw className="h-4 w-4 text-brand-primary" />
              <span className="text-[10px] text-foreground/60 font-bold">Easy Size Exchanges</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Shield className="h-4 w-4 text-brand-primary" />
              <span className="text-[10px] text-foreground/60 font-bold">100% Original Brand</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
