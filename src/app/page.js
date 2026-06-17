"use client";

import React, { useState } from "react";
import Link from "next/link";
import { shopConfig } from "@/config/shop";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Filter products for trending section
  const trendingProducts = shopConfig.products.filter(
    (product) =>
      product.isTrending && (selectedBrand === "All" || product.brand === selectedBrand)
  );

  // New arrivals products
  const newArrivals = shopConfig.products.filter((product) => product.isNew);

  // Brands filtering options
  const filterBrands = ["All", ...shopConfig.brands];

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Marathon Runner",
      review: "The Adidas UltraBoost Prime has changed my running game completely. The energy return is unreal and SoleVibe's delivery was incredibly fast!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120"
    },
    {
      id: 2,
      name: "Marcus Aurelius",
      role: "Sneakerhead & Collector",
      review: "SoleVibe offers the premium, minimal UI shopping experience I've been waiting for. Checking out via WhatsApp is incredibly fast.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120"
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      role: "Fitness Coach",
      review: "Highly recommend the Nike Court Legacy for daily wear. Extremely comfortable, looks ultra-clean, and ordering size fit was simple.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120"
    }
  ];

  return (
    <div className="flex flex-col w-full relative">
      
      {/* BACKGROUND DECORATIVE GLOWING BLOBS */}
      <div className="absolute top-[20%] left-[-10%] h-[350px] w-[350px] rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[50%] right-[-10%] h-[400px] w-[400px] rounded-full bg-brand-accent/5 blur-[150px] pointer-events-none" />
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-neutral-950 text-white min-h-[calc(100vh-80px)] flex items-center justify-center py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,76,36,0.12),transparent_70%)]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Hero text */}
            <div className="flex flex-col gap-6 lg:col-span-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex self-center lg:self-start items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
              >
                <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                  New Summer Collection Drop
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl font-black tracking-tight sm:text-7xl leading-tight"
              >
                Step Into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-orange-400 to-brand-accent">
                  Style & Comfort
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-neutral-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Discover the perfect fusion of high-performance engineering and futuristic streetwear. Curated collections from top premium brands.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4"
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-8 py-4 font-display text-sm font-bold text-white hover:bg-brand-primary-hover shadow-xl shadow-brand-primary/30 transition-all duration-300 hover:scale-105"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 font-display text-sm font-bold text-white hover:bg-white/10 transition-all duration-300"
                >
                  Our Philosophy
                </Link>
              </motion.div>
            </div>

            {/* Hero Image - floating and entrance zoom */}
            <div className="lg:col-span-6 flex justify-center items-center relative h-[350px] sm:h-[500px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
              
              {/* Rotating background badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full border border-dashed border-white/10 pointer-events-none"
              />

              {/* Glowing ring background */}
              <div className="absolute h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-brand-primary/20 blur-3xl pointer-events-none animate-pulse-slow" />

              {/* Futuristic floating main shoe */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: -10 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                className="relative z-10 w-full max-w-sm sm:max-w-md cursor-grab active:cursor-grabbing animate-float"
              >
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200"
                  alt="Premium Nike Sneaker"
                  className="w-full h-auto drop-shadow-[0_35px_35px_rgba(255,76,36,0.4)]"
                  loading="eager"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROP BADGES BAR */}
      <section className="py-8 bg-neutral-900 border-b border-white/5 text-white/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 px-6 justify-center sm:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white">Free Premium Delivery</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Complimentary express shipping on all orders</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 px-6 justify-center sm:justify-start pt-6 sm:pt-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white">100% Authentic Guarantee</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Directly sourced original brand sneakers</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 px-6 justify-center sm:justify-start pt-6 sm:pt-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white">No-Hassle Exchanges</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Swap within 14 days if fit isn't right</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY BRAND & TRENDING SECTION */}
      <section className="py-20 bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Brand header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl text-foreground">
                Trending Sneakers
              </h2>
              <p className="text-sm text-foreground/50 mt-1 max-w-md">
                Our bestselling models matching high performance cushioning with premium streetwear aesthetics.
              </p>
            </div>

            {/* Brand clickable filter selectors */}
            <div className="flex items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/3 p-1">
              {filterBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`rounded-xl px-5 py-2.5 font-display text-xs font-bold transition-all duration-300 ${
                    selectedBrand === brand
                      ? "bg-brand-primary text-white shadow-md shadow-brand-primary/15"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Shoes grid with exit/enter layout animations */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {trendingProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS CAROUSEL SLIDER */}
      <section className="py-20 bg-foreground/3 text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header section */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-brand-primary">
                Fresh Drop
              </span>
              <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl text-foreground mt-3">
                New Arrivals
              </h2>
            </div>
            
            <Link
              href="/shop"
              className="flex items-center gap-1 font-display text-xs font-bold text-brand-primary hover:text-brand-primary-hover group"
            >
              <span>View All Shop</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Horizontal scroll container */}
          <div className="smooth-scroll-carousel no-scrollbar gap-8 pb-6 -mx-4 px-4">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="w-[280px] sm:w-[320px] flex-shrink-0 scroll-snap-align-start"
              >
                {/* Custom Wrapper Card with absolute 'New' Badge */}
                <div className="relative">
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-brand-accent px-3 py-1 font-display text-[10px] font-extrabold uppercase tracking-wide text-black">
                    New Release
                  </span>
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SHOP BY CATEGORY SECTION */}
      <section className="py-20 bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl text-foreground">
              Select Your Category
            </h2>
            <p className="text-sm text-foreground/50 mt-2">
              Browse customized fits curated specifically for sports performance, daily streetwear runs, or sleek casual vibes.
            </p>
          </div>

          {/* Categories zoom grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {shopConfig.categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-lg border border-foreground/5 cursor-pointer"
              >
                <Link href={`/shop?category=${category.id}`}>
                  {/* Category Backdrop Image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover object-center transition-transform duration-750 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Text labels */}
                  <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                    <div>
                      <h3 className="font-display text-lg font-bold leading-tight">
                        {category.name}
                      </h3>
                      <span className="text-[10px] text-white/60 font-medium">
                        Explore Collection
                      </span>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-brand-primary text-white backdrop-blur-md transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED DEAL BANNER SECTION */}
      <section className="py-12 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,76,36,0.15),transparent_60%)]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-[40px] border border-white/10 bg-white/3 backdrop-blur-md p-8 sm:p-16 overflow-hidden">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              {/* Promotion detail */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
                <span className="inline-flex self-center lg:self-start rounded-full bg-brand-primary px-4 py-1.5 font-display text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg">
                  Deal of the Week
                </span>
                <h2 className="font-display text-4xl font-black tracking-tight sm:text-6xl text-white leading-tight">
                  High-Performance AlphaBounce
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="font-display text-4xl sm:text-5xl font-black text-brand-primary">
                    30% OFF
                  </span>
                  <span className="text-sm text-neutral-400 line-through">
                    Original Price $185
                  </span>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Ready to conquer the gym and tracking runs? The Adidas AlphaBounce Edge delivers extreme multidirectional stability with high elastic rebound cushioning. Grab the exclusive summer drop now!
                </p>
                <div className="flex justify-center lg:justify-start mt-4">
                  <Link
                    href="/product/5"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-display text-sm font-bold text-black hover:bg-neutral-200 transition-all duration-300 hover:scale-105"
                  >
                    <span>Claim Deal Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Promo Shoe Image with float animation */}
              <div className="lg:col-span-5 flex justify-center items-center h-[250px] sm:h-[350px]">
                <motion.div
                  whileInView={{ rotate: [-20, -15, -20] }}
                  viewport={{ once: true }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="w-full max-w-sm sm:max-w-md animate-float"
                >
                  <img
                    src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200"
                    alt="Featured Adidas AlphaBounce Sneaker"
                    className="w-full h-auto drop-shadow-[0_20px_20px_rgba(255,255,255,0.15)]"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-20 bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display text-xs font-bold tracking-widest text-brand-primary uppercase">
              Reviews
            </span>
            <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl text-foreground mt-2">
              Voted 4.9/5 Stars by Sneakerheads
            </h2>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col justify-between rounded-3xl border border-foreground/5 bg-card-light dark:bg-card-dark p-8 shadow-xs"
              >
                {/* Review Stars */}
                <div>
                  <div className="flex gap-1 text-orange-400 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-sm text-foreground/70 italic leading-relaxed">
                    "{t.review}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-foreground/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-display text-sm font-bold text-foreground">
                      {t.name}
                    </h4>
                    <span className="text-[10px] text-foreground/40 font-medium">
                      {t.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
