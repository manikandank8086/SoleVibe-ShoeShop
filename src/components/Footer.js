"use client";

import React from "react";
import Link from "next/link";
import { shopConfig } from "@/config/shop";
import { Send, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-foreground/10 bg-foreground text-background">
      {/* Visual neon top divider overlay */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 sm:grid-cols-2">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white shadow-lg shadow-brand-primary/20">
                <span className="font-display text-xl font-bold italic">S</span>
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                {shopConfig.shopName}
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed pr-2">
              Elevate your active lifestyle and everyday fashion. SoleVibe brings premium sneakers, professional running models, and athletic shoes to your doorstep.
            </p>
            {/* Social Icons with hover scaling */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href={shopConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-background/10 hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href={shopConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-background/10 hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href={shopConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-background/10 hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-6">
              Shop Navigation
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-background/60">
              <li>
                <Link href="/" className="hover:text-brand-primary transition-colors">
                  Home Catalog
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-brand-primary transition-colors">
                  Shop Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-primary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-primary transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-6">
              Our Showroom
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-background/60">
              <li className="flex gap-3 items-start">
                <MapPin className="h-4 w-4 text-brand-primary flex-shrink-0 mt-1" />
                <span className="leading-relaxed">{shopConfig.contact.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4 w-4 text-brand-primary flex-shrink-0" />
                <span className="leading-relaxed">{shopConfig.contact.phone}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4 w-4 text-brand-primary flex-shrink-0" />
                <span className="leading-relaxed">{shopConfig.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-6">
              Vibe Updates
            </h3>
            <p className="text-sm text-background/60 leading-relaxed">
              Subscribe to get exclusive discount drops, new release alerts, and design previews.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative flex w-full max-w-sm mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-background/10 bg-background/5 px-4 py-3 text-sm text-white placeholder-background/40 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-white hover:bg-brand-primary-hover shadow-md hover:scale-105 transition-all"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Base Credits */}
        <div className="mt-16 border-t border-background/10 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-center">
          <p className="text-xs text-background/40">
            &copy; {currentYear} {shopConfig.shopName}. All rights reserved. Made for premium fashion.
          </p>
          <div className="flex justify-center gap-6 text-xs text-background/40">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Delivery Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
