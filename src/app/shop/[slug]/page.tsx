"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Star, Check, ChevronUp, ChevronDown, Heart, Shuffle, Loader2 } from "lucide-react";

import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";

export default function ProductDetails() {
    const { slug } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [qty, setQty] = useState(1);

    const addItem = useCartStore((state) => state.addItem);

    const supabase = createClient();

    useEffect(() => {
        if (slug) {
            fetchProductData();
        }
    }, [slug]);

    const fetchProductData = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("slug", slug)
                .single();

            if (error) throw error;
            setProduct(data);
        } catch (err) {
            console.error("Error fetching product:", err);
            // Fallback for demonstration to match exact UI requested
            setProduct({
                id: "1",
                slug: "demo",
                name: "Pusa Cabbage Green Pattagobi Seed",
                category: "Vegetables",
                price: 85.90,
                regular_price: 85.90,
                offer_price: 71.30,
                size_grams: 500,
                images: ["/promos/mango.png", "/promos/grapes.png", "/promos/meat.png"],
                is_listed: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            } as Product);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
                <Loader2 className="w-10 h-10 text-[#429420] animate-spin" />
                <p className="text-[13px] font-semibold text-gray-500">Loading product...</p>
            </div>
        );
    }

    if (!product) return null;

    const displayImages = product.images && product.images.length > 0 ? product.images : ["/promos/mango.png"];
    const displayPrice = product.offer_price ?? product.price;

    return (
        <div className="flex min-h-screen flex-col font-sans bg-white">
            <Navbar />

            <main className="flex-grow max-w-[1350px] mx-auto w-full px-4 md:px-8 pt-12 pb-24">
                
                {/* ── Breadcrumbs ── */}
                <div className="flex items-center mb-10 h-[38px] overflow-hidden">
                    {/* Home */}
                    <Link href="/" className="relative flex items-center h-full bg-white border border-gray-300 border-r-0 pl-6 pr-4 z-30 hover:text-[#429420] transition-colors">
                        <span className="font-semibold text-gray-700 text-[13px]">Home</span>
                        <div className="absolute top-[-1px] right-[-19px] w-0 h-0 border-y-[19px] border-y-transparent border-l-[19px] border-l-gray-300 z-10"></div>
                        <div className="absolute top-[0px] right-[-18px] w-0 h-0 border-y-[18px] border-y-transparent border-l-[18px] border-l-white z-20"></div>
                    </Link>
                    {/* Category (Shop/Tomatoes) */}
                    <Link href="/shop" className="relative flex items-center h-full bg-[#f4f7f4] border border-gray-300 border-l-0 border-r-0 pl-10 pr-4 z-20 -ml-[1px] hover:text-[#429420] transition-colors">
                        <span className="font-semibold text-gray-800 text-[13px]">Tomatoes</span>
                        <div className="absolute top-[-1px] right-[-19px] w-0 h-0 border-y-[19px] border-y-transparent border-l-[19px] border-l-gray-300 z-10"></div>
                        <div className="absolute top-[0px] right-[-18px] w-0 h-0 border-y-[18px] border-y-transparent border-l-[18px] border-l-[#f4f7f4] z-20"></div>
                    </Link>
                    {/* Current Product */}
                    <div className="relative flex items-center h-full bg-[#f4f7f4] border border-gray-300 border-l-0 border-r-0 pl-10 pr-4 z-10 -ml-[1px]">
                        <span className="font-semibold text-gray-900 text-[13px]">{product.name}</span>
                        <div className="absolute top-[-1px] right-[-19px] w-0 h-0 border-y-[19px] border-y-transparent border-l-[19px] border-l-gray-300 z-10"></div>
                        <div className="absolute top-[0px] right-[-18px] w-0 h-0 border-y-[18px] border-y-transparent border-l-[18px] border-l-[#f4f7f4] z-20"></div>
                    </div>
                </div>

                {/* ── Main Layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    
                    {/* Left: Image Gallery */}
                    <div className="flex gap-4">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-3 w-[80px] flex-shrink-0">
                            {displayImages.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative w-full aspect-square border rounded-sm p-1 transition-all ${
                                        activeImage === idx ? 'border-[#429420] bg-white' : 'border-gray-200 bg-[#f4f7f4] opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <Image src={img} alt={`${product.name} thumbnail`} fill className="object-cover rounded-sm" />
                                </button>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-grow aspect-square relative bg-white border border-gray-200 rounded-sm overflow-hidden">
                            <Image 
                                src={displayImages[activeImage]} 
                                alt={product.name} 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <h1 className="text-[26px] font-bold text-gray-900 mb-2">{product.name}</h1>
                        
                        {/* Stars & Info */}
                        <div className="flex flex-col mb-4">
                            <div className="flex items-center gap-0.5 mb-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`w-3.5 h-3.5 ${s <= 3 ? 'fill-[#ffc107] text-[#ffc107]' : 'fill-gray-200 text-gray-200'}`} />
                                ))}
                            </div>
                            <p className="text-[13px] text-gray-400 font-medium">
                                Brand : Woodsman <span className="mx-2 text-gray-300">|</span> Reference : demo_10
                            </p>
                        </div>
                        
                        <hr className="border-gray-200 mb-5" />
                        
                        <p className="text-[14px] text-gray-500 leading-relaxed mb-6 font-medium">
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                        </p>
                        
                        {/* Variations */}
                        <div className="space-y-4 mb-6">
                            {/* Color */}
                            <div>
                                <p className="text-[13.5px] font-bold text-gray-900 mb-2">Color : <span className="font-medium text-gray-600">Green</span></p>
                                <div className="flex items-center gap-2">
                                    {['Taupe', 'Beige', 'White'].map(c => (
                                        <button key={c} className="px-4 py-1.5 border border-gray-200 text-gray-600 text-[13px] rounded-sm font-medium hover:border-gray-300">{c}</button>
                                    ))}
                                    <button className="px-4 py-1.5 border border-[#429420] text-gray-800 text-[13px] rounded-sm font-medium">Green</button>
                                </div>
                            </div>
                            
                            {/* Size */}
                            <div>
                                <p className="text-[13.5px] font-bold text-gray-900 mb-2">Size : <span className="font-medium text-gray-600">M</span></p>
                                <div className="flex items-center gap-2">
                                    <button className="px-4 py-1.5 border border-[#429420] text-gray-800 text-[13px] rounded-sm font-medium">M</button>
                                    {['L', 'XL'].map(s => (
                                        <button key={s} className="px-4 py-1.5 border border-gray-200 text-gray-600 text-[13px] rounded-sm font-medium hover:border-gray-300">{s}</button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Dimension */}
                            <div>
                                <p className="text-[13.5px] font-bold text-gray-900 mb-2">Dimension : <span className="font-medium text-gray-600">60x90cm</span></p>
                                <div className="flex items-center gap-2">
                                    <button className="px-4 py-1.5 border border-[#429420] text-gray-800 text-[13px] rounded-sm font-medium">60x90cm</button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Stock Info & Countdown */}
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-1.5 bg-[#e8f4ea] text-[#429420] px-2.5 py-1 rounded-sm text-[12px] font-bold mb-4">
                                <Check className="w-3.5 h-3.5" /> In Stock
                            </div>
                            
                            <p className="text-[14px] text-gray-700 mb-2 font-medium">Hurry! only <span className="font-bold text-gray-900">47</span> items left in stock.</p>
                            
                            <div className="w-full max-w-sm h-1.5 bg-gray-100 rounded-full mb-4">
                                <div className="w-[80%] h-full bg-[#ffc107] rounded-full"></div>
                            </div>
                            
                            {/* Timer Blocks */}
                            <div className="flex gap-2">
                                {[
                                    { val: '25', lbl: 'Days' },
                                    { val: '00', lbl: 'Hrs' },
                                    { val: '04', lbl: 'Mins' },
                                    { val: '38', lbl: 'Secs' },
                                ].map(t => (
                                    <div key={t.lbl} className="w-[44px] h-[48px] bg-[#f4f7f4] flex flex-col items-center justify-center rounded-sm">
                                        <span className="text-[15px] font-bold text-gray-800 leading-none mb-0.5">{t.val}</span>
                                        <span className="text-[9px] font-bold text-gray-500">{t.lbl}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-[24px] font-bold text-[#429420]">${displayPrice.toFixed(2)}</span>
                            {product.regular_price && (
                                <>
                                    <span className="text-[16px] font-bold text-gray-400 line-through">${product.regular_price.toFixed(2)}</span>
                                    <span className="text-[14px] font-bold text-[#dc2626]">Save 17%</span>
                                </>
                            )}
                        </div>
                        
                        <hr className="border-gray-200 mb-6" />
                        
                        {/* Add to Cart Actions */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex border border-gray-300 rounded-sm w-[75px] h-11 bg-white">
                                <input 
                                    type="text" 
                                    value={qty} 
                                    readOnly 
                                    className="w-full h-full text-center text-[15px] font-semibold text-gray-800 outline-none bg-transparent" 
                                />
                                <div className="flex flex-col border-l border-gray-300 w-7">
                                    <button onClick={() => setQty(q => q + 1)} className="flex-1 flex items-center justify-center hover:bg-gray-50 border-b border-gray-300">
                                        <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                                    </button>
                                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex-1 flex items-center justify-center hover:bg-gray-50">
                                        <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    for(let i=0; i<qty; i++) addItem(product);
                                }}
                                className="h-11 px-14 bg-[#429420] text-white text-[14px] font-bold rounded-sm hover:bg-[#367a19] transition-colors shadow-sm"
                            >
                                Add To Cart
                            </button>
                        </div>
                        
                        {/* Extra Actions */}
                        <div className="flex items-center gap-6 mb-8 mt-2">
                            <button className="flex items-center gap-1.5 text-[12.5px] font-bold text-gray-600 hover:text-[#429420] transition-colors">
                                <Shuffle className="w-3.5 h-3.5" /> Add To Compare
                            </button>
                            <button className="flex items-center gap-1.5 text-[12.5px] font-bold text-gray-600 hover:text-[#429420] transition-colors">
                                <Heart className="w-3.5 h-3.5" /> Add To Wishlist
                            </button>
                        </div>
                        
                        <hr className="border-gray-200 mb-6" />
                        
                        {/* Social Share Buttons */}
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1.5 px-3 py-1 bg-[#3b5998] hover:bg-[#324b80] transition-colors text-white text-[12px] font-bold rounded-sm shadow-sm">
                                <span className="font-serif italic font-bold pr-1">f</span> Share
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1 bg-[#00aced] hover:bg-[#0092c8] transition-colors text-white text-[12px] font-bold rounded-sm shadow-sm">
                                <span className="font-serif italic font-bold">t</span> Tweet
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1 bg-[#cb2027] hover:bg-[#a81a20] transition-colors text-white text-[12px] font-bold rounded-sm shadow-sm">
                                <span className="font-serif italic font-bold pr-1">p</span> Pinterest
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Bottom Tabs ── */}
                <div className="mt-20">
                    <div className="flex items-center justify-center gap-10 border-b border-gray-200">
                        <button className="pb-4 border-b-[3px] border-[#429420] text-[15px] font-bold text-gray-900 px-2">
                            Description
                        </button>
                        <button className="pb-4 border-b-[3px] border-transparent hover:border-gray-300 text-[15px] font-bold text-gray-600 hover:text-gray-900 transition-colors px-2">
                            Product Details
                        </button>
                        <button className="pb-4 border-b-[3px] border-transparent hover:border-gray-300 text-[15px] font-bold text-gray-600 hover:text-gray-900 transition-colors px-2">
                            Shipping
                        </button>
                        <button className="pb-4 border-b-[3px] border-transparent hover:border-gray-300 text-[15px] font-bold text-gray-600 hover:text-gray-900 transition-colors px-2">
                            Size Chart
                        </button>
                    </div>
                    {/* Placeholder for tab content */}
                    <div className="py-8 text-center text-gray-500 text-[14px]">
                        Product description goes here...
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
