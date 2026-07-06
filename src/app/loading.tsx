"use client";

import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#F2EDC2]">
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes leaf-drift {
                    0%   { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
                    50%  { transform: translateY(-18px) rotate(8deg); opacity: 0.35; }
                    100% { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
                }
                @keyframes fruit-drop {
                    0%   { transform: translateY(-90px) rotate(-15deg) scale(0.4); opacity: 0; }
                    25%  { opacity: 1; transform: translateY(-40px) rotate(8deg) scale(1.1); }
                    65%  { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
                    82%  { transform: translateY(10px) scale(0.85); opacity: 0.6; }
                    100% { transform: translateY(10px) scale(0); opacity: 0; }
                }
                @keyframes basket-catch {
                    0%,100% { transform: translateY(0); }
                    40%     { transform: translateY(5px) scaleY(0.95); }
                    70%     { transform: translateY(-3px); }
                }
                @keyframes bar-grow {
                    0%   { width: 0%; }
                    100% { width: 90%; }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes brand-in {
                    0%   { opacity: 0; letter-spacing: 0.5em; }
                    100% { opacity: 1; letter-spacing: 0.2em; }
                }
                @keyframes bg-leaf-float {
                    0%,100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(15deg); }
                }

                .fruit-item {
                    position: absolute;
                    font-size: 2.1rem;
                    line-height: 1;
                    animation: fruit-drop 2.2s infinite ease-in-out;
                    opacity: 0;
                    top: -10px;
                    will-change: transform, opacity;
                }
                .fruit-item:nth-child(1) { animation-delay: 0s;    left: calc(50% - 1.1rem); }
                .fruit-item:nth-child(2) { animation-delay: 0.72s;  left: calc(28%); font-size: 1.8rem; }
                .fruit-item:nth-child(3) { animation-delay: 1.44s;  left: calc(64%); font-size: 1.9rem; }

                .basket-wrap { animation: basket-catch 0.65s infinite ease-in-out; }

                .progress-bar {
                    animation: bar-grow 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .shimmer-bar {
                    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%);
                    background-size: 200% 100%;
                    animation: shimmer 1.8s infinite linear;
                }
                .brand-text {
                    animation: brand-in 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                    opacity: 0;
                }
                .bg-leaf-1 { animation: bg-leaf-float 6s ease-in-out infinite; }
                .bg-leaf-2 { animation: bg-leaf-float 8s ease-in-out infinite 1s; }
                .bg-leaf-3 { animation: bg-leaf-float 7s ease-in-out infinite 2.5s; }
            `}} />

            {/* ── Background decorative leaves (SVG) ── */}
            <svg className="bg-leaf-1 absolute top-10 left-10 opacity-[0.07] text-[#429420]" width="90" height="90" viewBox="0 0 100 100" fill="none">
                <path d="M50 5C50 5 90 25 85 70C80 90 50 95 50 95C50 95 20 90 15 70C10 25 50 5 50 5Z" fill="#429420"/>
                <line x1="50" y1="10" x2="50" y2="90" stroke="#F2EDC2" strokeWidth="2" opacity="0.5"/>
                <line x1="30" y1="45" x2="50" y2="25" stroke="#F2EDC2" strokeWidth="1.5" opacity="0.4"/>
                <line x1="70" y1="45" x2="50" y2="25" stroke="#F2EDC2" strokeWidth="1.5" opacity="0.4"/>
            </svg>
            <svg className="bg-leaf-2 absolute bottom-16 right-12 opacity-[0.06]" width="110" height="110" viewBox="0 0 100 100" fill="none">
                <path d="M50 5C50 5 90 25 85 70C80 90 50 95 50 95C50 95 20 90 15 70C10 25 50 5 50 5Z" fill="#429420"/>
                <line x1="50" y1="10" x2="50" y2="90" stroke="#F2EDC2" strokeWidth="2" opacity="0.5"/>
            </svg>
            <svg className="bg-leaf-3 absolute top-1/3 right-8 opacity-[0.05]" width="70" height="70" viewBox="0 0 100 100" fill="none">
                <path d="M50 5C50 5 90 25 85 70C80 90 50 95 50 95C50 95 20 90 15 70C10 25 50 5 50 5Z" fill="#429420"/>
            </svg>

            {/* ── Main card ── */}
            <div className="flex flex-col items-center gap-0 select-none">

                {/* Brand wordmark */}
                <div className="brand-text mb-10 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2.5">
                        {/* Leaf icon */}
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#429420">
                            <path d="M17 8C8 10 5.9 16.17 3.82 19.82L5.71 21C6.87 19.09 8 17 12 16C12 16 10 20 6 22C6 22 19 22 20 11C20 7 17 3 8 1C12 4 17 8 17 8Z"/>
                        </svg>
                        <span className="text-[11px] font-bold text-[#429420] tracking-[0.3em] uppercase">Selection Fruits</span>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#429420" style={{ transform: "scaleX(-1)" }}>
                            <path d="M17 8C8 10 5.9 16.17 3.82 19.82L5.71 21C6.87 19.09 8 17 12 16C12 16 10 20 6 22C6 22 19 22 20 11C20 7 17 3 8 1C12 4 17 8 17 8Z"/>
                        </svg>
                    </div>
                    <p className="text-[10px] text-[#429420]/50 tracking-[0.15em] uppercase font-semibold">Farm to Your Door</p>
                </div>

                {/* Basket + falling fruits */}
                <div className="relative w-48 h-44 flex items-end justify-center">
                    {/* Falling items */}
                    <span className="fruit-item">🍊</span>
                    <span className="fruit-item">🫐</span>
                    <span className="fruit-item">🍋</span>

                    {/* Basket */}
                    <div className="basket-wrap z-20 mb-2 relative">
                        {/* SVG basket — clean line art */}
                        <svg width="100" height="80" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Handle */}
                            <path d="M38 32 Q60 5 82 32" stroke="#1a4a1c" strokeWidth="4" strokeLinecap="round" fill="none"/>
                            {/* Body */}
                            <path d="M18 42 L28 82 Q60 90 92 82 L102 42 Z" fill="#1a4a1c" opacity="0.08"/>
                            <path d="M18 42 L28 82 Q60 90 92 82 L102 42 Z" stroke="#1a4a1c" strokeWidth="3.5" strokeLinejoin="round" fill="none"/>
                            {/* Weave lines horizontal */}
                            <path d="M21 55 Q60 60 99 55" stroke="#1a4a1c" strokeWidth="1.8" fill="none" opacity="0.4"/>
                            <path d="M24 68 Q60 74 96 68" stroke="#1a4a1c" strokeWidth="1.8" fill="none" opacity="0.4"/>
                            {/* Weave lines vertical */}
                            <line x1="36" y1="43" x2="31" y2="80" stroke="#1a4a1c" strokeWidth="1.5" opacity="0.3"/>
                            <line x1="50" y1="43" x2="47" y2="83" stroke="#1a4a1c" strokeWidth="1.5" opacity="0.3"/>
                            <line x1="60" y1="43" x2="60" y2="84" stroke="#1a4a1c" strokeWidth="1.5" opacity="0.3"/>
                            <line x1="70" y1="43" x2="73" y2="83" stroke="#1a4a1c" strokeWidth="1.5" opacity="0.3"/>
                            <line x1="84" y1="43" x2="89" y2="80" stroke="#1a4a1c" strokeWidth="1.5" opacity="0.3"/>
                            {/* Rim */}
                            <rect x="14" y="38" width="92" height="10" rx="5" fill="#1a4a1c" opacity="0.9"/>
                        </svg>

                        {/* Ground shadow */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/10 rounded-full blur-md"></div>
                    </div>
                </div>

                {/* Loading bar */}
                <div className="mt-6 w-52 flex flex-col items-center gap-3">
                    <div className="relative w-full h-[3px] bg-[#1a4a1c]/10 rounded-full overflow-hidden">
                        <div className="progress-bar absolute left-0 top-0 h-full bg-[#429420] rounded-full"></div>
                        <div className="shimmer-bar absolute inset-0 rounded-full"></div>
                    </div>
                    <p className="text-[11px] text-[#429420]/60 tracking-[0.25em] uppercase font-semibold">
                        Loading fresh picks…
                    </p>
                </div>
            </div>
        </div>
    );
}
