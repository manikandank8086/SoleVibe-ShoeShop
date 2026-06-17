"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { shopConfig } from "@/config/shop";
import ProductCard from "@/components/ProductCard";
import { Slider } from "lucide-react"; // fallback for slider icon
import { SlidersHorizontal, RotateCcw, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Retrieve active category parameter from URL (if any)
  const categoryParam = searchParams.get("category");

  // State Management
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(250); // Max cap
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync with URL query parameter when entering the page
  useEffect(() => {
    if (categoryParam) {
      const validCategories = shopConfig.categories.map((c) => c.id);
      if (validCategories.includes(categoryParam)) {
        setSelectedCategory(categoryParam);
      }
    }
  }, [categoryParam]);

  // Handle category changes and update URL
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    
    // Update or clear query param in URL bar
    if (category === "All") {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${category}`);
    }
  };

  const handleResetFilters = () => {
    setSelectedBrand("All");
    setSelectedCategory("All");
    setPriceRange(250);
    setSearchQuery("");
    setCurrentPage(1);
    router.push("/shop");
  };

  // Filtered Results Calculation
  const filteredProducts = shopConfig.products.filter((product) => {
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBrand && matchesCategory && matchesPrice && matchesSearch;
  });

  // Pagination Settings
  const productsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of collection
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background text-foreground min-h-screen">
      
      {/* Search & Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-foreground/10">
        <div>
          <h1 className="font-display text-4xl font-black tracking-tight text-foreground">
            Complete Catalog
          </h1>
          <p className="text-sm text-foreground/50 mt-1">
            Showing {filteredProducts.length} Premium Sneakers available now
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search brand, name, tech..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-foreground/10 bg-foreground/3 px-4 py-3 text-sm text-foreground placeholder-foreground/45 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-colors"
          />
        </div>
      </div>

      {/* Main Listing Layout */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        
        {/* DESKTOP SIDEBAR FILTERS (Sticky, 1/4 Width) */}
        <aside className="hidden lg:block lg:col-span-3 h-fit sticky top-24 rounded-3xl border border-foreground/5 bg-card-light dark:bg-card-dark p-8 shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-base font-bold flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-brand-primary" />
              <span>Filters</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-foreground/40 hover:text-brand-primary flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {/* Brands Filter */}
            <div>
              <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40 mb-4">
                Brands
              </h4>
              <div className="flex flex-col gap-2">
                {["All", ...shopConfig.brands].map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      selectedBrand === brand
                        ? "bg-brand-primary/10 text-brand-primary font-bold"
                        : "text-foreground/70 hover:bg-foreground/3 hover:text-foreground"
                    }`}
                  >
                    <span>{brand}</span>
                    {selectedBrand === brand && (
                      <span className="h-2 w-2 rounded-full bg-brand-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40 mb-4">
                Categories
              </h4>
              <div className="flex flex-col gap-2">
                {/* Custom All item */}
                <button
                  onClick={() => handleCategoryChange("All")}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    selectedCategory === "All"
                      ? "bg-brand-primary/10 text-brand-primary font-bold"
                      : "text-foreground/70 hover:bg-foreground/3 hover:text-foreground"
                  }`}
                >
                  <span>All Categories</span>
                  {selectedCategory === "All" && (
                    <span className="h-2 w-2 rounded-full bg-brand-primary" />
                  )}
                </button>
                {/* Dynamically mapped categories */}
                {shopConfig.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-brand-primary/10 text-brand-primary font-bold"
                        : "text-foreground/70 hover:bg-foreground/3 hover:text-foreground"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.id && (
                      <span className="h-2 w-2 rounded-full bg-brand-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Cap Filter */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                  Max Price
                </h4>
                <span className="font-display text-sm font-bold text-brand-primary">
                  {shopConfig.currency}
                  {priceRange}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="5"
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full h-1 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="flex items-center justify-between text-[10px] text-foreground/40 font-bold mt-2">
                <span>{shopConfig.currency}50</span>
                <span>{shopConfig.currency}250</span>
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS DIRECTORY LISTING (3/4 Width) */}
        <main className="lg:col-span-9 flex flex-col gap-12">
          
          {/* No products fallback view */}
          {currentProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-card-light dark:bg-card-dark rounded-[40px] border border-foreground/5 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                <SlidersHorizontal className="h-8 w-8" />
              </div>
              <h3 className="font-display text-lg font-bold">No Shoes Found</h3>
              <p className="mt-2 text-sm text-foreground/60 max-w-xs leading-normal">
                We couldn't find any sneakers matching your current filter specifications. Try adjusting or resetting them.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 rounded-full bg-foreground px-6 py-2.5 font-display text-xs font-bold text-background hover:bg-brand-primary hover:text-white transition-colors duration-300"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Product grid layout */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {currentProducts.map((product) => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Dynamic Pagination Panel */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 border-t border-foreground/10 pt-8 mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground/5 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-xs font-bold transition-colors ${
                          currentPage === pageNum
                            ? "bg-brand-primary text-white"
                            : "border border-foreground/10 hover:bg-foreground/5"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground/5 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* MOBILE TRIGGER FILTER FLOPPY BAR (Sticky bottom for smaller viewports) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-35 flex justify-center w-full max-w-xs px-4">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground text-background py-4 font-display text-sm font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filter Catalog</span>
          <span className="rounded-full bg-brand-primary text-white h-5 w-5 font-display text-[10px] font-extrabold flex items-center justify-center">
            {
              (selectedBrand !== "All" ? 1 : 0) +
              (selectedCategory !== "All" ? 1 : 0) +
              (priceRange !== 250 ? 1 : 0)
            }
          </span>
        </button>
      </div>

      {/* MOBILE FILTER MODAL DRAWER OVERLAY */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="lg:hidden fixed inset-0 z-45 bg-black/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 w-full max-h-[85vh] bg-background border-t border-foreground/10 rounded-t-[32px] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex h-16 items-center justify-between border-b border-foreground/10 px-6">
                <h3 className="font-display text-base font-bold">Catalog Filters</h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Drawer Body Scroll */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 no-scrollbar pb-32">
                {/* Brand select */}
                <div>
                  <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40 mb-3">
                    Brands
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["All", ...shopConfig.brands].map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`rounded-xl px-4 py-2 text-xs font-bold border transition-colors ${
                          selectedBrand === brand
                            ? "bg-brand-primary text-white border-brand-primary"
                            : "border-foreground/10 hover:bg-foreground/5"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category select */}
                <div>
                  <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40 mb-3">
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCategoryChange("All")}
                      className={`rounded-xl px-4 py-2 text-xs font-bold border transition-colors ${
                        selectedCategory === "All"
                          ? "bg-brand-primary text-white border-brand-primary"
                          : "border-foreground/10 hover:bg-foreground/5"
                      }`}
                    >
                      All Categories
                    </button>
                    {shopConfig.categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`rounded-xl px-4 py-2 text-xs font-bold border transition-colors ${
                          selectedCategory === cat.id
                            ? "bg-brand-primary text-white border-brand-primary"
                            : "border-foreground/10 hover:bg-foreground/5"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Cap */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                      Max Price Range
                    </h4>
                    <span className="font-display text-sm font-bold text-brand-primary">
                      {shopConfig.currency}
                      {priceRange}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="250"
                    step="5"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                  />
                  <div className="flex items-center justify-between text-[9px] text-foreground/40 font-bold mt-2">
                    <span>{shopConfig.currency}50</span>
                    <span>{shopConfig.currency}250</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons sticky at base of modal */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-foreground/10 bg-background p-4 flex gap-4">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 rounded-xl border border-foreground/10 py-3.5 font-display text-xs font-bold text-foreground hover:bg-foreground/5 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 rounded-xl bg-brand-primary text-white py-3.5 font-display text-xs font-bold hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/10 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-foreground/10 border-t-brand-primary" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
