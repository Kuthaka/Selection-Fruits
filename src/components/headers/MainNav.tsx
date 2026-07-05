"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, RefreshCw } from "lucide-react";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCartStore } from "@/store/useCartStore";

export default function MainNav() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const totalItems = useCartStore((state) => state.getTotalItems());

    useEffect(() => { setMounted(true); }, []);

    return (
        <>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <div className="w-full bg-[#429420]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-[76px] flex items-center gap-6 md:gap-10">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3 text-white">
                        <div className="relative w-14 h-14">
                            <Image
                                src="/Mains/logo-bg.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="relative w-40 h-10 sm:w-48 sm:h-12">
                            <Image
                                src="/Mains/selection-2.png"
                                alt="Selection Fruits"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Search bar — grows to fill middle */}
                    <div className="flex-grow max-w-3xl">
                        <div className="relative flex items-center w-full">
                            <input
                                type="text"
                                placeholder="Search Product Here..."
                                className="w-full h-[42px] bg-white rounded-full pl-5 pr-12 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                                <Search className="w-[18px] h-[18px] text-gray-700 hover:text-black transition-colors" />
                            </button>
                        </div>
                    </div>

                    {/* Right: icons */}
                    <div className="flex items-center gap-6 flex-shrink-0 ml-auto md:ml-0">
                        {/* Compare / Refresh */}
                        <button className="relative flex items-center justify-center hover:opacity-80 transition-opacity">
                            <RefreshCw className="w-6 h-6 text-white stroke-[1.5px]" />
                            <span className="absolute -top-1.5 -right-2.5 bg-white text-[#429420] text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-sm">
                                0
                            </span>
                        </button>

                        {/* Wishlist */}
                        <button className="relative flex items-center justify-center hover:opacity-80 transition-opacity">
                            <Heart className="w-6 h-6 text-white stroke-[1.5px]" />
                            <span className="absolute -top-1.5 -right-2.5 bg-white text-[#429420] text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-sm">
                                0
                            </span>
                        </button>

                        {/* Cart */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative flex items-center justify-center hover:opacity-80 transition-opacity"
                        >
                            <ShoppingBag className="w-6 h-6 text-white stroke-[1.5px]" />
                            {mounted && (
                                <span className="absolute -top-1.5 -right-2.5 bg-white text-[#429420] text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-sm">
                                    {totalItems > 0 ? totalItems : 0}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
