"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { STATIC_PRODUCTS, StaticProduct } from "@/data/products";
import { useRouter } from "next/navigation";

const RECENT_KEY = "sf_recent_searches";
const MAX_RECENT = 5;

function getRecent(): string[] {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); }
    catch { return []; }
}
function saveRecent(term: string) {
    const prev = getRecent().filter(t => t !== term);
    localStorage.setItem(RECENT_KEY, JSON.stringify([term, ...prev].slice(0, MAX_RECENT)));
}

const POPULAR = ["Mango", "Organic", "Avocado", "Honey", "Capsicum"];

export default function SearchBar() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState<StaticProduct[]>([]);
    const [recent, setRecent] = useState<string[]>([]);
    const [highlighted, setHighlighted] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapRef  = useRef<HTMLDivElement>(null);

    /* Close on outside click */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
                setOpen(false);
                setHighlighted(-1);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    /* Filter products */
    useEffect(() => {
        if (!query.trim()) { setResults([]); return; }
        const q = query.toLowerCase();
        setResults(
            STATIC_PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            ).slice(0, 6)
        );
        setHighlighted(-1);
    }, [query]);

    const handleFocus = () => {
        setRecent(getRecent());
        setOpen(true);
    };

    const handleSelect = (term: string) => {
        saveRecent(term);
        setQuery(term);
        setOpen(false);
        router.push(`/shop?q=${encodeURIComponent(term)}`);
    };

    const handleProductClick = (product: StaticProduct) => {
        saveRecent(product.name);
        setOpen(false);
        setQuery("");
        router.push(`/shop/${product.id}`);
    };

    const clearQuery = () => { setQuery(""); setResults([]); inputRef.current?.focus(); };

    /* Keyboard nav */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!open) return;
        const total = results.length;
        if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted(h => Math.min(h + 1, total - 1)); }
        if (e.key === "ArrowUp")   { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
        if (e.key === "Enter") {
            if (highlighted >= 0 && results[highlighted]) {
                handleProductClick(results[highlighted]);
            } else if (query.trim()) {
                handleSelect(query.trim());
            }
        }
        if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
    };

    const showEmpty  = open && !query.trim();
    const showResult = open && query.trim().length > 0;

    return (
        <div ref={wrapRef} className="relative flex-grow max-w-3xl">
            {/* Input */}
            <div className={`relative flex items-center w-full transition-all duration-200 ${open ? "ring-2 ring-white/70 rounded-full" : ""}`}>
                <Search className="absolute left-4 w-[17px] h-[17px] text-gray-400 pointer-events-none flex-shrink-0" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    placeholder="Search fruits, veggies & more…"
                    className="w-full h-[42px] bg-white rounded-full pl-10 pr-10 text-[13px] text-gray-700 placeholder-gray-400 outline-none transition-all"
                    onFocus={handleFocus}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />
                {query && (
                    <button onClick={clearQuery} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.13)] border border-gray-100 overflow-hidden z-[300]">

                    {/* ── Empty state: recent + popular ── */}
                    {showEmpty && (
                        <div className="p-4">
                            {recent.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                        <Clock className="w-3 h-3" /> Recent
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {recent.map(r => (
                                            <button key={r} onClick={() => handleSelect(r)}
                                                className="text-[12px] text-gray-600 bg-gray-100 hover:bg-[#F2EDC2] hover:text-[#429420] px-3 py-1 rounded-full transition-colors font-medium">
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                    <TrendingUp className="w-3 h-3" /> Popular
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {POPULAR.map(p => (
                                        <button key={p} onClick={() => handleSelect(p)}
                                            className="text-[12px] text-gray-600 bg-gray-50 hover:bg-[#F2EDC2] hover:text-[#429420] px-3 py-1 rounded-full border border-gray-200 hover:border-[#429420]/30 transition-all font-medium">
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Results ── */}
                    {showResult && (
                        <>
                            {results.length > 0 ? (
                                <>
                                    <div className="px-4 pt-3 pb-1 border-b border-gray-50">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{results.length} result{results.length !== 1 && "s"} for "{query}"</p>
                                    </div>
                                    <ul>
                                        {results.map((p, i) => (
                                            <li key={p.id}>
                                                <button
                                                    onClick={() => handleProductClick(p)}
                                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${highlighted === i ? "bg-[#F2EDC2]" : "hover:bg-gray-50"}`}
                                                >
                                                    {/* Thumb */}
                                                    <div className="w-10 h-10 rounded-lg bg-[#f4f7f4] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                        <Image src={p.image} alt={p.name} width={36} height={36} className="object-contain" unoptimized />
                                                    </div>
                                                    {/* Info */}
                                                    <div className="flex-grow min-w-0">
                                                        <p className="text-[13px] font-semibold text-gray-800 truncate leading-tight">{p.name}</p>
                                                        <p className="text-[11px] text-gray-400">{p.brand} · {p.weight}</p>
                                                    </div>
                                                    {/* Price */}
                                                    <div className="flex-shrink-0 text-right">
                                                        <p className="text-[13px] font-bold text-[#429420]">QAR {p.price.toFixed(2)}</p>
                                                        {p.originalPrice && <p className="text-[11px] text-gray-400 line-through">QAR {p.originalPrice.toFixed(2)}</p>}
                                                    </div>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    {/* See all */}
                                    <div className="border-t border-gray-100 px-4 py-2.5">
                                        <button onClick={() => handleSelect(query)}
                                            className="w-full text-center text-[12px] font-bold text-[#429420] hover:text-[#2d6b14] transition-colors flex items-center justify-center gap-1.5">
                                            <Search className="w-3.5 h-3.5" />
                                            See all results for "{query}"
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="py-10 flex flex-col items-center gap-2 text-center px-4">
                                    <span className="text-3xl">🔍</span>
                                    <p className="text-[14px] font-bold text-gray-700">No results for "{query}"</p>
                                    <p className="text-[12px] text-gray-400">Try searching for something else</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
