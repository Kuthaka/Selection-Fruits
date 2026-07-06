"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Store, BookOpen, Info, Phone, ShoppingBag, Heart, Search, Apple, Leaf, Milk, ShoppingBasket, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import TopStrip from "./TopStrip";
import MainNav from "./MainNav";
import CategoryNav from "./CategoryNav";
import SearchBar from "./SearchBar";
import { useCartStore } from "@/store/useCartStore";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isShop = pathname.startsWith("/shop");
    const isProductPage = pathname.startsWith("/shop/") && pathname.length > 6;
    const isHome = pathname === "/";
    const scrolledOrSearch = scrolled || isMobileSearchOpen;
    // Layout and Theme logic
    const isFloatingLayout = !isShop && scrolledOrSearch;
    const useSolidTheme = isShop || scrolledOrSearch;
    const useWhiteElements = true;

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            if (currentScrollY > 60) {
                if (currentScrollY > lastScrollY) {
                    setIsScrollingDown(true);
                } else if (currentScrollY < lastScrollY) {
                    setIsScrollingDown(false);
                }
            } else {
                setIsScrollingDown(false);
            }
            lastScrollY = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

            {/* ── Desktop: sticky MainNav (higher z so dropdown floats above CategoryNav) ── */}
            <div className="hidden md:block sticky top-0 left-0 right-0 z-[60]">
                <MainNav />
            </div>

            {/* ── Desktop: CategoryNav — sticks just below MainNav ── */}
            <div className="hidden md:block sticky top-[76px] left-0 right-0 z-[50] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <CategoryNav />
            </div>

            {/* ── Mobile: complete top bar ── */}
            <header className={`md:hidden z-50 transition-all duration-300 ${isShop ? "sticky top-0 w-full pt-0 px-0" : `fixed left-0 right-0 ${isFloatingLayout ? "pt-3 px-3 pb-3" : "pt-0 px-0"} ${scrolled ? "top-0" : "top-7"}`}`}>
                <div 
                    className={`flex flex-col relative z-20 transition-all duration-300 ${isFloatingLayout ? "rounded-[22px] shadow-[0_8px_30px_rgba(0,0,0,0.2)]" : ""} ${isFloatingLayout && !isMobileSearchOpen ? "overflow-hidden" : ""}`}
                    style={{ backgroundColor: useSolidTheme ? "#132B1A" : "transparent" }}
                >

                    {/* Seamless Dropdown Background Layer (Fades in smoothly) */}
                    <div 
                        className={`absolute inset-x-0 bottom-0 z-0 transition-opacity duration-300 pointer-events-none ${isFloatingLayout ? "top-[56px] rounded-b-[22px]" : "top-[64px]"} ${isMobileSearchOpen ? "opacity-100" : "opacity-0"}`}
                        style={{ backgroundColor: '#cdebc9' }}
                    />

                    {/* Row 1: Logo & Icons */}
                    <div className={`flex items-center justify-between px-4 transition-all duration-300 relative z-10 origin-center ${isFloatingLayout ? "h-14 scale-[0.96]" : "h-16 scale-100"}`}>
                        <div className="flex items-center gap-3">
                            {isProductPage && (
                                <button 
                                    onClick={() => router.push('/shop')}
                                    className={`flex items-center justify-center transition-colors ${useWhiteElements ? "text-white" : "text-[#0D530E]"}`}
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            )}
                            <Link href="/" className="flex items-center gap-2">
                                <div className={`relative w-8 h-8 ${!useSolidTheme ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]" : ""}`}>
                                    <Image src="/Mains/logo-bg.png" alt="Logo" fill className="object-contain" priority />
                                </div>
                                <div className={`relative w-32 h-[26px] ${!useSolidTheme ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]" : ""}`}>
                                    <Image src={useWhiteElements ? "/Mains/selection-2.png" : "/Mains/selection.png"} alt="Selection Fruits" fill className="object-contain object-left" priority />
                                </div>
                            </Link>
                        </div>

                        <div className={`flex items-center gap-3.5 transition-colors duration-300 relative z-10 ${useWhiteElements ? "text-white" : "text-[#0D530E]"} ${!useSolidTheme ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]" : ""}`}>
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

                    {/* Row 2: Search + Categories */}
                    <div 
                        className={`relative z-[200] transition-all duration-300 ease-in-out origin-top ${isMobileSearchOpen ? "max-h-[600px] opacity-100 py-3 px-4 pb-4" : "max-h-0 opacity-0 overflow-hidden py-0 px-4"}`}
                    >
                        <SearchBar />

                        {/* Category quick-links */}
                        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 px-1 mt-3">
                            {mobileCategories.map((cat, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col items-center justify-center min-w-[64px] h-[68px] flex-shrink-0 cursor-pointer transition-all rounded-xl ${
                                        cat.active
                                            ? "bg-[#fcf9f2] shadow-sm text-gray-800"
                                            : "text-gray-700 hover:text-gray-900"
                                    }`}
                                >
                                    <cat.icon className={`w-6 h-6 mb-1 ${cat.active ? "text-[#429420]" : "text-gray-600"}`} strokeWidth={1.5} />
                                    <span className={`text-[11px] ${cat.active ? "font-bold" : "font-medium"}`}>{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Mobile Bottom Nav ── */}
            {!(pathname.startsWith("/shop/") && pathname.length > 6) && (
                <nav className={`md:hidden fixed bottom-6 left-4 right-4 z-[100] transition-all duration-500 ease-in-out ${isScrollingDown ? "translate-y-[150%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
                    <div className="bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/50 rounded-full p-1.5">
                        <div className="flex items-center justify-between">
                            {mobileNavLinks.map(({ name, path }) => {
                                const active = isActive(path);
                                return (
                                    <Link
                                        key={path}
                                        href={path}
                                        className={`flex items-center justify-center transition-all duration-300 ${
                                            active 
                                                ? "bg-[#132B1A] text-white px-5 py-2.5 rounded-full shadow-md" 
                                                : "text-gray-500 hover:text-gray-900 px-2 sm:px-3 py-2.5"
                                        }`}
                                    >
                                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">{name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            )}


        </>
    );
}
