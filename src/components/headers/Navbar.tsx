"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, Home, Store, BookOpen, Info, Phone } from "lucide-react";
import Link from "next/link";
import TopStrip from "./TopStrip";
import MainNav from "./MainNav";
import CategoryNav from "./CategoryNav";

export default function Navbar() {
    const [showBottomNav, setShowBottomNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setShowBottomNav(!(y > lastScrollY && y > 80));
            setLastScrollY(y);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const isActive = (path: string) =>
        path === "/" ? pathname === "/" : pathname.startsWith(path);

    const pageTitle: Record<string, string> = {
        "/": "Home", "/shop": "Shop", "/blogs": "Blogs",
        "/about": "About", "/contact": "Contact",
    };
    const currentTitle = Object.entries(pageTitle)
        .find(([p]) => (p === "/" ? pathname === "/" : pathname.startsWith(p)))?.[1] ?? "Selection Fruits";

    const mobileNavLinks = [
        { name: "Home",    path: "/",        Icon: Home },
        { name: "Shop",    path: "/shop",    Icon: Store },
        { name: "Blogs",   path: "/blogs",   Icon: BookOpen },
        { name: "About",   path: "/about",   Icon: Info },
        { name: "Contact", path: "/contact", Icon: Phone },
    ];

    return (
        <>
            {/* ── Desktop: 3-layer header ── */}
            <header className="hidden md:block fixed top-0 left-0 right-0 z-50 shadow-sm">
                <TopStrip />
                <MainNav />
                <CategoryNav />
            </header>

            {/* ── Mobile: compact top bar ── */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <div className="flex items-center justify-between px-4 h-14 gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                        {pathname !== "/" && (
                            <button
                                onClick={() => window.history.back()}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                        )}
                        <span className="font-bold text-[15px] text-gray-800 truncate">{currentTitle}</span>
                    </div>
                </div>
            </header>

            {/* ── Mobile Bottom Nav ── */}
            <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-[100] transition-transform duration-300 ease-out ${showBottomNav ? "translate-y-0" : "translate-y-full"}`}>
                <div className="bg-white border-t border-gray-100 px-2 pt-2 pb-4">
                    <div className="flex items-center justify-around">
                        {mobileNavLinks.map(({ name, path, Icon }) => (
                            <Link
                                key={path}
                                href={path}
                                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${isActive(path) ? "text-[#25863a]" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                <Icon className={`w-5 h-5 ${isActive(path) ? "stroke-[2.5px]" : "stroke-[1.5px]"}`} />
                                <span className="text-[10px] font-semibold">{name}</span>
                                {isActive(path) && <span className="w-1 h-1 rounded-full bg-[#25863a]" />}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed header */}
            <div className="h-14 md:h-[148px]" aria-hidden="true" />
        </>
    );
}
