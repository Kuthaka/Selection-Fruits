"use client";

import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, FileImage, FileType2 } from "lucide-react";
import jsPDF from "jspdf";

export default function QrCodePage() {
    const qrUrl = "https://selectionfruits.com/shop";
    const qrRef = useRef<HTMLCanvasElement>(null);
    const qrLogoRef = useRef<HTMLCanvasElement>(null);

    const downloadImage = (ref: React.RefObject<HTMLCanvasElement | null>, format: "png" | "jpeg", nameSuffix: string) => {
        if (!ref.current) return;
        
        const canvas = ref.current;
        const url = canvas.toDataURL(`image/${format}`, 1.0);
        const link = document.createElement("a");
        link.download = `selectionfruits-shop-qr-${nameSuffix}.${format}`;
        link.href = url;
        link.click();
    };

    const downloadPDF = (ref: React.RefObject<HTMLCanvasElement | null>, nameSuffix: string) => {
        if (!ref.current) return;

        const canvas = ref.current;
        const imgData = canvas.toDataURL("image/png", 1.0);
        
        // A4 size: 210 x 297 mm
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        // Add title
        pdf.setFontSize(22);
        pdf.setTextColor(45, 90, 75); // brand teal approx
        pdf.text("Scan to Shop", 105, 40, { align: "center" });

        // Add QR code image
        const imgWidth = 100;
        const imgHeight = 100;
        const x = (210 - imgWidth) / 2;
        const y = 60;
        
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

        // Add website text
        pdf.setFontSize(12);
        pdf.setTextColor(150, 150, 150);
        pdf.text("selectionfruits.com/shop", 105, 175, { align: "center" });

        pdf.save(`selectionfruits-shop-qr-${nameSuffix}.pdf`);
    };

    const renderQrCard = (
        title: string, 
        ref: React.RefObject<HTMLCanvasElement | null>, 
        nameSuffix: string,
        imageSettings?: { src: string; height: number; width: number; excavate: boolean }
    ) => (
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_20px_60px_rgba(45,90,75,0.05)] border border-gray-100 flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* QR Preview Area */}
            <div className="flex flex-col items-center bg-gray-50 rounded-[2rem] p-8 lg:p-12 border border-gray-100 shadow-inner w-full lg:w-auto">
                <div className="mb-6 text-center">
                    <h3 className="text-xl font-black text-brand-teal uppercase tracking-tighter">{title}</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 relative group overflow-hidden">
                    <QRCodeCanvas
                        id={`qr-canvas-${nameSuffix}`}
                        ref={ref}
                        value={qrUrl}
                        size={250}
                        bgColor={"transparent"}
                        fgColor={"#2d5a4b"}
                        level={"H"}
                        includeMargin={false}
                        imageSettings={imageSettings}
                    />
                    <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
                
                <div className="mt-8 text-center space-y-2">
                    <p className="text-sm font-black text-brand-teal uppercase tracking-widest">Redirects To</p>
                    <p className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-4 py-2 rounded-xl">
                        {qrUrl}
                    </p>
                </div>
            </div>

            {/* Download Controls */}
            <div className="flex flex-col w-full lg:w-80 gap-4">
                <div className="mb-4">
                    <h3 className="text-xl font-black text-brand-teal uppercase tracking-tighter flex items-center gap-2">
                        <Download className="w-5 h-5 text-brand-orange" />
                        Export Options
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 leading-relaxed">
                        Download the {title.toLowerCase()} in your preferred format.
                    </p>
                </div>

                <button 
                    onClick={() => downloadImage(ref, 'png', nameSuffix)}
                    className="flex items-center gap-4 bg-white border-2 border-brand-teal/10 hover:border-brand-teal p-4 rounded-2xl text-brand-teal hover:text-white hover:bg-brand-teal transition-all group shadow-sm hover:shadow-xl hover:shadow-brand-teal/20"
                >
                    <div className="bg-brand-teal/10 p-3 rounded-xl group-hover:bg-white/20 transition-colors">
                        <FileImage className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <span className="block font-black text-sm uppercase tracking-wider">Download PNG</span>
                        <span className="block text-[10px] font-bold opacity-60 uppercase tracking-widest">High Quality Transparent</span>
                    </div>
                </button>

                <button 
                    onClick={() => downloadImage(ref, 'jpeg', nameSuffix)}
                    className="flex items-center gap-4 bg-white border-2 border-brand-teal/10 hover:border-brand-teal p-4 rounded-2xl text-brand-teal hover:text-white hover:bg-brand-teal transition-all group shadow-sm hover:shadow-xl hover:shadow-brand-teal/20"
                >
                    <div className="bg-brand-teal/10 p-3 rounded-xl group-hover:bg-white/20 transition-colors">
                        <FileImage className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <span className="block font-black text-sm uppercase tracking-wider">Download JPG</span>
                        <span className="block text-[10px] font-bold opacity-60 uppercase tracking-widest">Small File Size</span>
                    </div>
                </button>

                <button 
                    onClick={() => downloadPDF(ref, nameSuffix)}
                    className="flex items-center gap-4 bg-brand-orange border-2 border-brand-orange p-4 rounded-2xl text-white hover:bg-brand-orange/90 transition-all group shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/40 transform hover:-translate-y-1"
                >
                    <div className="bg-white/20 p-3 rounded-xl">
                        <FileType2 className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <span className="block font-black text-sm uppercase tracking-wider">Download PDF</span>
                        <span className="block text-[10px] font-bold opacity-80 uppercase tracking-widest">Ready for Print (A4)</span>
                    </div>
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-brand-teal uppercase tracking-tighter">QR Code Generator</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Create & Download Store QR Code</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
                {renderQrCard("Standard QR Code", qrRef, "standard")}
                
                {renderQrCard("Logo QR Code", qrLogoRef, "with-logo", {
                    src: "/selection/logo-bg.png",
                    height: 45,
                    width: 90,
                    excavate: true,
                })}
            </div>
        </div>
    );
}
