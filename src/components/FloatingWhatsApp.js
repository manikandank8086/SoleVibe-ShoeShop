"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { shopConfig } from "@/config/shop";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppRedirect = () => {
    // Generate a simple welcome message for WhatsApp support chat
    const text = encodeURIComponent("Hello SoleVibe support! I have a question regarding a shoe purchase.");
    const url = `https://wa.me/${shopConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Dynamic Pop-up chat Support Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-72 rounded-2xl bg-white text-black shadow-2xl overflow-hidden border border-neutral-100 dark:bg-neutral-900 dark:text-white dark:border-neutral-800"
          >
            {/* Header info */}
            <div className="bg-emerald-600 px-4 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <MessageCircle className="h-4 w-4" />
                  <span className="absolute bottom-0 right-0 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                  </span>
                </span>
                <div>
                  <h4 className="font-display text-sm font-bold leading-none">{shopConfig.shopName} Support</h4>
                  <span className="text-[10px] text-emerald-100 font-medium">Online (Replies in minutes)</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body Mock */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-950 flex flex-col gap-2">
              <div className="max-w-[85%] rounded-xl bg-white border border-neutral-100 px-3 py-2 text-xs text-neutral-700 leading-normal shadow-xs dark:bg-neutral-850 dark:border-neutral-800 dark:text-neutral-300">
                👋 Hello! How can we help you today? Let us know what shoe you're interested in!
              </div>
            </div>

            {/* Input Action CTA */}
            <div className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-850">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display text-xs font-bold py-2.5 shadow-md shadow-emerald-600/10 hover:scale-102 transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Start WhatsApp Chat</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="relative flex items-center">
        {/* Hover Tooltip Helper */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute right-14 whitespace-nowrap rounded-xl bg-emerald-600 px-3.5 py-2 font-display text-xs font-bold text-white shadow-lg pointer-events-none"
            >
              Need help? Chat with us!
              {/* Tooltip caret arrow */}
              <span className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-emerald-600" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsating Trigger Ball */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all duration-300 relative"
          aria-label="Contact support on WhatsApp"
        >
          {/* Pulsating Ring Effect */}
          <span className="absolute inset-0 rounded-full bg-emerald-600 animate-ping opacity-25"></span>
          
          <MessageCircle className="h-6 w-6 relative z-10" />
        </motion.button>
      </div>
    </div>
  );
}
