"use client";

import React from "react";
import { ShoppingBasket } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#F2EDC2] flex flex-col items-center justify-center min-h-screen">
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes catch-bounce {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(6px) scaleY(0.95) scaleX(1.05); }
                }
                @keyframes fall-fruit {
                    0% { transform: translateY(-120px) rotate(-20deg) scale(0.5); opacity: 0; }
                    20% { transform: translateY(-70px) rotate(10deg) scale(1.2); opacity: 1; }
                    70% { transform: translateY(0px) rotate(20deg) scale(1); opacity: 1; }
                    85% { transform: translateY(20px) scale(0.5); opacity: 0; }
                    100% { transform: translateY(20px) scale(0); opacity: 0; }
                }
                .fruit-drop {
                    position: absolute;
                    font-size: 2.5rem;
                    animation: fall-fruit 2s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    opacity: 0;
                    z-index: 10;
                    top: 10px;
                }
                .delay-1 { animation-delay: 0s; left: 50%; margin-left: -1.25rem; }
                .delay-2 { animation-delay: 0.6s; left: 25%; font-size: 2rem; }
                .delay-3 { animation-delay: 1.2s; left: 65%; font-size: 2.2rem; }
                .basket-container {
                    animation: catch-bounce 0.6s infinite ease-in-out;
                }
            `}} />

            <div className="relative flex flex-col items-center justify-end w-40 h-48 mb-6">
                <span className="fruit-drop delay-1">🍊</span>
                <span className="fruit-drop delay-2">🥦</span>
                <span className="fruit-drop delay-3">🍇</span>
                
                <div className="basket-container relative z-20 mt-auto text-[#132B1A]">
                    <ShoppingBasket size={80} strokeWidth={1.5} />
                    {/* Inner shadow/depth for basket */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/10 rounded-full blur-sm -z-10"></div>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <h2 className="text-[20px] md:text-2xl font-black text-[#132B1A] tracking-wider uppercase mb-4 text-center">
                    Freshness Incoming
                </h2>
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#429420] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#429420] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#429420] animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
            </div>
        </div>
    );
}
