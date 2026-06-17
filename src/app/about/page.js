import React from "react";
import Link from "next/link";
import { shopConfig } from "@/config/shop";
import { Sparkles, Trophy, Flame, Users, ArrowRight } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Design Aesthetics First",
      desc: "We curate sneakers that combine futuristic street styling with architectural precision. Our shoes are pieces of visual art."
    },
    {
      icon: <Flame className="h-6 w-6" />,
      title: "Engineered Performance",
      desc: "Whether you are hitting marathons or high-intensity gym sets, our models are chosen for extreme comfort and durability."
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Premium Exclusivity",
      desc: "Working directly with authorized dealers guarantees 100% original drops and highly coveted limited-stock sneaker releases."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Customer Support Mindset",
      desc: "Our unique WhatsApp checkout model ensures human communication, rapid answer confirmation, and seamless exchanges."
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-background text-foreground min-h-screen relative">
      
      {/* Decorative Blob background */}
      <div className="absolute top-[30%] right-[-10%] h-[350px] w-[350px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

      {/* Header Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-wider text-brand-primary">
          Our Philosophy
        </span>
        <h1 className="font-display text-4xl font-black tracking-tight sm:text-6xl text-foreground mt-4 leading-tight">
          Redefining Streetwear <br />& Athletics
        </h1>
        <p className="text-base sm:text-lg text-foreground/50 mt-4 leading-relaxed font-medium">
          SoleVibe was born in 2024 out of a collective obsession with modern street fashion and elite foot cushion technology. We curate fits that elevate your everyday movement.
        </p>
      </div>

      {/* Grid Brand Narrative details */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center mb-24 pb-12 border-b border-foreground/10">
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground leading-tight">
            Curating Only the Finest Silhouettes
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed font-medium">
            We believe that footwear is the ultimate statement of self-expression. A premium sneaker is not just a utility—it is a visual anchor for your entire wardrobe.
          </p>
          <p className="text-sm text-foreground/70 leading-relaxed font-medium">
            That is why we do not compromise. We partner directly with authorized distributors of globally renowned brands—Nike, Adidas, and Puma—to bring highly limited drops and peak performance runners to sneaker collectors and athletes worldwide.
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-display text-xs font-bold hover:bg-brand-primary hover:text-white hover:scale-105 transition-all duration-300"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Narrative Image showcase */}
        <div className="lg:col-span-6 h-[350px] sm:h-[450px] rounded-[40px] overflow-hidden border border-foreground/5 bg-foreground/3">
          <img
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200"
            alt="SoleVibe showroom photography"
            className="h-full w-full object-cover object-center rounded-[32px] hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>
      </div>

      {/* Brand Values showcase */}
      <div className="flex flex-col gap-12">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Our Core Pillars
          </h2>
          <p className="text-sm text-foreground/50 mt-2 font-medium">
            How we maintain visual excellence and elite client satisfaction every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, index) => (
            <div
              key={index}
              className="rounded-3xl border border-foreground/5 bg-card-light dark:bg-card-dark p-8 shadow-xs flex flex-col gap-4 card-hover-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                {v.icon}
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                {v.title}
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
