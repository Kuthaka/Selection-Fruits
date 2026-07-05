"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LayoutGrid, List, Plus, Maximize, Heart, RotateCcw, Star, ChevronRight, ChevronLeft } from "lucide-react";

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
                
                {/* Breadcrumbs */}
                <div className="flex items-center mb-8 h-[38px]">
                    {/* Home Tab */}
                    <Link 
                        href="/" 
                        className="relative flex items-center h-full bg-white border border-gray-300 border-r-0 pl-6 pr-4 z-20 hover:text-[#429420] transition-colors"
                    >
                        <span className="font-semibold text-gray-700 text-[13px]">Home</span>
                        {/* Outer gray border of the arrow */}
                        <div className="absolute top-[-1px] right-[-19px] w-0 h-0 border-y-[19px] border-y-transparent border-l-[19px] border-l-gray-300 z-10"></div>
                        {/* Inner white background of the arrow */}
                        <div className="absolute top-[0px] right-[-18px] w-0 h-0 border-y-[18px] border-y-transparent border-l-[18px] border-l-white z-20"></div>
                    </Link>

                    {/* Shop Tab */}
                    <div className="relative flex items-center h-full bg-[#f4f7f4] border border-gray-300 border-l-0 border-r-0 pl-10 pr-4 z-10 -ml-[1px]">
                        <span className="font-semibold text-gray-900 text-[13px]">Shop</span>
                        {/* Outer gray border of the arrow */}
                        <div className="absolute top-[-1px] right-[-19px] w-0 h-0 border-y-[19px] border-y-transparent border-l-[19px] border-l-gray-300 z-10"></div>
                        {/* Inner green background of the arrow */}
                        <div className="absolute top-[0px] right-[-18px] w-0 h-0 border-y-[18px] border-y-transparent border-l-[18px] border-l-[#f4f7f4] z-20"></div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* ── Sidebar ── */}
                    <aside className="w-full lg:w-[260px] flex-shrink-0 space-y-6">
                        
                        {/* Filter Block */}
                        <div className="border border-gray-200 bg-[#f9fbf9] rounded-sm pb-4">
                            <div className="bg-[#eef3ee] px-4 py-2.5 border-b border-gray-200">
                                <h3 className="font-bold text-gray-800 text-[14px]">Filter By</h3>
                            </div>
                            
                            <div className="p-4 space-y-6">
                                {/* Size */}
                                <div>
                                    <h4 className="font-bold text-gray-800 text-[13px] mb-3">Size</h4>
                                    <div className="space-y-2">
                                        {["S (17)", "M (17)", "L (13)", "XL (5)"].map(s => (
                                            <label key={s} className="flex items-center gap-2 cursor-pointer group">
                                                <input type="checkbox" className="w-3.5 h-3.5 rounded-sm border-gray-300 text-[#429420] focus:ring-[#429420]" />
                                                <span className="text-[13px] text-gray-600 group-hover:text-gray-900">{s}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Color */}
                                <div>
                                    <h4 className="font-bold text-gray-800 text-[13px] mb-3">Color</h4>
                                    <div className="space-y-2">
                                        {["Gray (2)", "Taupe (12)", "Beige (9)", "White (3)", "Off White (2)", "Red (4)", "Black (1)"].map(c => (
                                            <label key={c} className="flex items-center gap-2 cursor-pointer group">
                                                <input type="checkbox" className="w-3.5 h-3.5 rounded-sm border-gray-300 text-[#429420] focus:ring-[#429420]" />
                                                <span className="text-[13px] text-gray-600 group-hover:text-gray-900">{c}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price */}
                                <div>
                                    <h4 className="font-bold text-gray-800 text-[13px] mb-3">Price</h4>
                                    <p className="text-[13px] text-gray-600 mb-2">$23.00 - $86.00</p>
                                    <div className="w-full h-1 bg-gray-300 rounded-full relative">
                                        <div className="absolute left-0 right-1/4 h-full bg-[#429420] rounded-full"></div>
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#429420] rounded-full border-2 border-white shadow-sm cursor-pointer"></div>
                                        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#429420] rounded-full border-2 border-white shadow-sm cursor-pointer"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Promo Banner Placeholder */}
                        <div className="w-full aspect-[4/5] relative rounded-md overflow-hidden shadow-sm border border-gray-100">
                             <div className="absolute inset-0 bg-black/50 z-10"></div>
                             {/* Faking a promo image layout */}
                             <Image src="/promos/grapes.png" alt="Promo" fill className="object-cover z-0" unoptimized />
                             <div className="relative z-20 flex flex-col items-center justify-end h-full p-4 pb-8">
                                <h3 className="text-white font-bold text-xl mb-3">Fresh Juice</h3>
                                <button className="px-5 py-2 bg-[#429420] text-white text-[13px] font-bold rounded-full shadow-lg hover:scale-105 transition-transform">Shop Now</button>
                             </div>
                        </div>

                        {/* Most View Product */}
                        <div className="border border-gray-200 bg-white rounded-sm pb-4">
                            <div className="bg-[#f9fbf9] px-4 py-2.5 border-b border-gray-200">
                                <h3 className="font-bold text-gray-800 text-[14px]">Most View Product</h3>
                            </div>
                            <div className="flex flex-col gap-4 p-4">
                                {FAKE_PRODUCTS.slice(0, 3).map((product, i) => (
                                    <div key={i} className="flex gap-3 items-center group cursor-pointer">
                                        <div className="w-[70px] h-[70px] rounded-md bg-[#f4f7f4] flex-shrink-0 relative overflow-hidden flex items-center justify-center p-1 border border-gray-100">
                                            <Image src={product.image} alt={product.name} fill className="object-contain p-2" unoptimized />
                                        </div>
                                        <div className="flex flex-col min-w-0 flex-grow">
                                            <div className="flex items-center gap-0.5 mb-1">
                                                {[1,2,3,4,5].map(s => <Star key={s} className={`w-2.5 h-2.5 ${s <= product.rating ? "fill-[#ffc107] text-[#ffc107]" : "fill-gray-200 text-gray-200"}`} />)}
                                            </div>
                                            <h4 className="text-[12px] font-bold text-gray-900 leading-tight mb-1 group-hover:text-[#429420] transition-colors line-clamp-2">{product.name}</h4>
                                            <span className="text-[13px] font-bold text-[#429420]">${product.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full mt-2 py-2 bg-[#429420] text-white rounded-md text-[13px] font-bold hover:bg-[#367a19] transition-colors shadow-sm">
                                    All Products
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* ── Main Content ── */}
                    <div className="flex-grow min-w-0">
                        {/* Toolbar */}
                        <div className="bg-[#f9fbf9] rounded-sm p-3 px-4 flex items-center justify-between mb-6 border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <button className="p-1 text-gray-900"><LayoutGrid className="w-4 h-4 fill-current" /></button>
                                    <button className="p-1 text-gray-400"><List className="w-4 h-4" /></button>
                                </div>
                                <span className="text-[13px] text-gray-600 font-medium border-l border-gray-300 pl-4">There are 20 products.</span>
                            </div>
                            <div className="flex items-center gap-2 relative">
                                <span className="text-[13px] text-gray-600">Sort by:</span>
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

                                        {/* Quick Actions (Right side stacked) */}
                                        <div className="absolute top-2 right-2 flex flex-col gap-1.5 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                                            <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-[#429420] shadow-sm border border-gray-100">
                                                <Maximize className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-[#429420] shadow-sm border border-gray-100">
                                                <Heart className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-[#429420] shadow-sm border border-gray-100">
                                                <RotateCcw className="w-3.5 h-3.5" />
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
                                        
                                        {/* Stars */}
                                        <div className="flex items-center gap-0.5 mb-2 mt-auto">
                                            {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= product.rating ? "fill-[#ffc107] text-[#ffc107]" : "fill-gray-200 text-gray-200"}`} />)}
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-baseline gap-1.5 h-[24px]">
                                            <span className="text-[14px] font-bold text-[#429420]">${product.price.toFixed(2)}</span>
                                            {product.originalPrice && <span className="text-[12px] text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
                                        </div>
                                        
                                        {/* Add To Cart Hover Button */}
                                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto h-9">
                                            <button 
                                                onClick={(e) => { e.preventDefault(); console.log("Added fake product") }}
                                                className="w-full h-full bg-[#429420] text-white font-bold text-[13px] rounded-md hover:bg-[#367a19] transition-colors"
                                            >
                                                Add To Cart
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
