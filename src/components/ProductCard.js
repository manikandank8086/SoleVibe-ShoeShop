"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { shopConfig } from "@/config/shop";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to the first size and color
    const defaultSize = product.sizes[0] || 9;
    const defaultColor = product.colors[0] || "Default";
    addToCart(product, defaultSize, defaultColor);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col w-full overflow-hidden rounded-3xl border border-foreground/5 bg-card-light dark:bg-card-dark card-hover-shadow"
    >
      {/* Product Image and Overlay Actions */}
      <div className="relative aspect-square w-full overflow-hidden bg-foreground/3">
        {/* Dynamic Tag/Badge */}
        {product.tag && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-brand-primary px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-brand-primary/20">
            {product.tag}
          </span>
        )}

        {/* Favorite Icon (UI only) */}
        <button
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-foreground/80 hover:text-red-500 hover:bg-white hover:scale-110 shadow-xs transition-all duration-300"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Sneaker Image with hover zoom */}
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
        </Link>

        {/* Action Buttons overlay visible on desktop hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            href={`/product/${product.id}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-foreground hover:bg-brand-primary hover:text-white hover:scale-110 shadow-lg transition-all duration-300"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Link>
          
          <button
            onClick={handleQuickAdd}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-white hover:bg-brand-primary-hover hover:scale-110 shadow-lg shadow-brand-primary/20 transition-all duration-300"
            title="Quick Add to Cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
            {product.brand}
          </span>
          <span className="text-[10px] font-medium text-foreground/50 capitalize">
            {product.category}
          </span>
        </div>

        <Link href={`/product/${product.id}`} className="block flex-1 group/title">
          <h3 className="font-display text-base font-bold text-foreground line-clamp-1 leading-snug group-hover/title:text-brand-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price & Cart CTA for mobile/fallback */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-extrabold text-foreground">
              {shopConfig.currency}
              {product.price}
            </span>
            {hasDiscount && (
              <span className="font-display text-sm text-foreground/40 line-through">
                {shopConfig.currency}
                {product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background hover:bg-brand-primary hover:text-white transition-colors duration-300"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
