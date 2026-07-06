"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft, ArrowRight, Truck, ShieldCheck, RotateCcw, Headset, Gift, Leaf, Carrot, Cherry, Droplets, CupSoda, Fish, Baby, PawPrint, Eye, Plus, Star, UtensilsCrossed, BadgePercent, Timer, Heart, Plane } from "lucide-react";
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
        <div className="flex min-h-screen flex-col bg-[#F2EDC2]">
            <Navbar />

            <main className="flex-grow">

                {/* ─────────────────────────────────────────────────────────────────
                    HERO SECTION
                ───────────────────────────────────────────────────────────────── */}
                <section className="w-full relative overflow-hidden min-h-[450px] sm:min-h-[500px] md:min-h-[600px]">
                    {/* Mobile Background */}
                    <div className="absolute inset-0 z-0 md:hidden bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/Mains/banner-mob.png')" }}></div>
                    
                    {/* Desktop Background */}
                    <div className="absolute inset-0 z-0 hidden md:block bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/Mains/banner-2.png')" }}></div>

                    {/* Subtle dark overlay for text readability - restored for mobile too */}
                    <div className="absolute inset-0 bg-black/40 md:bg-black/30 z-0"></div>

                    {/* Vertical Background Text - hidden on mobile anyway */}
                    <div className="absolute -left-36 lg:-left-28 xl:-left-20 top-1/2 -translate-y-1/2 -rotate-90 origin-center hidden lg:block select-none pointer-events-none z-0">
                        <span className="text-[26px] xl:text-[36px] font-black text-white/30 tracking-[0.35em] whitespace-nowrap leading-none mix-blend-overlay animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">SELECTION FRUITS</span>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-12 md:py-20 flex flex-col md:flex-row items-end md:items-center justify-start md:justify-between min-h-[450px] sm:min-h-[500px] md:min-h-[600px] gap-8 md:gap-16 relative z-10 lg:pl-32">
                        
                        {/* Left: Empty space to let background show and push text right */}
                        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center relative">
                            {/* Removed banner-1.png to showcase background image */}
                        </div>

                        {/* Right: Text block */}
                        <div className="w-full md:w-1/2 flex flex-col items-end md:items-start text-right md:text-left justify-start md:justify-center z-10 relative">
                            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 flex-row-reverse md:flex-row">
                                <div className="w-6 md:w-8 h-[2px] bg-[#FFF78D] drop-shadow-sm" />
                                <span className="text-[11px] md:text-[14px] font-bold text-[#FFF78D] tracking-wider drop-shadow-sm">FRESH IN NO TIME</span>
                            </div>
                            
                            <h1 className="text-[32px] sm:text-[40px] md:text-[64px] font-black leading-[1.05] tracking-tight mb-3 md:mb-6 drop-shadow-md" style={{ fontFamily: "var(--font-display)" }}>
                                <span className="text-white">Your Favorite Fruits</span><br/>
                                <span className="text-[#FFF78D]">FRESH IN</span><br/>
                                <span className="text-[#FFF78D]">MINUTES.</span>
                            </h1>
                            
                            <p className="text-[13px] md:text-[18px] text-white/90 font-medium max-w-[260px] sm:max-w-sm md:max-w-md leading-relaxed mb-6 md:mb-10 drop-shadow-sm">
                                Premium organic fruits sourced directly <br className="block md:hidden" /> from local farmers of India
                            </p>
                            
                            <div>
                                <button
                                    onClick={() => router.push("/shop")}
                                    className="bg-[#FFF78D] hover:bg-[#efe77d] text-[#132B1A] text-[12px] md:text-[15px] font-bold px-6 py-3 md:px-10 md:py-4 rounded-full transition-all shadow-[0_8px_20px_rgba(255,247,141,0.2)] hover:shadow-[0_8px_25px_rgba(255,247,141,0.3)] hover:-translate-y-0.5 tracking-widest uppercase active:scale-95"
                                >
                                    YES, I'M HEALTHY
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────────────
                    SPECIALS SECTION
                ───────────────────────────────────────────────────────────────── */}
                <section className="w-full">
                    {/* Top Dark Section */}
                    <div className="w-full bg-[#132B1A] py-14">
                        {/* Features */}
                        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between items-center mb-16 relative">
                            {/* Dotted lines between items, visible on md+ */}
                            <div className="absolute top-[20px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-white/20 hidden md:block"></div>

                            {/* Item 1 */}
                            <div className="flex flex-col items-center gap-4 relative z-10 w-1/2 md:w-auto mb-8 md:mb-0 bg-[#132B1A] px-4">
                                <Timer className="w-8 h-8 text-[#FFF78D]" strokeWidth={1.5} />
                                <div className="text-center font-bold text-[12px] tracking-widest leading-snug">
                                    <span className="text-[#FFF78D]">READY IN</span><br/>
                                    <span className="text-[#FFF78D]">2 MINS</span>
                                </div>
                            </div>
                            {/* Item 2 */}
                            <div className="flex flex-col items-center gap-4 relative z-10 w-1/2 md:w-auto mb-8 md:mb-0 bg-[#132B1A] px-4">
                                <Heart className="w-8 h-8 text-[#FFF78D]" strokeWidth={1.5} />
                                <div className="text-center font-bold text-[12px] tracking-widest leading-snug">
                                    <span className="text-[#FFF78D]">FLAVORS FROM</span><br/>
                                    <span className="text-[#FFF78D]">STREETS</span>
                                </div>
                            </div>
                            {/* Item 3 */}
                            <div className="flex flex-col items-center gap-4 relative z-10 w-1/2 md:w-auto bg-[#132B1A] px-4">
                                <Plane className="w-8 h-8 text-[#FFF78D]" strokeWidth={1.5} />
                                <div className="text-center font-bold text-[12px] tracking-widest leading-snug">
                                    <span className="text-[#FFF78D]">TRAVEL</span><br/>
                                    <span className="text-[#FFF78D]">PARTNER</span>
                                </div>
                            </div>
                            {/* Item 4 */}
                            <div className="flex flex-col items-center gap-4 relative z-10 w-1/2 md:w-auto bg-[#132B1A] px-4">
                                <ShieldCheck className="w-8 h-8 text-[#FFF78D]" strokeWidth={1.5} />
                                <div className="text-center font-bold text-[12px] tracking-widest leading-snug">
                                    <span className="text-[#FFF78D]">HYGIENIC</span><br/>
                                    <span className="text-[#FFF78D]">PACKAGING</span>
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-center text-white text-[28px] md:text-[36px] font-black tracking-wide uppercase">
                            SELECTION FRUITS SPECIALS
                        </h2>
                    </div>

                    {/* Bottom Colored Grid */}
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 h-auto md:h-[400px]">
                        {/* Col 1 */}
                        <div 
                            className="relative flex flex-col items-center justify-end pb-8 pt-12 md:pb-12 md:pt-16 group"
                            style={{ backgroundColor: "#0D530E" }}
                        >
                            {/* Pattern overlay 1: Diagonal Stripes */}
                            <div 
                                className="absolute inset-0 pointer-events-none z-0"
                                style={{
                                    backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1.5px, transparent 1.5px, transparent 12px)`
                                }}
                            />
                            <div className="relative z-10 w-32 h-40 md:w-44 md:h-52 mb-6 md:mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <Image src="/promos/grapes.png" alt="Premium Grapes" fill className="object-contain" unoptimized />
                            </div>
                            <span className="relative z-10 text-white font-black tracking-widest text-[12px] md:text-[14px]">PREMIUM GRAPES</span>
                        </div>

                        {/* Col 2 */}
                        <div className="relative flex flex-col items-center justify-end pb-8 pt-12 md:pb-12 md:pt-16 bg-[#FF5733] group overflow-hidden">
                            {/* Pattern overlay 2: Polka Dots */}
                            <div 
                                className="absolute inset-0 pointer-events-none z-0"
                                style={{
                                    backgroundImage: `radial-gradient(rgba(0,0,0,0.15) 2.5px, transparent 2.5px)`,
                                    backgroundSize: '20px 20px'
                                }}
                            />
                            <div className="relative z-10 w-32 h-40 md:w-44 md:h-52 mb-6 md:mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)] group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <Image src="/promos/mango.png" alt="Fresh Mangoes" fill className="object-contain" unoptimized />
                            </div>
                            <span className="relative z-10 text-white font-black tracking-widest text-[12px] md:text-[14px]">FRESH MANGOES</span>
                        </div>

                        {/* Col 3 */}
                        <div className="relative flex flex-col items-center justify-end pb-8 pt-12 md:pb-12 md:pt-16 bg-[#FFC107] group overflow-hidden">
                            {/* Pattern overlay 3: Grid */}
                            <div 
                                className="absolute inset-0 pointer-events-none z-0"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0,0,0,0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0,0,0,0.08) 1.5px, transparent 1.5px)`,
                                    backgroundSize: '24px 24px'
                                }}
                            />
                            <div className="relative z-10 w-32 h-40 md:w-44 md:h-52 mb-6 md:mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <Image src="/promos/coffee.png" alt="Coffee Beans" fill className="object-contain" unoptimized />
                            </div>
                            <span className="relative z-10 text-white font-black tracking-widest text-[12px] md:text-[14px]">COFFEE BEANS</span>
                        </div>

                        {/* Col 4 */}
                        <div className="relative flex flex-col items-center justify-end pb-8 pt-12 md:pb-12 md:pt-16 bg-[#A0522D] group overflow-hidden">
                            {/* Pattern overlay 4: Diamonds */}
                            <div 
                                className="absolute inset-0 pointer-events-none z-0 opacity-20"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, #000 25%, transparent 25%), linear-gradient(225deg, #000 25%, transparent 25%), linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(315deg, #000 25%, transparent 25%)`,
                                    backgroundPosition: `15px 0, 15px 0, 0 0, 0 0`,
                                    backgroundSize: `30px 30px`
                                }}
                            />
                            <div className="relative z-10 w-32 h-40 md:w-44 md:h-52 mb-6 md:mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <Image src="/promos/meat.png" alt="Fresh Meat" fill className="object-contain" unoptimized />
                            </div>
                            <span className="relative z-10 text-white font-black tracking-widest text-[12px] md:text-[14px]">FRESH MEAT</span>
                        </div>
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────────────
                    FEATURED PRODUCTS
                ───────────────────────────────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-10 md:pb-14 relative">
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
                                                    <Eye className="w-3.5 h-3.5" />
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
                                            
                                            {/* Price */}
                                            <div className="flex items-baseline gap-1.5 h-[24px] mt-auto mb-2">
                                                <span className="text-[14px] font-bold text-[#429420]">${product.price.toFixed(2)}</span>
                                                {product.originalPrice && <span className="text-[12px] text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
                                            </div>
                                            
                                            {/* Add To Cart Hover Button */}
                                            <div className="mt-3 opacity-100 pointer-events-auto lg:opacity-0 lg:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto h-9">
                                                <button 
                                                    onClick={(e) => { e.preventDefault(); console.log("Added fake product") }}
                                                    className="w-full h-full bg-[#25D367] text-white font-bold text-[13px] rounded-md hover:brightness-95 transition-all"
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
                <section className="py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex flex-col mb-10 border-b border-[#429420]/20">
                            <div className="inline-block border-b-[2.5px] border-[#429420] pb-2.5 w-fit">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                                    Shop by Featured Categories
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 md:gap-6">
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
                                    <div className="w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] md:w-[130px] md:h-[130px] bg-white rounded-full flex items-center justify-center mb-3 md:mb-4 shadow-[0_4px_15px_rgba(0,0,0,0.02)] group-hover:shadow-[0_8px_25px_rgba(66,148,32,0.15)] transition-all duration-300 group-hover:-translate-y-1">
                                        <cat.Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-[48px] md:h-[48px] text-[#429420] stroke-[1.25px]" />
                                    </div>
                                    <span className="text-[11px] sm:text-[12px] md:text-[14px] font-bold text-gray-800 text-center group-hover:text-[#429420] transition-colors leading-tight">{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>



            </main>

            <Footer />
        </div>
    );
}
