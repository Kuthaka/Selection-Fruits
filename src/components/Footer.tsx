"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Mail, Phone, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SiteSettings } from "@/types/settings";

export default function Footer() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase
                .from("settings")
                .select("*")
                .eq("id", 1)
                .single();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    // Fallbacks
    const displayEmail = settings?.email || "pronto@selectionfruits.com";
    const displayMobile = settings?.mobile_number || "+91 75109 88326";

    return (
        <footer className="w-full bg-[#111811] text-white">
            {/* Decorative Top Bar */}
            <div className="flex h-1.5 w-full">
                <div className="flex-1 bg-[#429420]"></div>
                <div className="flex-1 bg-[#4ea827]"></div>
                <div className="flex-1 bg-[#5ac22e]"></div>
                <div className="flex-1 bg-[#25863a]"></div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-[#1a261a] py-8">
                <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-center gap-8">
                    {/* Mascot Illustration - Scaled Down */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                        <Image
                            src="/selection/hero-png.png"
                            alt="Selection Fruits Mascot"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Newsletter Content */}
                    <div className="flex flex-col gap-4 max-w-xl flex-grow">
                        <div className="space-y-1">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#429420]" style={{ fontFamily: 'var(--font-heading)' }}>
                                Subscribe to Newsletter
                            </h2>
                            <p className="text-white/70 font-medium text-sm md:text-base">
                                You'll be the first one to know about our exciting offers and fresh arrivals.
                            </p>
                        </div>

                        {/* Input Box */}
                        <div className="relative flex items-center max-w-md w-full mt-2">
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                className="w-full bg-transparent border border-white/20 rounded-full py-3.5 px-6 text-white placeholder:text-white/40 focus:outline-none focus:border-[#429420]/80 transition-colors pr-36"
                            />
                            <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#429420] hover:bg-[#367a19] text-white font-bold px-6 rounded-full text-sm transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Links Section */}
            <div className="container mx-auto px-4 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                {/* Brand Column */}
                <div className="lg:col-span-1 flex flex-col gap-3">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black leading-none tracking-tighter">SELECTION</h2>
                        <h2 className="text-3xl font-black leading-none tracking-widest -mt-1 ml-4 text-[#429420]">FRUITS</h2>
                        <h3 className="text-[10px] font-bold tracking-[0.4em] mt-1 uppercase text-white/40">STORE</h3>
                    </div>
                </div>

                {/* Quick Links 1 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm text-white mb-2">Navigation</h4>
                    <ul className="flex flex-col gap-3">
                        <li><a href="/" className="text-white/60 hover:text-[#429420] transition-colors font-medium text-[13px]">Home</a></li>
                        <li><a href="/shop" className="text-white/60 hover:text-[#429420] transition-colors font-medium text-[13px]">Shop</a></li>
                        <li><a href="/contact" className="text-white/60 hover:text-[#429420] transition-colors font-medium text-[13px]">Contact Us</a></li>
                    </ul>
                </div>

                {/* Quick Links 2 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm text-white mb-2">Account</h4>
                    <ul className="flex flex-col gap-3">
                        <li><a href="#" className="text-white/60 hover:text-[#429420] transition-colors font-medium text-[13px]">My Account</a></li>
                        <li><a href="#" className="text-white/60 hover:text-[#429420] transition-colors font-medium text-[13px]">Track Order</a></li>
                        <li><a href="#" className="text-white/60 hover:text-[#429420] transition-colors font-medium text-[13px]">Shopping Cart</a></li>
                    </ul>
                </div>

                {/* Quick Links 3 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm text-white mb-2">Policies</h4>
                    <ul className="flex flex-col gap-3">
                        <li><a href="#" className="text-white/60 hover:text-[#429420] transition-colors font-medium text-[13px]">Shipping Policy</a></li>
                        <li><a href="#" className="text-white/60 hover:text-[#429420] transition-colors font-medium text-[13px]">Return & Refund</a></li>
                        <li><a href="#" className="text-white/60 hover:text-[#429420] transition-colors font-medium text-[13px]">Terms of Use</a></li>
                    </ul>
                </div>

                {/* Contact & Socials */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm text-white mb-2">Connect</h4>
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-[#429420]" />
                            <a href={`mailto:${displayEmail}`} className="text-[13px] font-medium text-white/80 hover:text-[#429420] transition-colors truncate">{displayEmail}</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-[#429420]" />
                            <a href={`tel:${displayMobile.replace(/\s/g, '')}`} className="text-[13px] font-medium text-white/80 hover:text-[#429420] transition-colors">{displayMobile}</a>
                        </li>
                    </ul>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {settings?.instagram_url && (
                            <a href={settings.instagram_url} target="_blank" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#429420] hover:border-[#429420] transition-all hover:-translate-y-1">
                                <Instagram className="w-4 h-4" />
                            </a>
                        )}
                        {settings?.facebook_url && (
                            <a href={settings.facebook_url} target="_blank" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#429420] hover:border-[#429420] transition-all hover:-translate-y-1">
                                <Facebook className="w-4 h-4" />
                            </a>
                        )}
                        {settings?.youtube_url && (
                            <a href={settings.youtube_url} target="_blank" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#429420] hover:border-[#429420] transition-all hover:-translate-y-1">
                                <Youtube className="w-4 h-4" />
                            </a>
                        )}
                        <a href={`https://wa.me/${(settings?.whatsapp_number || displayMobile).replace(/\D/g, '')}`} target="_blank" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-all hover:-translate-y-1">
                            <MessageCircle className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="bg-[#0a0f0a] py-5 text-center border-t border-white/5">
                <p className="text-[11px] font-medium text-white/40 tracking-wider">
                    &copy; 2026 SELECTION FRUITS. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
}
