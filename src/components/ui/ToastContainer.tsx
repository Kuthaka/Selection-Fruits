"use client";

import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';

export default function ToastContainer() {
    return (
        <SonnerToaster 
            position="top-center" 
            offset="120px" 
            duration={1500}
            closeButton
            toastOptions={{
                className: "bg-white text-gray-900 border border-gray-200 dark:bg-[#0f2318] dark:text-white dark:border-[#234d2c] p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center gap-3 font-medium text-[14px]",
                style: { width: '356px', maxWidth: 'calc(100vw - 32px)' }
            }}
        />
    );
}
