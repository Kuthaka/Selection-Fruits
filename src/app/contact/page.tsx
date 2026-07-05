"use client";

import React, { useState, useEffect } from "react";
import {
    Phone,
    Mail,
    MessageCircle,
    Send,
    Loader2,
    CheckCircle2,
    MapPin
} from "lucide-react";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/headers/TopBanner";
import { createClient } from "@/lib/supabase/client";
import { SiteSettings } from "@/types/settings";

export default function ContactPage() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    return (
        <div className="flex min-h-screen flex-col font-sans bg-[#fcf9f2]">
            <TopBanner />
            <Navbar />

            <main className="flex-grow">
                {/* Simple Clean Header */}
                <section className="bg-white py-12 md:py-20 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                            Contact Us
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
                            Have questions or want to partner with us? Reach out and we'll get back to you shortly.
                        </p>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                    <div className="bg-white rounded-md shadow-[0_2px_15px_-5px_rgba(0,0,0,0.05)] p-6 md:p-12 border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                            {/* Contact Details */}
                            <div className="lg:col-span-5 space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>Direct Support</h3>
                                    <div className="space-y-4 mt-6">
                                        <div className="flex items-center gap-4 bg-[#fcf9f2] p-4 rounded-md border border-gray-100">
                                            <div className="w-10 h-10 bg-white text-[#429420] rounded-full flex items-center justify-center border border-gray-100 shadow-sm flex-shrink-0">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-bold text-gray-500 uppercase">Call Us</p>
                                                <p className="text-gray-900 font-bold text-[15px] mt-0.5">{settings?.mobile_number || "+91 75109 88326"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 bg-[#fcf9f2] p-4 rounded-md border border-gray-100">
                                            <div className="w-10 h-10 bg-white text-[#429420] rounded-full flex items-center justify-center border border-gray-100 shadow-sm flex-shrink-0">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-bold text-gray-500 uppercase">Email Us</p>
                                                <p className="text-gray-900 font-bold text-[15px] mt-0.5">{settings?.email || "pronto@selectionfruits.com"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 bg-green-50/50 p-4 rounded-md border border-green-100/50">
                                            <div className="w-10 h-10 bg-white text-green-600 rounded-full flex items-center justify-center border border-green-100 shadow-sm flex-shrink-0">
                                                <MessageCircle className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-bold text-gray-500 uppercase">WhatsApp</p>
                                                <p className="text-gray-900 font-bold text-[15px] mt-0.5">{settings?.whatsapp_number || "+91 75109 88326"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                                        <MapPin className="w-5 h-5 text-[#429420]" /> Head Office
                                    </h3>
                                    <p className="text-gray-600 text-[15px] leading-relaxed bg-[#f4f7f4] p-4 rounded-md border border-gray-100">
                                        {settings?.address || "Selection Fruits, Industrial Estate, Cuttack, Odisha - 753010"}
                                    </p>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-7">
                                <form onSubmit={handleSubmit} className="space-y-5 bg-[#fcf9f2] p-6 md:p-8 rounded-md border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>Send us a Message</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-bold text-gray-700">Full Name</label>
                                            <input type="text" required className="w-full h-11 bg-white border border-gray-200 rounded-sm px-4 text-[14px] text-gray-900 outline-none focus:border-[#429420] focus:ring-1 focus:ring-[#429420] transition-all shadow-sm" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-bold text-gray-700">Email Address</label>
                                            <input type="email" required className="w-full h-11 bg-white border border-gray-200 rounded-sm px-4 text-[14px] text-gray-900 outline-none focus:border-[#429420] focus:ring-1 focus:ring-[#429420] transition-all shadow-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-gray-700">Message</label>
                                        <textarea required rows={5} className="w-full bg-white border border-gray-200 rounded-sm p-4 text-[14px] text-gray-900 outline-none focus:border-[#429420] focus:ring-1 focus:ring-[#429420] transition-all resize-none shadow-sm" />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isSuccess}
                                        className={`w-full h-12 rounded-sm font-bold text-[14px] transition-all flex items-center justify-center gap-2 mt-2 shadow-sm ${isSuccess ? 'bg-green-600 text-white' : 'bg-[#429420] text-white hover:bg-[#367a19]'
                                            }`}
                                    >
                                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : isSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                                        {isSuccess ? "Message Sent!" : "Send Message"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
