"use client";

import React from 'react';
import { useToastStore } from '@/store/useToastStore';

export default function ToastContainer() {
    const toasts = useToastStore((state) => state.toasts);

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none md:bottom-12 md:left-auto md:right-12 md:translate-x-0">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="bg-[#1a3821] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-toast min-w-[280px]"
                >
                    <span className="text-xl leading-none">{toast.icon}</span>
                    <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
                </div>
            ))}
        </div>
    );
}
