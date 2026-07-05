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
        <div className="w-full bg-[#1d3131] text-white text-[11px] md:text-[12px] font-medium border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-7 md:h-8 flex items-center justify-center">
                {/* Promo text */}
                <div className="flex items-center justify-center min-w-0 text-center w-full">
                    <span className="truncate text-white tracking-wide">{displayText}<span className="animate-pulse">|</span></span>
                </div>
            </div>
        </div>
    );
}
