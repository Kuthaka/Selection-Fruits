"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LayoutGrid, List, Plus, Eye, Star, ChevronRight, ChevronLeft } from "lucide-react";

import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";

// We'll use the same FAKE_PRODUCTS from home page to match the design requested
const FAKE_PRODUCTS = [
    { id: "1", brand: "Woodsman", name: "Pusa Cabbage Green Pattagobi Seed", price: 71.30, originalPrice: 85.90, discount: 17, isNew: true, rating: 3, image: "/promos/mango.png", weight: "500 g" },
    { id: "2", brand: "Graphics", name: "Fresh Juicy Banana Isolated On White", price: 48.90, originalPrice: null, discount: 0, isNew: true, rating: 4, image: "/promos/grapes.png", weight: "1 kg" },
    { id: "3", brand: "Graphics", name: "Organic Fresh Green Avocado Fruits", price: 61.90, originalPrice: null, discount: 0, isNew: true, rating: 4, image: "/promos/meat.png", weight: "3 pcs" },
    { id: "4", brand: "Starwav", name: "Irresistable Apple Fragrance Oil", price: 35.20, originalPrice: 41.90, discount: 16, isNew: true, rating: 3, image: "/promos/coffee.png", weight: "250 ml" },
    { id: "5", brand: "Vintage", name: "Kirat Organic Green Capsicum Seed", price: 56.90, originalPrice: null, discount: 0, isNew: true, rating: 3, image: "/promos/mango.png", weight: "50 g" },
    { id: "6", brand: "Golden", name: "Onion hybrid seeds vegetable seeds", price: 39.19, originalPrice: 50.90, discount: 23, isNew: true, rating: 4, image: "/promos/grapes.png", weight: "100 g" },
    { id: "7", brand: "Harvest", name: "Farm Fresh Sweet Corn Seeds", price: 22.50, originalPrice: 30.00, discount: 25, isNew: false, rating: 5, image: "/promos/meat.png", weight: "200 g" },
    { id: "8", brand: "Organic", name: "Raw Honey From The Wild", price: 89.00, originalPrice: 110.00, discount: 19, isNew: false, rating: 4, image: "/promos/coffee.png", weight: "500 g" },
    { id: "9", brand: "Spice", name: "Red Chili Powder Organic", price: 15.00, originalPrice: 18.00, discount: 16, isNew: true, rating: 5, image: "/promos/mango.png", weight: "250 g" },
    { id: "10", brand: "Farm", name: "Fresh Strawberries Basket", price: 45.00, originalPrice: null, discount: 0, isNew: false, rating: 4, image: "/promos/grapes.png", weight: "1 Box" }
];

export default function Shop() {
    const [sortBy, setSortBy] = useState("Relevance");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "New Arrivals"];

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
                        {/* ── Mobile Categories (Visible only on small screens) ── */}
                        <div className="lg:hidden w-full overflow-x-auto hide-scrollbar pb-4 mb-4 flex items-center gap-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <button className="px-4 py-1.5 bg-[#429420] text-white text-[13px] font-bold rounded-full whitespace-nowrap shadow-sm">All</button>
                            {["Fresh Fruits", "Fresh Vegetables", "Organic Staples", "Dairy Products", "Exotic Fruits"].map(c => (
                                <button key={c} className="px-4 py-1.5 bg-[#f4f7f4] text-gray-700 hover:bg-[#e8ece8] text-[13px] font-medium rounded-full whitespace-nowrap transition-colors border border-gray-200">{c}</button>
                            ))}
                        </div>

                        {/* Toolbar */}
                        <div className="flex justify-end mb-6 relative">
                            <div className="flex items-center gap-2 relative">
                                <span className="text-[13px] text-gray-600 font-medium">Sort by:</span>
                                <div 
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="border border-gray-200 bg-white rounded-sm px-3 py-1.5 flex items-center gap-6 cursor-pointer text-[13px] text-gray-700 min-w-[140px] justify-between shadow-sm hover:border-gray-300 transition-colors"
                                >
                                    {sortBy} <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                                </div>
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
                                <Link href={`/shop/${product.id}`} key={i} className="w-full flex-shrink-0 group relative bg-white flex flex-col h-full cursor-pointer border border-gray-100 hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-2.5 rounded-xl transition-all">
                                    {/* Image Area */}
                                    <div className="relative aspect-square bg-[#f4f7f4] rounded-lg flex items-center justify-center overflow-hidden p-4 mb-3">
                                        {/* Badges */}
                                        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
                                            {product.discount > 0 && (
                                                <span className="bg-[#ff4b4b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                                                    -{product.discount}%
                                                </span>
                                            )}
                                            {product.isNew && (
                                                <span className="text-[10px] font-bold text-gray-600 leading-none ml-0.5 mt-0.5">
                                                    New
                                                </span>
                                            )}
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="absolute top-2 right-2 flex flex-col gap-1.5 translate-x-0 opacity-100 lg:translate-x-10 lg:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                                            <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-[#429420] shadow-sm border border-gray-100">
                                                <Eye className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        {/* Product Image */}
                                        <div className="relative w-[85%] h-[85%] transform transition-transform duration-500 group-hover:scale-105">
                                            <Image src={product.image} alt={product.name} fill className="object-contain" unoptimized={true} sizes="(max-width:640px) 50vw, 16vw" />
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex flex-col flex-grow relative">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-[11px] text-gray-500">{product.brand}</p>
                                            <p className="text-[10px] font-medium text-gray-400">{product.weight}</p>
                                        </div>
                                        <h4 className="text-[13px] font-bold text-gray-900 leading-[1.3] mb-1.5 group-hover:text-[#429420] transition-colors line-clamp-2 h-[34px] overflow-hidden">
                                            {product.name}
                                        </h4>
                                        
                                        {/* Price */}
                                        <div className="flex items-baseline gap-1.5 h-[24px] mt-auto mb-2">
                                            <span className="text-[14px] font-bold text-[#429420]">${product.price.toFixed(2)}</span>
                                            {product.originalPrice && <span className="text-[12px] text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
                                        </div>
                                        
                                        {/* Add To Cart Hover Button */}
                                        <div className="mt-3 opacity-100 pointer-events-auto lg:opacity-0 lg:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto h-9">
                                            <button 
                                                onClick={(e) => { e.preventDefault(); console.log("Added fake product") }}
                                                className="w-full h-full bg-[#1aad52] text-white font-bold text-[13px] rounded-md hover:brightness-95 transition-all flex items-center justify-center"
                                            >
                                                <span className="hidden md:inline">Add To Cart</span>
                                                <Plus className="w-5 h-5 md:hidden" />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
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
