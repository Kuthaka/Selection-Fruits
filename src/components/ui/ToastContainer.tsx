"use client";

import React from 'react';
import { useToastStore } from '@/store/useToastStore';
import { X } from 'lucide-react';

export default function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed top-24 left-0 right-0 z-[9999] pointer-events-none md:left-auto md:right-8 md:w-[400px]">
            <div className="relative w-full">
                {toasts.map((toast, index) => {
                    const age = toasts.length - 1 - index;
                    const isVisible = age < 4; // Show up to 4 toasts in the stack
                    if (!isVisible) return null;

                    const offset = age * 12; // 12px shift down per older toast
                    const scale = 1 - age * 0.05;
                    const opacity = age === 0 ? 1 : 1 - age * 0.15;

                    return (
                        <div
                            key={toast.id}
                            className="absolute top-0 left-0 right-0 mx-auto w-max md:left-auto md:right-0 md:mx-0 transition-all duration-300 ease-out bg-[#1a3821] text-white px-4 py-2 rounded-[14px] shadow-xl flex items-center gap-2.5 min-w-[220px] pointer-events-auto origin-top"
                            style={{
                                transform: `translateY(${offset}px) scale(${scale})`,
                                opacity: opacity,
                                zIndex: 100 - age,
                            }}
                        >
                            <span className="text-[16px] leading-none">{toast.icon}</span>
                            <span className="text-[12px] font-medium tracking-wide flex-grow">{toast.message}</span>
                            <button 
                                onClick={() => removeToast(toast.id)} 
                                className="ml-2 p-1 opacity-70 hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
