"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Truck, User, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function TopStrip() {
    const [bannerText, setBannerText] = useState("Get Up To 50% OFF New Season Styles, Limited Time Only.");
    const [displayText, setDisplayText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [pause, setPause] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        supabase.from("settings").select("top_banner_text").eq("id", 1).single()
            .then(({ data }) => { if (data?.top_banner_text) setBannerText(data.top_banner_text); });
    }, []);

    useEffect(() => {
        if (pause) return;
        const speed = isTyping ? 55 : 30;
        const t = setTimeout(() => {
            if (isTyping) {
                if (charIndex < bannerText.length) {
                    setDisplayText(bannerText.substring(0, charIndex + 1));
                    setCharIndex(p => p + 1);
                } else {
                    setPause(true);
                    setTimeout(() => { setPause(false); setIsTyping(false); }, 2800);
                }
            } else {
                if (charIndex > 0) {
                    setDisplayText(bannerText.substring(0, charIndex - 1));
                    setCharIndex(p => p - 1);
                } else {
                    setIsTyping(true);
                }
            }
        }, speed);
        return () => clearTimeout(t);
    }, [charIndex, isTyping, bannerText, pause]);

    return (
        <div className="w-full bg-[#429420] text-white text-[12px] font-medium border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-10 flex items-center justify-between gap-4">
                {/* Left: promo text */}
                <div className="flex items-center min-w-0">
                    <span className="truncate text-white">{displayText}<span className="animate-pulse">|</span></span>
                </div>

                {/* Right: utility links — hidden on mobile */}
                <div className="hidden md:flex items-center gap-3.5 flex-shrink-0 text-white">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-white/80 transition-colors">
                        En <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-px h-3 bg-white/30 mx-1" />
                    <div className="flex items-center gap-1 cursor-pointer hover:text-white/80 transition-colors">
                        $ USD <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                    
                    <div className="w-px h-3 bg-white/30 mx-1" />

                    <Link href="/contact" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                        <MapPin className="w-3.5 h-3.5" /> Store Locator
                    </Link>

                    <div className="w-px h-3 bg-white/30 mx-1" />

                    <Link href="#" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                        <Truck className="w-3.5 h-3.5" /> Track Your Order
                    </Link>

                    <div className="w-px h-3 bg-white/30 mx-1" />

                    <Link href="/admin" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                        <User className="w-3.5 h-3.5" /> My Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
