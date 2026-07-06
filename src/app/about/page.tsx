"use client";

import React from "react";
import Image from "next/image";
import {
    Heart,
    ShieldCheck,
    Award,
    Leaf
} from "lucide-react";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans bg-transparent">
            <Navbar />

            <main className="flex-grow">
                {/* Simple Clean Header */}
                <section className="bg-white py-12 md:py-20 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                            Our Story
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
                            Delivering the freshest, highest quality fruits and organic produce directly from nature to your table.
                        </p>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                    <div className="bg-white rounded-md shadow-[0_2px_15px_-5px_rgba(0,0,0,0.05)] p-6 md:p-12 border border-gray-100">

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <span className="text-[#429420] text-[13px] font-bold uppercase tracking-wider flex items-center gap-2">
                                        <Leaf className="w-4 h-4" /> Rooted in Quality
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.2]" style={{ fontFamily: "var(--font-display)" }}>
                                        Preserving Nature's <br />Finest Harvest.
                                    </h2>
                                    <p className="text-[15px] text-gray-600 leading-relaxed mt-4">
                                        Selection Fruits was born from a passion for organic, wholesome living. We partner directly with local farmers to bring you hand-picked, premium quality fruits that not only taste incredible but are packed with vital nutrients. We aren't just selling groceries; we're cultivating a healthier lifestyle.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-6 pt-4">
                                    <div className="bg-[#f4f7f4] p-4 rounded-md border border-gray-100 text-center">
                                        <h4 className="text-2xl font-black text-[#429420]">50+</h4>
                                        <p className="text-[12px] font-bold text-gray-500 uppercase mt-1">Varieties</p>
                                    </div>
                                    <div className="bg-[#f4f7f4] p-4 rounded-md border border-gray-100 text-center">
                                        <h4 className="text-2xl font-black text-[#429420]">100%</h4>
                                        <p className="text-[12px] font-bold text-gray-500 uppercase mt-1">Organic</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative aspect-square rounded-md overflow-hidden bg-[#f4f7f4] border border-gray-100 p-8">
                                <Image
                                    src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png"
                                    alt="Fresh Fruits"
                                    fill
                                    className="object-contain p-8 hover:scale-105 transition-transform duration-700"
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Values Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-100">
                            {[
                                { icon: Heart, title: "Passion", desc: "Hand-picking every fruit with the same care you would for your family." },
                                { icon: ShieldCheck, title: "Purity", desc: "No artificial chemicals or wax. Just clean, wholesome, natural fruit." },
                                { icon: Award, title: "Quality", desc: "Premium produce meeting the highest global agricultural standards." }
                            ].map((v, i) => (
                                <div key={i} className="bg-[#fcf9f2] p-6 rounded-md border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-white text-[#429420] rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                                        <v.icon className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-2">{v.title}</h4>
                                    <p className="text-[13.5px] text-gray-500 leading-relaxed">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
