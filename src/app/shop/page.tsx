"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LayoutGrid, List, UtensilsCrossed, Plus, Loader2, SlidersHorizontal } from "lucide-react";

import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { useCartStore } from "@/store/useCartStore";

// ── Pastel card backgrounds cycling ─────────────────────────────────────────
const CARD_PALETTES = [
    "bg-[#e8f4ea]",
    "bg-[#e8edf8]",
    "bg-[#fef3e2]",
    "bg-[#fce8f3]",
    "bg-[#e8f8f5]",
    "bg-[#f3e8fe]",
];

// ── Grid Product Card ─────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
    const addItem = useCartStore((state) => state.addItem);
    const displayPrice = product.offer_price ?? product.price;
    const originalPrice = product.offer_price ? product.regular_price : null;
    const bgClass = CARD_PALETTES[index % CARD_PALETTES.length];

    const weightLabel = product.size_grams
        ? product.size_grams >= 1000
            ? `${product.size_grams / 1000}kg`
            : `${product.size_grams}g`
        : null;

    return (
        <div className="shop-card group relative bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 cursor-pointer">

            {/* Bestseller badge */}
            {index % 3 === 0 && (
                <div className="absolute top-2.5 left-2.5 z-20 bestseller-badge text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <span>⭐</span> Bestseller
                </div>
            )}

            {/* Image area with pastel bg */}
            <Link href={`/shop/${product.slug}`} className={`relative w-full aspect-square ${bgClass} flex items-center justify-center overflow-hidden`}>
                <div className="relative w-4/5 h-4/5 transform transition-transform duration-500 group-hover:scale-105 drop-shadow-md">
                    {product.images?.[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-contain"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <UtensilsCrossed className="w-10 h-10 text-gray-500" />
                        </div>
                    )}
                </div>
            </Link>

            {/* Info */}
            <div className="flex flex-col flex-grow px-3 pt-2.5 pb-3 gap-0.5">
                {/* Weight tag */}
                {weightLabel && (
                    <span className="text-[10px] text-gray-400 font-medium">{weightLabel}</span>
                )}

                {/* Name */}
                <Link href={`/shop/${product.slug}`}>
                    <h4 className="text-[13px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-brand-teal transition-colors">
                        {product.name}
                    </h4>
                </Link>

                {/* Category as subtitle */}
                <p className="text-[10px] text-gray-400 font-medium truncate">{product.category}</p>

                {/* Price row */}
                <div className="flex items-center justify-between mt-2 gap-1">
                    <div className="flex flex-col leading-tight">
                        <span className="text-[15px] font-bold text-gray-900">₹{displayPrice}</span>
                        {originalPrice && (
                            <span className="text-[11px] text-gray-400 line-through">₹{originalPrice}</span>
                        )}
                    </div>

                    {/* + button */}
                    <button
                        onClick={(e) => { e.preventDefault(); addItem(product); }}
                        aria-label={`Add ${product.name} to cart`}
                        className="btn-pop w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center hover:bg-brand-green-dark transition-colors duration-200 shadow-sm flex-shrink-0"
                    >
                        <Plus className="w-4 h-4" strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── List Row ─────────────────────────────────────────────────────────────────
function ProductRow({ product, index }: { product: Product; index: number }) {
    const addItem = useCartStore((state) => state.addItem);
    const displayPrice = product.offer_price ?? product.price;
    const originalPrice = product.offer_price ? product.regular_price : null;
    const bgClass = CARD_PALETTES[index % CARD_PALETTES.length];

    const weightLabel = product.size_grams
        ? product.size_grams >= 1000 ? `${product.size_grams / 1000}kg` : `${product.size_grams}g`
        : null;

    return (
        <div className="group bg-white rounded-2xl flex items-center gap-4 p-3 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-black/[0.04]">
            {/* Image */}
            <Link href={`/shop/${product.slug}`} className={`relative w-20 h-20 rounded-xl flex-shrink-0 ${bgClass} flex items-center justify-center overflow-hidden`}>
                <div className="relative w-14 h-14 transform transition-transform duration-500 group-hover:scale-105 drop-shadow-sm">
                    {product.images?.[0] ? (
                        <Image src={product.images[0]} alt={product.name} fill className="object-contain" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <UtensilsCrossed className="w-6 h-6 text-gray-500" />
                        </div>
                    )}
                </div>
            </Link>

            {/* Details */}
            <div className="flex-grow min-w-0">
                {weightLabel && <p className="text-[10px] text-gray-400 font-medium">{weightLabel}</p>}
                <Link href={`/shop/${product.slug}`}>
                    <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-brand-teal transition-colors line-clamp-2">{product.name}</h4>
                </Link>
                <p className="text-[10px] text-gray-400 font-medium truncate mt-0.5">{product.category}</p>
            </div>

            {/* Price + button */}
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <div className="text-right leading-tight">
                    <div className="text-sm font-bold text-gray-900">₹{displayPrice}</div>
                    {originalPrice && <div className="text-[11px] text-gray-400 line-through">₹{originalPrice}</div>}
                </div>
                <button
                    onClick={() => addItem(product)}
                    className="btn-pop w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center hover:bg-brand-green-dark transition-colors duration-200 shadow-sm"
                >
                    <Plus className="w-4 h-4" strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: catData } = await supabase
                    .from("categories")
                    .select("*")
                    .eq("is_listed", true)
                    .order("name", { ascending: true });
                if (catData) setCategories(catData);

                const { data: prodData } = await supabase
                    .from("products")
                    .select("*")
                    .eq("is_listed", true)
                    .order("created_at", { ascending: false });
                if (prodData) setProducts(prodData);
            } catch (err) {
                console.error("Error fetching shop data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredAndSortedProducts = (() => {
        let result = selectedCategory === "All"
            ? [...products]
            : products.filter(p => p.category === selectedCategory);
        if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
        else if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);
        return result;
    })();

    const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low"];
    const allCategories = ["All", ...categories.map(c => c.name)];

    return (
        <div className="flex min-h-screen flex-col bg-[#fcf9f2]">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full pb-28 md:pb-16">

                {/* ── Desktop heading ── */}
                <div className="hidden md:block px-8 lg:px-12 pt-6 pb-4">
                    <h1 className="text-3xl font-bold text-gray-900">Fresh Picks</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Farm-fresh, delivered to your doorstep</p>
                </div>

                {/* ── Sticky controls bar ── */}
                <div className="sticky top-14 md:top-16 z-40 bg-[#fcf9f2]/95 backdrop-blur-xl border-b border-black/[0.06]">

                    {/* ── MOBILE: underline tab style ── */}
                    <div className="md:hidden flex items-center overflow-x-auto no-scrollbar border-b border-black/[0.07]">
                        {allCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                                    relative px-4 py-3.5 text-[13px] font-semibold whitespace-nowrap flex-shrink-0 transition-colors duration-200
                                    ${selectedCategory === cat
                                        ? "text-gray-900"
                                        : "text-gray-400"}
                                `}
                            >
                                {cat}
                                {selectedCategory === cat && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gray-900 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* ── DESKTOP: pill chip style ── */}
                    <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar px-8 lg:px-12 py-3">
                        {allCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                                    px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 border
                                    ${selectedCategory === cat
                                        ? "bg-brand-teal text-white border-brand-teal shadow-sm"
                                        : "bg-white text-gray-500 border-black/[0.08] hover:border-brand-teal/40 hover:text-brand-teal"}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort + View toggles */}
                    <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-2.5">
                        <p className="text-xs text-gray-400 font-medium">
                            <span className="font-semibold text-gray-700">{filteredAndSortedProducts.length}</span> products
                            {selectedCategory !== "All" && <> · <span className="text-brand-teal font-semibold">{selectedCategory}</span></>}
                        </p>

                        <div className="flex items-center gap-2">
                            {/* Sort */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-black/[0.08] text-[11px] font-semibold text-gray-600 hover:text-brand-teal hover:border-brand-teal/30 transition-all shadow-sm"
                                >
                                    <SlidersHorizontal className="w-3 h-3" />
                                    {sortBy}
                                    <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isSortOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-black/[0.06] overflow-hidden z-50 py-1.5">
                                        {sortOptions.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                                                className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${sortBy === opt ? "text-brand-teal bg-brand-teal/5" : "text-gray-600 hover:bg-gray-50"}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* View mode */}
                            <div className="flex items-center bg-white border border-black/[0.08] rounded-xl p-0.5 shadow-sm gap-0.5">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-brand-teal text-white shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                                >
                                    <LayoutGrid className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-brand-teal text-white shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                                >
                                    <List className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Loading ── */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 gap-3">
                        <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
                        <p className="text-xs font-semibold text-gray-400">Loading products...</p>
                    </div>
                )}

                {/* ── Grid ── */}
                {!loading && viewMode === "grid" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 mt-2 px-4 md:px-8 lg:px-12">
                        {filteredAndSortedProducts.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                )}

                {/* ── List ── */}
                {!loading && viewMode === "list" && (
                    <div className="flex flex-col gap-2.5 mt-2 px-4 md:px-8 lg:px-12">
                        {filteredAndSortedProducts.map((product, i) => (
                            <ProductRow key={product.id} product={product} index={i} />
                        ))}
                    </div>
                )}

                {/* ── Empty state ── */}
                {!loading && filteredAndSortedProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-5">
                            <UtensilsCrossed className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-base font-bold text-gray-700">No products found</h3>
                        <p className="text-sm text-gray-400 mt-1">Try a different category.</p>
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className="mt-4 px-5 py-2 bg-brand-teal text-white rounded-full text-sm font-semibold hover:bg-brand-teal/90 transition-colors"
                        >
                            View All
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
