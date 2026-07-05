"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, ChevronLeft, Home, Store, BookOpen, Info, Phone } from "lucide-react";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCartStore } from "@/store/useCartStore";

/**
 * Navbar — clean grocery-app style header.
 * Mobile: fixed top bar with back arrow, logo/page title, search + cart.
 * Desktop: full-width white bar with logo, nav links, and icons.
 */
export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showBottomNav, setShowBottomNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    const totalItems = useCartStore((state) => state.getTotalItems());

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setShowBottomNav(false);
            } else {
                setShowBottomNav(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const isActive = (path: string) => pathname === path;

    // Page title for mobile header
    const pageTitle: Record<string, string> = {
        "/": "Selection Fruits",
        "/shop": "Shop",
        "/blogs": "Blogs",
        "/about": "About Us",
        "/contact": "Contact",
    };

    const currentTitle = Object.entries(pageTitle).find(([path]) =>
        path === "/" ? pathname === "/" : pathname.startsWith(path)
    )?.[1] ?? "Selection Fruits";

    const isHome = pathname === "/";

    const navLinks = [
        { name: "Home", path: "/", Icon: Home },
        { name: "Shop", path: "/shop", Icon: Store },
        { name: "Blogs", path: "/blogs", Icon: BookOpen },
        { name: "About", path: "/about", Icon: Info },
        { name: "Contact", path: "/contact", Icon: Phone },
    ];

    return (
        <>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* ── Desktop Navbar ── */}
            <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-[#f5f3ee]/95 backdrop-blur-xl border-b border-black/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-8">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <div className="relative w-28 h-10">
                            <Image src="/Mains/logo-bg.png" alt="Selection Fruits" fill className="object-contain" priority />
                        </div>
                    </Link>

                    {/* Nav links */}
                    <nav className="flex items-center gap-1">
                        {navLinks.map(({ name, path }) => (
                            <Link
                                key={path}
                                href={path}
                                className={`
                                    px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                                    ${isActive(path)
                                        ? "bg-brand-teal text-white shadow-sm"
                                        : "text-gray-500 hover:text-brand-teal hover:bg-black/5"}
                                `}
                            >
                                {name}
                            </Link>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center gap-3">
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-black/8 hover:text-brand-teal transition-all">
                            <Search className="w-4.5 h-4.5" />
                        </button>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-black/8 hover:text-brand-teal transition-all"
                        >
                            <ShoppingBag className="w-4.5 h-4.5" />
                            {mounted && totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-brand-green text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile Top Bar ── */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#f5f3ee]/95 backdrop-blur-xl border-b border-black/5">
                <div className="flex items-center justify-between px-4 h-14 gap-3">

                    {/* Back / Logo */}
                    <div className="flex items-center gap-2 min-w-0">
                        {!isHome && (
                            <button onClick={() => window.history.back()} className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm text-gray-600 flex-shrink-0">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                        )}
                        {isHome && (
                            <div className="relative w-20 h-7 flex-shrink-0">
                                <Image src="/Mains/logo-bg.png" alt="Selection Fruits" fill className="object-contain object-left" priority />
                            </div>
                        )}
                        {!isHome && (
                            <span className="font-bold text-base text-gray-900 truncate">{currentTitle}</span>
                        )}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 bg-white shadow-sm hover:text-brand-teal transition-all">
                            <Search className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative w-8 h-8 rounded-full flex items-center justify-center text-gray-600 bg-white shadow-sm hover:text-brand-teal transition-all"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            {mounted && totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-brand-green text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile Bottom Nav ── */}
            <nav
                className={`
                    md:hidden fixed bottom-0 left-0 right-0 z-[100] transition-transform duration-400 ease-out
                    ${showBottomNav ? "translate-y-0" : "translate-y-full"}
                `}
            >
                <div className="bg-white/95 backdrop-blur-xl border-t border-black/6 px-2 pt-2 pb-safe">
                    <div className="flex items-center justify-around">
                        {navLinks.map(({ name, path, Icon }) => (
                            <Link
                                key={path}
                                href={path}
                                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all ${isActive(path) ? "text-brand-teal" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                <Icon className={`w-5 h-5 ${isActive(path) ? "stroke-[2.5px]" : "stroke-2"}`} />
                                <span className="text-[10px] font-semibold">{name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed header */}
            <div className="h-14 md:h-16" aria-hidden="true" />
        </>
    );
}
