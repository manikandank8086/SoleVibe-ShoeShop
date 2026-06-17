"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { shopConfig } from "@/config/shop";
import { ShoppingBag, Menu, X, Trash2, Plus, Minus, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  // Helper to construct WhatsApp Checkout text for the ENTIRE cart
  const handleCartCheckout = () => {
    if (cartItems.length === 0) return;
    
    let text = `Hello SoleVibe! I would like to place an order for the following items:\n\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* (Qty: ${item.quantity})\n`;
      text += `   - Size: ${item.selectedSize}\n`;
      text += `   - Color: ${item.selectedColor}\n`;
      text += `   - Price: ${shopConfig.currency}${item.price} each\n\n`;
    });
    text += `*Total Order Value:* ${shopConfig.currency}${cartTotal}\n\n`;
    text += `Please confirm my order and share payment details. Thank you!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${shopConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-effect transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white shadow-lg shadow-brand-primary/20 transition-transform duration-300 group-hover:scale-105">
                  <span className="font-display text-xl font-bold italic">S</span>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-accent"></span>
                  </span>
                </span>
                <span className="font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brand-primary">
                  {shopConfig.shopName}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 text-sm font-medium transition-colors hover:text-brand-primary ${
                      isActive ? "text-brand-primary" : "text-foreground/70"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="navActiveLine"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-brand-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Cart & Menu Actions */}
            <div className="flex items-center gap-4">
              {/* Cart Toggle Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-white/5 text-foreground hover:bg-foreground/5 hover:text-brand-primary transition-all duration-300"
                aria-label="Open Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary font-display text-[10px] font-bold text-white shadow-md shadow-brand-primary/30"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-white/5 text-foreground md:hidden hover:bg-foreground/5 transition-colors duration-300"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="border-t border-foreground/10 md:hidden glass-effect overflow-hidden"
            >
              <div className="flex flex-col gap-2 p-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Sliding Sidebar Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            />

            {/* Sidebar drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-foreground/10 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex h-20 items-center justify-between border-b border-foreground/10 px-6 sm:px-8">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-brand-primary" />
                  <h2 className="text-xl font-bold tracking-tight">Your Cart</h2>
                  <span className="rounded-full bg-foreground/10 px-2.5 py-0.5 font-display text-xs font-bold">
                    {cartCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Cart Item List */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 no-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary mb-4 animate-bounce">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-lg font-bold">Your cart is empty</h3>
                    <p className="mt-2 text-sm text-foreground/60 max-w-xs">
                      Looks like you haven't added anything to your cart yet. Explore our top collection to find your perfect fit!
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                      }}
                      className="mt-6 rounded-full bg-brand-primary px-6 py-2.5 font-display text-xs font-bold text-white hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:scale-105"
                    >
                      <Link href="/shop">Start Shopping</Link>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <AnimatePresence initial={false}>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.cartId}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          className="flex gap-4 border-b border-foreground/5 pb-6"
                        >
                          {/* Item Image */}
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-foreground/5 bg-foreground/5">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                              loading="lazy"
                            />
                          </div>

                          {/* Item Content details */}
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h4 className="font-display text-sm font-bold text-foreground line-clamp-1 leading-tight">
                                  {item.name}
                                </h4>
                                <span className="font-display text-sm font-bold text-brand-primary pl-2">
                                  {shopConfig.currency}
                                  {item.price * item.quantity}
                                </span>
                              </div>
                              <p className="mt-1 font-display text-xs text-foreground/50">
                                Size: <span className="font-bold text-foreground">{item.selectedSize}</span> | Color: <span className="font-bold text-foreground">{item.selectedColor}</span>
                              </p>
                            </div>

                            {/* Quantity buttons & Remove */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 rounded-full border border-foreground/10 p-0.5 bg-foreground/3">
                                <button
                                  onClick={() => updateQuantity(item.cartId, -1)}
                                  className="flex h-6 w-6 items-center justify-center rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="font-display text-xs font-bold px-2">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.cartId, 1)}
                                  className="flex h-6 w-6 items-center justify-center rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.cartId)}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 text-foreground/40 hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5 transition-all"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Drawer Footer checkout summary */}
              {cartItems.length > 0 && (
                <div className="border-t border-foreground/10 bg-foreground/3 p-6 sm:p-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-medium text-foreground/60">Subtotal</span>
                    <span className="font-display text-xl font-bold text-foreground">
                      {shopConfig.currency}
                      {cartTotal}
                    </span>
                  </div>
                  <div className="rounded-xl bg-brand-primary/10 border border-brand-primary/20 p-3 text-center">
                    <span className="font-display text-xs font-bold text-brand-primary">
                      🚀 Free Premium Delivery Included!
                    </span>
                  </div>
                  
                  <button
                    onClick={handleCartCheckout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-4 font-display text-sm font-bold text-white hover:bg-brand-primary-hover shadow-xl shadow-brand-primary/20 transition-all duration-300 hover:scale-103"
                  >
                    <Send className="h-4 w-4" />
                    <span>Order via WhatsApp Checkout</span>
                  </button>
                  <p className="text-[10px] text-center text-foreground/40 leading-normal">
                    This order will compile and open your WhatsApp app pre-filled with the order overview. Secure & fast!
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
