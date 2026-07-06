"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Linkedin, Instagram, Twitter, Facebook } from "lucide-react";
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
    const displayEmail = settings?.email || "support@selectionfruits.com";
    const displayMobile = settings?.mobile_number || "+91 - 74114 54555";

    return (
        <footer className="w-full bg-[#fcf9f2] pb-24 md:pt-6 md:pb-12 md:px-8">
            <div className="max-w-7xl mx-auto bg-[#132B1A] rounded-t-[2rem] md:rounded-[2rem] p-8 py-12 md:p-14 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-24 relative overflow-hidden">
                {/* Subtle Background Pattern / Curve (Optional) */}
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#183621] rounded-full opacity-50 pointer-events-none"></div>
                
                {/* Column 1: Brand & Socials */}
                <div className="flex flex-col gap-6 lg:w-1/3 relative z-10">
                    <div className="flex flex-col">
                        <h2 className="text-3xl md:text-[32px] font-black text-[#ebeddf] tracking-tight mb-1" style={{ fontFamily: 'var(--font-display)' }}>SELECTION FRUITS</h2>
                        <p className="text-[#ebeddf]/90 text-[15px] font-medium tracking-wide">Curated Slow. Delivered Fast.</p>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <a href="#" className="w-10 h-10 border border-[#ebeddf]/30 rounded-sm flex items-center justify-center text-[#ebeddf] hover:bg-[#ebeddf] hover:text-[#132B1A] transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href={settings?.instagram_url || "#"} target="_blank" className="w-10 h-10 border border-[#ebeddf]/30 rounded-sm flex items-center justify-center text-[#ebeddf] hover:bg-[#ebeddf] hover:text-[#132B1A] transition-colors">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-10 h-10 border border-[#ebeddf]/30 rounded-sm flex items-center justify-center text-[#ebeddf] hover:bg-[#ebeddf] hover:text-[#132B1A] transition-colors">
                            <span className="font-bold text-[14px]">X</span>
                        </a>
                        <a href={settings?.facebook_url || "#"} target="_blank" className="w-10 h-10 border border-[#ebeddf]/30 rounded-sm flex items-center justify-center text-[#ebeddf] hover:bg-[#ebeddf] hover:text-[#132B1A] transition-colors">
                            <Facebook className="w-4 h-4" />
                        </a>
                    </div>

                    <p className="text-[13px] text-[#ebeddf]/80 mt-8 lg:mt-auto lg:pt-16 font-medium">
                        &copy; 2024 Selection Fruits. All rights reserved.
                    </p>
                </div>

                {/* Grid for other 3 columns */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-10 relative z-10">
                    
                    {/* Important Links */}
                    <div className="col-span-1 flex flex-col gap-6">
                        <h3 className="font-bold text-[#ebeddf] text-[15px]">Important Links</h3>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="#" className="text-[13px] font-medium text-[#ebeddf]/80 hover:text-white transition-colors">News</Link></li>
                            <li><Link href="#" className="text-[13px] font-medium text-[#ebeddf]/80 hover:text-white transition-colors">Banned Ingredients</Link></li>
                            <li><Link href="#" className="text-[13px] font-medium text-[#ebeddf]/80 hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-[13px] font-medium text-[#ebeddf]/80 hover:text-white transition-colors">Account Deletion</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="col-span-1 flex flex-col gap-6">
                        <h3 className="font-bold text-[#ebeddf] text-[15px]">Legal</h3>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="#" className="text-[13px] font-medium text-[#ebeddf]/80 hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="#" className="text-[13px] font-medium text-[#ebeddf]/80 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-6 mt-2 md:mt-0">
                        <h3 className="font-bold text-[#ebeddf] text-[15px]">Support</h3>
                        <div className="flex flex-col gap-4 text-[#ebeddf]/80 text-[13px] font-medium">
                            <a href={`mailto:${displayEmail}`} className="hover:text-white transition-colors">{displayEmail}</a>
                            <a href={`tel:${displayMobile.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{displayMobile}</a>
                            <p>8:00AM - 10:00PM</p>
                            <p className="leading-relaxed">
                                6th Floor, North Tower, Vaishnavi Tech<br/>
                                Park, Sarjapur Main Rd, Bellandur,<br/>
                                Bengaluru, Karnataka 560103
                            </p>
                            <p className="mt-2">CIN: U46909KA2024PTC193326</p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
