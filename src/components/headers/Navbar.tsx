"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, Home, Store, BookOpen, Info, Phone, ShoppingBag, Heart, Search, Apple, Leaf, Milk, ShoppingBasket, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import TopStrip from "./TopStrip";
import MainNav from "./MainNav";
import CategoryNav from "./CategoryNav";
import { useCartStore } from "@/store/useCartStore";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const pathname = usePathname();

    const totalItems = useCartStore(state => state.getTotalItems());

    const isActive = (path: string) =>
        path === "/" ? pathname === "/" : pathname.startsWith(path);

    const mobileNavLinks = [
        { name: "Home",    path: "/",        Icon: Home },
        { name: "Shop",    path: "/shop",    Icon: Store },
        { name: "Blogs",   path: "/blogs",   Icon: BookOpen },
        { name: "About",   path: "/about",   Icon: Info },
        { name: "Contact", path: "/contact", Icon: Phone },
    ];

    const mobileCategories = [
        { name: "All", icon: ShoppingBag, active: true },
        { name: "Mango", icon: Apple, active: false },
        { name: "Fresh", icon: Leaf, active: false },
        { name: "Milk&Bread", icon: Milk, active: false },
        { name: "Groceries", icon: ShoppingBasket, active: false }
    ];

    return (
        <>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* ── TopStrip (Scrolls with page) ── */}
            <div className="w-full">
                <TopStrip />
            </div>

            {/* ── Desktop: 2-layer sticky header ── */}
            <header className="hidden md:block sticky top-0 left-0 right-0 z-50 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <MainNav />
                <CategoryNav />
            </header>

            {/* ── Mobile: complete top bar ── */}
            <header className="md:hidden sticky top-0 left-0 right-0 z-50 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {/* Row 1: Logo & Icons */}
                <div 
                    className="flex items-center justify-between px-4 h-16 relative z-20"
                    style={{ backgroundColor: "#0D530E" }}
                >
                    {/* Subtle pattern overlay */}
                    <div 
                        className="absolute inset-0 pointer-events-none opacity-[0.15]"
                        style={{
                            backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)`,
                            backgroundSize: '30px 30px',
                            backgroundPosition: '0 0, 15px 15px'
                        }}
                    />
                    <div className="flex items-center gap-3 relative z-10">
                        {pathname !== "/" && (
                            <button
                                onClick={() => window.history.back()}
                                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        )}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                                <Image src="/Mains/logo-bg.png" alt="Logo" fill className="object-contain" priority />
                            </div>
                            <div className="relative w-28 h-6">
                                <Image src="/Mains/selection-2.png" alt="Selection Fruits" fill className="object-contain object-left" priority />
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3.5 text-white relative z-10">
                        <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} className="hover:scale-105 transition-transform">
                            {isMobileSearchOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
                        </button>
                        <button onClick={() => setIsCartOpen(true)} className="relative hover:scale-105 transition-transform">
                            <ShoppingBag className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-gray-900 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Row 2: Search & Categories */}
                <div className={`relative z-10 transition-all duration-300 ease-in-out origin-top overflow-hidden bg-[#cdebc9] rounded-b-2xl shadow-sm ${isMobileSearchOpen ? "max-h-[300px] opacity-100 py-3 pb-4" : "max-h-0 opacity-0 py-0"}`}>
                    <div className="px-4">
                        <div className="relative flex items-center w-full mb-4">
                            <Search className="absolute left-4 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search for Kid's Nutrition"
                                className="w-full h-[44px] bg-[#fcf9f2] rounded-full pl-11 pr-4 text-[14px] text-gray-700 placeholder-gray-500 outline-none shadow-sm"
                            />
                        </div>
                        
                        <div className="flex items-center gap-5 overflow-x-auto no-scrollbar pb-1 px-1">
                            {mobileCategories.map((cat, idx) => (
                                <div 
                                    key={idx} 
                                    className={`flex flex-col items-center justify-center min-w-[64px] h-[68px] flex-shrink-0 cursor-pointer transition-all ${
                                        cat.active 
                                        ? "bg-[#fcf9f2] rounded-xl shadow-sm text-gray-800" 
                                        : "text-gray-700 hover:text-gray-900"
                                    }`}
                                >
                                    <cat.icon className={`w-6 h-6 mb-1 ${cat.active ? "text-gray-800" : "text-gray-700"}`} strokeWidth={1.5} />
                                    <span className={`text-[11px] ${cat.active ? "font-bold" : "font-medium"}`}>{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Mobile Bottom Nav ── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100]">
                <div className="bg-white border-t border-gray-100 px-2 pt-2 pb-4">
                    <div className="flex items-center justify-around">
                        {mobileNavLinks.map(({ name, path, Icon }) => (
                            <Link
                                key={path}
                                href={path}
                                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${isActive(path) ? "text-[#429420]" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                <Icon className={`w-5 h-5 ${isActive(path) ? "stroke-[2.5px]" : "stroke-[1.5px]"}`} />
                                <span className="text-[10px] font-semibold">{name}</span>
                                {isActive(path) && <span className="w-1 h-1 rounded-full bg-[#429420]" />}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>


        </>
    );
}
