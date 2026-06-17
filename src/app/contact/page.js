"use client";

import React, { useState } from "react";
import { shopConfig } from "@/config/shop";
import { Send, Phone, Mail, MapPin, MessageSquare, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success notification after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleWhatsAppRedirect = () => {
    const welcomeText = encodeURIComponent("Hello SoleVibe support! I would like to make an inquiry regarding shoe shipping and sizing.");
    const url = `https://wa.me/${shopConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${welcomeText}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-background text-foreground min-h-screen relative">
      
      {/* Decorative Blur Blob */}
      <div className="absolute top-[20%] left-[-15%] h-[350px] w-[350px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-wider text-brand-primary">
          Connect With Us
        </span>
        <h1 className="font-display text-4xl font-black tracking-tight sm:text-6xl text-foreground mt-4 leading-tight">
          Let's Elevate Your Fit
        </h1>
        <p className="text-sm sm:text-base text-foreground/50 mt-4 leading-relaxed font-medium">
          Have queries regarding shoe size charts, standard shipping timelines, or specific product availability? We are here to help!
        </p>
      </div>

      {/* Contact Grid layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Showroom details & WhatsApp Launcher (5/12 Width) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Card detailing locations */}
          <div className="rounded-3xl border border-foreground/5 bg-card-light dark:bg-card-dark p-8 shadow-xs flex flex-col gap-6">
            <h3 className="font-display text-lg font-bold text-foreground">
              Customer Experience Showroom
            </h3>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-start text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary flex-shrink-0 mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                    Address
                  </h4>
                  <p className="text-foreground/75 leading-relaxed font-medium mt-1">
                    {shopConfig.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary flex-shrink-0 mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                    Call Hotline
                  </h4>
                  <p className="text-foreground/75 leading-relaxed font-medium mt-1">
                    {shopConfig.contact.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary flex-shrink-0 mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                    Support Email
                  </h4>
                  <p className="text-foreground/75 leading-relaxed font-medium mt-1">
                    {shopConfig.contact.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Support Launcher card */}
          <div className="rounded-3xl border border-brand-primary/10 bg-brand-primary/5 p-8 shadow-xs flex flex-col gap-4">
            <h3 className="font-display text-base font-bold text-foreground">
              ⚡ Rapid Human Chat Support
            </h3>
            <p className="text-xs text-foreground/60 leading-relaxed font-medium">
              Skip email forms entirely! Click below to start an interactive WhatsApp inquiry session with our support executives immediately.
            </p>
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display text-xs font-bold py-3.5 shadow-lg shadow-emerald-600/10 hover:scale-102 transition-all duration-300"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Connect on WhatsApp Chat</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Inquiry inputs Form (7/12 Width) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-foreground/5 bg-card-light dark:bg-card-dark p-8 sm:p-10 shadow-xs relative">
            <h3 className="font-display text-xl font-bold text-foreground mb-8">
              Send an Inquiry Message
            </h3>

            {/* Success notification popup bubble */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isSuccess ? 1 : 0, y: isSuccess ? 0 : -10 }}
              className={`absolute top-6 left-6 right-6 z-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 flex gap-3 items-center pointer-events-none transition-all ${
                isSuccess ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-display text-sm font-bold">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-emerald-700 mt-0.5">We have received your request and will follow up in 24 hours.</p>
              </div>
            </motion.div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="rounded-xl border border-foreground/10 bg-foreground/3 px-4 py-3 text-sm text-foreground focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="rounded-xl border border-foreground/10 bg-foreground/3 px-4 py-3 text-sm text-foreground focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="rounded-xl border border-foreground/10 bg-foreground/3 px-4 py-3 text-sm text-foreground focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-extrabold uppercase tracking-wider text-foreground/40">
                  Inquiry Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="rounded-xl border border-foreground/10 bg-foreground/3 px-4 py-3 text-sm text-foreground focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-colors resize-none"
                  placeholder="Tell us what size chart or shoe release you have in mind..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-foreground hover:bg-foreground/80 text-background py-4 font-display text-sm font-bold shadow-md hover:scale-102 active:scale-98 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
