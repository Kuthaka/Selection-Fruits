"use client";

import React, { useEffect, useState } from "react";
import { X, ShoppingBag, ArrowRight, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const [mounted, setMounted] = useState(false);
    const { items, addItem, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

    // Prevent body scroll when drawer is open
    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    const totalPrice = getTotalPrice();
    const totalItems = getTotalItems();

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 z-[90] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#fcf9f2] shadow-[0_0_50px_rgba(0,0,0,0.2)] z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-[#fcf9f2]">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6 text-[#429420]" />
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                            Your Bag <span className="text-gray-400 font-medium ml-1 text-sm">({totalItems})</span>
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white rounded-full transition-colors text-gray-900 group shadow-sm border border-gray-100"
                    >
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="h-full p-8 flex flex-col items-center justify-center text-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 bg-[#eaf4e7] rounded-full flex items-center justify-center animate-pulse">
                                    <ShoppingBag className="w-10 h-10 text-[#429420]" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-[#429420] text-xs font-bold">
                                    0
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-gray-900 uppercase" style={{ fontFamily: "var(--font-display)" }}>Empty Cart</h3>
                                <p className="text-gray-500 text-sm max-w-[280px] leading-relaxed">
                                    Looks like you haven't added anything to your cart yet. Let's find some delicious fruits!
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="mt-4 px-10 py-4 bg-[#429420] text-white font-black rounded-full hover:shadow-[0_10px_30px_rgba(66,148,32,0.3)] transition-all hover:scale-105 flex items-center gap-3 group uppercase tracking-widest text-[13px]"
                            >
                                Continue Shopping
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ) : (
                        <div className="p-6 space-y-5">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 group bg-white p-3 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100">
                                    <div className="relative w-20 h-20 bg-[#f4f7f4] rounded-xl overflow-hidden flex-shrink-0">
                                        {item.images?.[0] ? (
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-200">
                                                <ShoppingBag className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="text-gray-900 font-bold text-[13px] leading-tight line-clamp-2">
                                                    {item.name}
                                                </h4>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                                                {item.category || "Fresh"}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center bg-[#f4f7f4] rounded-lg p-1 border border-gray-100">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-7 text-center text-xs font-bold text-gray-900">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[#429420] font-black text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 pb-32 md:pb-8 border-t border-gray-200 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-500 font-bold uppercase text-[11px] tracking-[0.1em]">Summary</span>
                        <div className="text-right">
                            <span className="text-gray-900 font-black text-2xl block">${totalPrice.toFixed(2)}</span>
                            <span className="text-gray-400 text-[10px]">Taxes calculated at checkout</span>
                        </div>
                    </div>
                    <button
                        onClick={async () => {
                            if (items.length === 0) return;

                            let message = "Hello Selection Fruits! 👋\n\nI'd like to place an order for the following items:\n\n";

                            items.forEach((item, index) => {
                                message += `${index + 1}. *${item.name}*\n   🔢 Qty: ${item.quantity}\n   💰 Price: $${(item.price * item.quantity).toFixed(2)}\n   🔗 Link: ${window.location.origin}/shop/${item.slug}\n\n`;
                            });

                            message += `--------------------------\n🛍️ *Total Items:* ${totalItems}\n💳 *Total Amount:* $${totalPrice.toFixed(2)}\n\nPlease let me know how to proceed. Thank you!`;

                            const { handleWhatsAppCheckout } = await import("@/lib/whatsapp");
                            handleWhatsAppCheckout(message);
                        }}
                        disabled={items.length === 0}
                        className={`w-full py-4 flex items-center justify-center gap-3 font-bold rounded-xl text-[13px] transition-all ${items.length > 0
                            ? "bg-[#429420] text-white shadow-lg hover:shadow-xl shadow-[#429420]/20 hover:-translate-y-0.5 hover:bg-[#367a19]"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Checkout via WhatsApp
                        <MessageCircle className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </>
    );
}
