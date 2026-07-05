"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, ShieldCheck, Truck, BadgePercent, Plus, UtensilsCrossed, ChevronRight, Star } from "lucide-react";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { useCartStore } from "@/store/useCartStore";

// Pastel pods for product cards (consistent with shop page)
const PODS = ["pod-green", "pod-blue", "pod-amber", "pod-pink", "pod-mint", "pod-lavender"];
function formatWeight(g: number) {
    if (!g) return null;
    return g >= 1000 ? `${g / 1000} kg` : `${g} g`;
}

// Category card backgrounds — vibrant, food-editorial
const CAT_COLORS = [
    { bg: "#1e3b3e", text: "#ffffff" },
    { bg: "#eb5e52", text: "#ffffff" },
    { bg: "#f9c846", text: "#0f2318" },
    { bg: "#8b4c1e", text: "#ffffff" },
    { bg: "#25863a", text: "#ffffff" },
    { bg: "#4a3080", text: "#ffffff" },
];

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: catData } = await supabase.from("categories").select("*").eq("is_listed", true).order("name", { ascending: true });
                if (catData) setCategories(catData);

                const { data: prodData } = await supabase.from("products").select("*").eq("is_listed", true).order("created_at", { ascending: false });
                if (prodData) setProducts(prodData);
            } catch (err) {
                console.error("Error fetching home data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const featuredProducts = products.slice(0, 8);

    const PROMO_BANNERS = [
        {
            sub: "CUBAN COFFEE",
            title: "The Ultimate\nCoffee",
            bg: "#8c5638",
            img: "/promos/coffee.png"
        },
        {
            sub: "SWEET AND ROBUST",
            title: "A Grade Black\nGrapes",
            bg: "#4d517c",
            img: "/promos/grapes.png"
        },
        {
            sub: "THE RED MEAT",
            title: "Online Shopping\nFor Meat",
            bg: "#3b8089",
            img: "/promos/meat.png"
        },
        {
            sub: "BUY MANGOES",
            title: "100% Organic\nMangoes",
            bg: "#e2921a",
            img: "/promos/mango.png"
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            <main className="flex-grow">

                {/* ─────────────────────────────────────────────────────────────────
                    HERO SECTION
                ───────────────────────────────────────────────────────────────── */}
                <section className="w-full bg-[#f97833] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-0 flex flex-col md:flex-row items-center min-h-[380px] md:min-h-[420px] gap-6 relative z-10">

                        {/* Text block */}
                        <div className="flex-1 text-white z-10 pt-2 md:py-12">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-3">
                                Sale Up to 30% OFF
                            </p>
                            <h1 className="text-[36px] md:text-[52px] font-black leading-[1.08] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                                Fresh Fruits,<br />Delivered Daily.
                            </h1>
                            <p className="text-white/80 text-base md:text-lg mb-8 max-w-sm leading-relaxed">
                                Farm-sourced, handpicked, and at your door across India.
                            </p>
                            <button
                                onClick={() => router.push("/shop")}
                                className="inline-flex items-center gap-2 bg-white text-[#f97833] font-bold px-7 py-3.5 rounded-md hover:bg-gray-50 transition-colors shadow-lg text-sm"
                            >
                                Shop Now <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Hero product image */}
                        <div className="flex-1 flex items-end justify-center md:justify-end relative min-h-[260px] md:min-h-[380px] w-full">
                            <div className="relative w-full max-w-[380px] md:max-w-[460px] h-[260px] md:h-[420px] drop-shadow-2xl">
                                <Image
                                    src="https://res.cloudinary.com/drmroxs00/image/upload/v1772532862/1-removebg_w2b9ls.png"
                                    alt="Fresh Fruits"
                                    fill
                                    className="object-contain object-bottom"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute -bottom-16 left-1/3 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

                    {/* Slider dots (visual only) */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        <span className="w-5 h-1.5 rounded-full bg-white" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────────────
                    PROMO BANNERS
                ───────────────────────────────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {PROMO_BANNERS.map((banner, i) => (
                            <div 
                                key={i} 
                                className="relative rounded-md overflow-hidden h-[150px] flex items-center shadow-sm group hover:shadow-md transition-shadow cursor-pointer"
                                style={{ backgroundColor: banner.bg }}
                                onClick={() => router.push("/shop")}
                            >
                                {/* Text Content */}
                                <div className="relative z-10 pl-5 py-4 w-[65%] text-white flex flex-col justify-center h-full">
                                    <p className="text-[10px] font-bold tracking-wider text-white/90 mb-1.5 uppercase">
                                        {banner.sub}
                                    </p>
                                    <h3 className="text-[16px] font-black leading-[1.25] mb-4" style={{ whiteSpace: "pre-line" }}>
                                        {banner.title}
                                    </h3>
                                    <span className="text-[12px] font-bold underline underline-offset-4 text-white/90 hover:text-white transition-colors w-fit">
                                        Shop Now
                                    </span>
                                </div>

                                {/* Image */}
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-40 h-40 md:w-44 md:h-44 z-0 group-hover:scale-[1.03] transition-transform duration-500">
                                    <Image 
                                        src={banner.img} 
                                        alt={banner.sub} 
                                        fill 
                                        className="object-contain" 
                                        unoptimized={true}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────────────
                    TRUST STRIP
                ───────────────────────────────────────────────────────────────── */}
                <section className="border-y border-gray-100 bg-gray-50/60">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { Icon: Truck,        label: "Free Delivery",       sub: "On orders over ₹500" },
                            { Icon: Leaf,         label: "100% Fresh",          sub: "Farm-sourced daily" },
                            { Icon: ShieldCheck,  label: "Safe Packaging",      sub: "Hygienic & sealed" },
                            { Icon: BadgePercent, label: "Best Prices",         sub: "No hidden charges" },
                        ].map(({ Icon, label, sub }) => (
                            <div key={label} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#25863a]/10 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-[#25863a]" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-gray-800">{label}</p>
                                    <p className="text-[11px] text-gray-400">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────────────
                    BEST SELLERS
                ───────────────────────────────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#25863a] mb-0.5">Top picks</p>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                                Best Sellers
                            </h2>
                        </div>
                        <Link href="/shop" className="flex items-center gap-1 text-sm font-semibold text-[#25863a] hover:text-[#1d6e30] transition-colors">
                            View all <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                        {loading ? (
                            Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="rounded-xl overflow-hidden animate-pulse">
                                    <div className="aspect-[4/5] bg-gray-100" />
                                    <div className="p-3 space-y-2">
                                        <div className="h-2.5 w-1/3 bg-gray-100 rounded-full" />
                                        <div className="h-3.5 w-4/5 bg-gray-100 rounded-full" />
                                        <div className="h-3 w-1/2 bg-gray-100 rounded-full" />
                                    </div>
                                </div>
                            ))
                        ) : featuredProducts.length > 0 ? (
                            featuredProducts.map((product, i) => {
                                const pod = PODS[i % PODS.length];
                                const displayPrice = product.offer_price ?? product.price;
                                const originalPrice = product.offer_price ? product.regular_price : null;
                                const weight = formatWeight(product.size_grams);
                                return (
                                    <div key={product.id} className="produce-card group overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-0.5">
                                        <Link href={`/shop/${product.slug}`} className={`card-pod relative w-full aspect-[4/5] flex items-center justify-center ${pod} block`}>
                                            {originalPrice && (
                                                <span className="sale-badge absolute top-3 left-3 z-10">
                                                    Sale
                                                </span>
                                            )}
                                            <div className="relative w-[78%] h-[78%] transform transition-transform duration-500 group-hover:scale-[1.06] drop-shadow-lg">
                                                {product.images?.[0] ? (
                                                    <Image src={product.images[0]} alt={product.name} fill className="object-contain" sizes="(max-width:640px) 50vw, 25vw" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                                        <UtensilsCrossed className="w-10 h-10 text-gray-600" />
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                        <div className="px-3 pt-3 pb-4 bg-white flex flex-col gap-0.5">
                                            {weight && <span className="text-[10px] text-gray-400 font-medium">{weight}</span>}
                                            <Link href={`/shop/${product.slug}`}>
                                                <h4 className="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#25863a] transition-colors">
                                                    {product.name}
                                                </h4>
                                            </Link>
                                            {/* Stars */}
                                            <div className="flex items-center gap-0.5 mt-1">
                                                {[1,2,3,4,5].map(s => <Star key={s} className="w-2.5 h-2.5 fill-[#f9c846] text-[#f9c846]" />)}
                                                <span className="text-[9px] text-gray-400 ml-1">(4.9)</span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2 gap-1">
                                                <div>
                                                    <span className="text-[15px] font-bold text-gray-900">₹{displayPrice}</span>
                                                    {originalPrice && <span className="text-[11px] text-gray-400 line-through ml-1.5">₹{originalPrice}</span>}
                                                </div>
                                                <button
                                                    onClick={() => addItem(product)}
                                                    className="w-8 h-8 bg-[#25863a] text-white rounded-full flex items-center justify-center hover:bg-[#1d6e30] transition-colors shadow-sm flex-shrink-0"
                                                >
                                                    <Plus className="w-4 h-4" strokeWidth={2.8} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-20 text-center text-gray-300">
                                <UtensilsCrossed className="w-12 h-12 mx-auto mb-3" />
                                <p className="text-sm font-semibold">No products yet. Add some from the admin panel.</p>
                            </div>
                        )}
                    </div>

                    {!loading && featuredProducts.length > 0 && (
                        <div className="mt-8 text-center">
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25863a] text-white font-bold rounded-md hover:bg-[#1d6e30] transition-colors text-sm shadow-md"
                            >
                                Browse All Products <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
