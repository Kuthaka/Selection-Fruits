"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, ShieldCheck, Truck, BadgePercent, Plus, UtensilsCrossed, ChevronRight, Star, RotateCcw, Headset, Gift, Maximize, Heart, ArrowRightLeft, ArrowLeft, ArrowRight, Carrot, Droplets, CupSoda, Fish, Baby, PawPrint, Cherry } from "lucide-react";
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
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const scrollRefReviews = React.useRef<HTMLDivElement>(null);
    const scrollReviews = (direction: 'left' | 'right') => {
        if (scrollRefReviews.current) {
            const { scrollLeft, clientWidth } = scrollRefReviews.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRefReviews.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

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

    const FAKE_REVIEWS = [
        { id: 1, name: "Byron Watts", text: "Contrary to popular belief, Lorem Ipsu not simply random text. It has roots in piece of classical Latin literature from", image: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 2, name: "Jhon Marker", text: "Contrary to popular belief, Lorem Ipsu not simply random text. It has roots in piece of classical Latin literature from", image: "https://randomuser.me/api/portraits/men/44.jpg" },
        { id: 3, name: "Celeste Estrada", text: "Contrary to popular belief, Lorem Ipsu not simply random text. It has roots in piece of classical Latin literature from", image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 4, name: "Cameaila Cablle", text: "Contrary to popular belief, Lorem Ipsu not simply random text. It has roots in piece of classical Latin literature from", image: "https://randomuser.me/api/portraits/women/68.jpg" },
        { id: 5, name: "Byron Watts", text: "Contrary to popular belief, Lorem Ipsu not simply random text. It has roots in piece of classical Latin literature from", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    ];

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
                <section className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-6 md:pt-10 md:pb-8">
                    <div className="border border-gray-100 rounded-md py-6 px-4 md:px-6 grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-100 shadow-[0_2px_15px_-5px_rgba(0,0,0,0.03)] bg-white">
                        {[
                            { Icon: Truck,        title: "Easy Free Delivery", sub: "Order on $100*" },
                            { Icon: ShieldCheck,  title: "Premium Warranty",   sub: "Up to 2 years" },
                            { Icon: RotateCcw,    title: "Easy Free Return",   sub: "365 days return" },
                            { Icon: Headset,      title: "24*7 Online Suport", sub: "Premium searvice" },
                            { Icon: Gift,         title: "Best Special Gifts", sub: "First Order" },
                        ].map(({ Icon, title, sub }, i) => (
                            <div key={i} className={`flex items-center gap-3.5 px-2 md:px-5 ${i === 0 ? "md:pl-2" : ""} ${i === 4 ? "md:pr-2" : ""} py-4 md:py-0`}>
                                <div className="flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-8 h-8 text-[#429420]" strokeWidth={1.25} />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-gray-900 leading-[1.2]">{title}</p>
                                    <p className="text-[11px] text-gray-400 mt-1 font-medium">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────────────
                    FEATURED PRODUCTS
                ───────────────────────────────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 md:pt-6 pb-10 md:pb-14 relative">
                    <div className="flex flex-col mb-8 border-b border-gray-200">
                        <div className="inline-block border-b-[2.5px] border-[#429420] pb-2.5 w-fit">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                                Featured Products
                            </h2>
                        </div>
                    </div>
                    
                    {/* Carousel Navigation Arrows */}
                    <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-10 text-gray-700 hover:text-[#429420] transition-colors md:-ml-4 border border-gray-100 hidden md:flex">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-10 text-gray-700 hover:text-[#429420] transition-colors md:-mr-4 border border-gray-100 hidden md:flex">
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <div 
                        ref={scrollRef}
                        className="flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4 pb-4 hide-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {loading ? (
                            Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="w-[140px] md:w-[175px] flex-shrink-0 animate-pulse border border-gray-100 p-2.5 rounded-xl">
                                    <div className="aspect-square bg-gray-100 mb-3 rounded-lg" />
                                    <div className="space-y-2">
                                        <div className="h-3 w-1/3 bg-gray-100" />
                                        <div className="h-4 w-4/5 bg-gray-100" />
                                        <div className="h-3 w-1/2 bg-gray-100" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            FAKE_PRODUCTS.map((product, i) => {
                                return (
                                    <div key={product.id} className="w-[140px] md:w-[175px] flex-shrink-0 snap-start group relative bg-white flex flex-col h-full cursor-pointer border border-gray-100 hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-2.5 rounded-xl transition-all">
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
                                            <div className="absolute top-2 right-2 flex flex-col gap-1.5 translate-x-0 opacity-100 lg:translate-x-10 lg:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
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
                                            <Link href="#">
                                                <h4 className="text-[13px] font-bold text-gray-900 leading-[1.3] mb-1.5 group-hover:text-[#429420] transition-colors line-clamp-2 h-[34px] overflow-hidden">
                                                    {product.name}
                                                </h4>
                                            </Link>
                                            
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
                                            <div className="mt-3 opacity-100 pointer-events-auto lg:opacity-0 lg:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto h-9">
                                                <button 
                                                    onClick={(e) => { e.preventDefault(); console.log("Added fake product") }}
                                                    className="w-full h-full bg-[#429420] text-white font-bold text-[13px] rounded-md hover:bg-[#367a19] transition-colors"
                                                >
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────────────
                    SHOP BY FEATURED CATEGORIES
                ───────────────────────────────────────────────────────────────── */}
                <section className="bg-[#f4f7f4] py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex flex-col mb-10 border-b border-[#429420]/20">
                            <div className="inline-block border-b-[2.5px] border-[#429420] pb-2.5 w-fit">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                                    Shop by Featured Categories
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
                            {[
                                { name: "Organic Limes", Icon: Leaf },
                                { name: "Vegetable", Icon: Carrot },
                                { name: "Dried Fruits", Icon: Cherry },
                                { name: "Cooking Oils", Icon: Droplets },
                                { name: "Cold Drinks", Icon: CupSoda },
                                { name: "Meat And Fish", Icon: Fish },
                                { name: "Baby Care", Icon: Baby },
                                { name: "Pet Care & Food", Icon: PawPrint }
                            ].map((cat, i) => (
                                <Link key={i} href="#" className="flex flex-col items-center group cursor-pointer">
                                    <div className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] bg-white rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(0,0,0,0.02)] group-hover:shadow-[0_8px_25px_rgba(66,148,32,0.15)] transition-all duration-300 group-hover:-translate-y-1">
                                        <cat.Icon className="w-10 h-10 md:w-[48px] md:h-[48px] text-[#429420] stroke-[1.25px]" />
                                    </div>
                                    <span className="text-[12px] md:text-[14px] font-bold text-gray-800 text-center group-hover:text-[#429420] transition-colors">{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────────────
                    CUSTOMER REVIEWS
                ───────────────────────────────────────────────────────────────── */}
                <section className="bg-[#f2f4f8] py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex flex-col mb-10 border-b border-[#429420]/20">
                            <div className="inline-block border-b-[2.5px] border-[#429420] pb-2.5 w-fit">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                                    See What Our Customers Says
                                </h2>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Carousel Navigation Arrows */}
                            <button onClick={() => scrollReviews('left')} className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.08)] z-10 text-gray-700 hover:text-[#429420] transition-colors border border-gray-100 hidden md:flex">
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <button onClick={() => scrollReviews('right')} className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.08)] z-10 text-gray-700 hover:text-[#429420] transition-colors border border-gray-100 hidden md:flex">
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <div 
                                ref={scrollRefReviews}
                                className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-2 hide-scrollbar"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {FAKE_REVIEWS.map((review, i) => (
                                    <div key={i} className="min-w-[280px] md:min-w-[380px] w-[280px] md:w-[380px] flex-shrink-0 snap-start bg-white rounded-md p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[1,2,3,4,5].map(s => (
                                                <div key={s} className="w-[22px] h-[22px] bg-[#8da5e1] rounded-[2px] flex items-center justify-center">
                                                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-[13.5px] md:text-[14.5px] text-gray-600 leading-[1.6] mb-6 min-h-[70px]">
                                            {review.text}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-full overflow-hidden relative bg-gray-200">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-[14px] font-bold text-gray-900">{review.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
