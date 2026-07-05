"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Category } from "@/types/category";

export default function CategoryNav() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const supabase = createClient();

    useEffect(() => {
        supabase.from("categories").select("*").eq("is_listed", true).order("name", { ascending: true })
            .then(({ data }) => { if (data) setCategories(data); });
    }, []);

    const navLinks = [
        { name: "Home",    path: "/" },
        { name: "Shop",    path: "/shop" },
        { name: "Blogs",   path: "/blogs" },
        { name: "About",   path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const isActive = (path: string) =>
        path === "/" ? pathname === "/" : pathname.startsWith(path);

    return (
        <div className="w-full bg-white border-b border-gray-100 relative z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-[52px] flex items-center">

                {/* All Departments button */}
                <div className="relative h-full flex items-center pr-6 border-r border-gray-200/60">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center gap-2 text-[14px] font-bold text-gray-900 hover:text-[#429420] transition-colors"
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        All Department
                    </button>

                    {/* Category dropdown */}
                    {menuOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                            <div className="absolute top-full left-0 w-56 bg-white shadow-xl border border-gray-100 z-50 py-1 rounded-b-md">
                                {categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/shop?category=${encodeURIComponent(cat.name)}`}
                                            onClick={() => setMenuOpen(false)}
                                            className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#429420]/5 hover:text-[#429420] transition-colors font-medium"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="px-4 py-3 text-xs text-gray-400">No categories yet</p>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Nav links */}
                <nav className="hidden md:flex items-center h-full ml-6 gap-8">
                    {navLinks.map(({ name, path }) => (
                        <Link
                            key={path}
                            href={path}
                            className={`flex items-center text-[14px] font-semibold transition-colors ${
                                isActive(path)
                                    ? "text-[#429420]"
                                    : "text-gray-800 hover:text-[#429420]"
                            }`}
                        >
                            {name}
                        </Link>
                    ))}
                </nav>

                {/* Right side links */}
                <div className="hidden md:flex items-center gap-6 ml-auto h-full">
                    <Link
                        href="/shop"
                        className="text-[14px] font-semibold text-gray-800 hover:text-[#429420] transition-colors"
                    >
                        Offer Zone
                    </Link>
                    <Link
                        href="#"
                        className="text-[14px] font-semibold text-gray-800 hover:text-[#429420] transition-colors"
                    >
                        Gift Cards
                    </Link>
                </div>
            </div>
        </div>
    );
}
