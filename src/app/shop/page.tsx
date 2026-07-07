"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LayoutGrid, List, Plus, Star, ChevronRight, ChevronLeft, ArrowUpDown } from "lucide-react";

import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

// We'll use the same FAKE_PRODUCTS from home page to match the design requested
const FAKE_PRODUCTS = [
    { id: "1", brand: "Woodsman", name: "Cabbage", price: 71.30, originalPrice: 85.90, discount: 17, isNew: true, rating: 3, image: "/promos/mango.png", weight: "500 g" },
    { id: "2", brand: "Graphics", name: "Banana", price: 48.90, originalPrice: null, discount: 0, isNew: true, rating: 4, image: "/promos/grapes.png", weight: "1 kg" },
    { id: "3", brand: "Graphics", name: "Avocado", price: 61.90, originalPrice: null, discount: 0, isNew: true, rating: 4, image: "/promos/meat.png", weight: "3 pcs" },
    { id: "4", brand: "Starwav", name: "Apple", price: 35.20, originalPrice: 41.90, discount: 16, isNew: true, rating: 3, image: "/promos/coffee.png", weight: "250 ml" },
    { id: "5", brand: "Vintage", name: "Capsicum", price: 56.90, originalPrice: null, discount: 0, isNew: true, rating: 3, image: "/promos/mango.png", weight: "50 g" },
    { id: "6", brand: "Golden", name: "Onion", price: 39.19, originalPrice: 50.90, discount: 23, isNew: true, rating: 4, image: "/promos/grapes.png", weight: "100 g" },
    { id: "7", brand: "Harvest", name: "Corn", price: 22.50, originalPrice: 30.00, discount: 25, isNew: false, rating: 5, image: "/promos/meat.png", weight: "200 g" },
    { id: "8", brand: "Organic", name: "Honey", price: 89.00, originalPrice: 110.00, discount: 19, isNew: false, rating: 4, image: "/promos/coffee.png", weight: "500 g" },
    { id: "9", brand: "Spice", name: "Chili", price: 15.00, originalPrice: 18.00, discount: 16, isNew: true, rating: 5, image: "/promos/mango.png", weight: "250 g" },
    { id: "10", brand: "Farm", name: "Strawberries", price: 45.00, originalPrice: null, discount: 0, isNew: false, rating: 4, image: "/promos/grapes.png", weight: "1 Box" }
];

export default function Shop() {
    const [sortBy, setSortBy] = useState("Relevance");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "New Arrivals"];
    const addItem = useCartStore(state => state.addItem);

    return (
        <div className="flex min-h-screen flex-col bg-[#fcf9f2]">
            <Navbar />

            <main className="flex-grow max-w-[1350px] mx-auto w-full px-4 md:px-8 pt-12 pb-16">

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* ── Sidebar ── */}
                    <aside className="hidden lg:block lg:w-[260px] flex-shrink-0 space-y-6">
                        
                        {/* Categories Block */}
                        <div className="border border-gray-200 bg-[#f9fbf9] rounded-sm pb-4">
                            <div className="bg-[#eef3ee] px-4 py-2.5 border-b border-gray-200">
                                <h3 className="font-bold text-gray-800 text-[14px]">Categories</h3>
                            </div>
                            
                            <div className="p-4 space-y-2">
                                {["Fresh Fruits", "Fresh Vegetables", "Organic Staples", "Dairy Products", "Exotic Fruits"].map(c => (
                                    <label key={c} className="flex items-center justify-between cursor-pointer group py-1.5">
                                        <div className="flex items-center gap-2.5">
                                            <input type="checkbox" className="w-3.5 h-3.5 rounded-sm border-gray-300 text-[#429420] focus:ring-[#429420]" />
                                            <span className="text-[13px] text-gray-600 group-hover:text-[#429420] transition-colors">{c}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                    </aside>

                    {/* ── Main Content ── */}
                    <div className="flex-grow min-w-0">
                        {/* ── Mobile Categories (Sticky under navbar on mobile) ── */}
                        <div className="lg:hidden sticky top-[64px] z-40 bg-[#fcf9f2] py-3 -mx-4 px-4 w-[calc(100%+32px)] border-b border-gray-100 overflow-x-auto hide-scrollbar mb-4 flex items-center gap-2 shadow-sm -mt-12" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <button className="px-4 py-1.5 bg-[#429420] text-white text-[13px] font-bold rounded-full whitespace-nowrap shadow-sm">All</button>
                            {["Fresh Fruits", "Fresh Vegetables", "Organic Staples", "Dairy Products", "Exotic Fruits"].map(c => (
                                <button key={c} className="px-4 py-1.5 bg-[#f4f7f4] text-gray-700 hover:bg-[#e8ece8] text-[13px] font-medium rounded-full whitespace-nowrap transition-colors border border-gray-200">{c}</button>
                            ))}
                        </div>

                        {/* Toolbar */}
                        <div className="flex justify-start md:justify-end mb-6 relative">
                            <div className="flex items-center gap-2 relative">
                                {/* Desktop label */}
                                <span className="hidden md:inline-block text-[13px] text-gray-600 font-medium">Sort by:</span>
                                
                                {/* Desktop Trigger */}
                                <div 
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="hidden md:flex border border-gray-200 bg-white rounded-sm px-3 py-1.5 items-center gap-6 cursor-pointer text-[13px] text-gray-700 min-w-[140px] justify-between shadow-sm hover:border-gray-300 transition-colors"
                                >
                                    {sortBy} <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                                </div>

                                {/* Mobile Trigger */}
                                <button 
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="md:hidden flex items-center gap-1.5 px-4 py-1.5 bg-[#f0f0f0] text-gray-800 rounded-full text-[13px] font-medium transition-colors"
                                >
                                    <ArrowUpDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                                    Sort by
                                    <ChevronDown className={`w-4 h-4 ml-0.5 text-gray-600 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} strokeWidth={2.5} />
                                </button>

                                {isSortOpen && (
                                    <>
                                        <div className="fixed inset-0 z-30" onClick={() => setIsSortOpen(false)} />
                                        <div className="absolute top-full right-0 mt-1 min-w-[140px] bg-white border border-gray-200 rounded-sm shadow-lg overflow-hidden z-40 py-1">
                                            {sortOptions.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                                                    className={`w-full text-left px-3 py-2 text-[13px] transition-colors ${sortBy === opt ? "bg-[#f4f7f4] text-[#429420] font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {[...FAKE_PRODUCTS, ...FAKE_PRODUCTS].slice(0, 15).map((product, i) => (
                                <ProductCard key={i} product={product} className="w-full flex-shrink-0" />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                            <span className="text-[13px] text-gray-500 font-medium">Showing 1-15 of 20 item(s)</span>
                            <div className="flex items-center gap-1.5">
                                <button className="w-8 h-8 flex items-center justify-center bg-[#429420] text-white text-[13px] font-bold rounded-sm shadow-sm">1</button>
                                <button className="w-8 h-8 flex items-center justify-center bg-[#f4f7f4] text-gray-700 hover:bg-[#e8ece8] text-[13px] font-medium rounded-sm transition-colors border border-transparent hover:border-gray-200">2</button>
                                <button className="w-8 h-8 flex items-center justify-center bg-[#f4f7f4] text-gray-700 hover:bg-[#e8ece8] text-[13px] font-medium rounded-sm transition-colors border border-transparent hover:border-gray-200">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
