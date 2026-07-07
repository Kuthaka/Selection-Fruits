"use client";

import React from 'react';
import { useToastStore } from '@/store/useToastStore';
import { X } from 'lucide-react';

export default function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none md:bottom-12 md:left-auto md:right-12 md:translate-x-0">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="bg-[#1a3821] text-white px-4 py-2 rounded-[14px] shadow-xl flex items-center gap-2.5 animate-toast min-w-[220px] pointer-events-auto"
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
            ))}
        </div>
    );
}
