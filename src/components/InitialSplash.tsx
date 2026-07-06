"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/app/loading";

export default function InitialSplash() {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Show the splash screen for a fixed time on initial load
        const timer = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 500); // fade out duration
        }, 1800); // duration to show the animation

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 z-[999999] transition-opacity duration-500 ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
            <Loading />
        </div>
    );
}
