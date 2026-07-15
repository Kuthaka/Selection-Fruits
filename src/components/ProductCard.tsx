import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types/product';

interface ProductCardProps {
    product: any;
    className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <div 
            className={`group relative bg-white flex flex-col h-full border border-gray-100 hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-1.5 md:p-2.5 rounded-xl transition-all ${className}`}
        >
            {/* Image Area */}
            <Link 
                href={`/shop/${product.id}`}
                className="relative aspect-square bg-[#f4f7f4] rounded-lg flex items-center justify-center overflow-hidden p-2 md:p-4 mb-2 md:mb-3 cursor-pointer"
            >
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
                    {product.discount > 0 && (
                        <span className="bg-[#ff4b4b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                            -{product.discount}%
                        </span>
                    )}
                    {product.isNew && (
                        <span className="text-[10px] font-bold text-gray-600 leading-none ml-0.5 mt-0.5">
                            New
                        </span>
                    )}
                </div>

                {/* Product Image */}
                <div className="relative w-[95%] h-[95%] md:w-[85%] md:h-[85%] transform transition-transform duration-500 group-hover:scale-105">
                    <Image src={product.image} alt={product.name} fill className="object-contain" unoptimized={true} sizes="(max-width:640px) 50vw, 16vw" />
                </div>
            </Link>

            {/* Content Area */}
            <div className="flex flex-col flex-grow relative">
                <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] text-gray-500">{product.brand}</p>
                    <p className="text-[10px] font-medium text-gray-400">{product.weight}</p>
                </div>
                <div className="mb-1.5 z-10 relative">
                    <Link href={`/shop/${product.id}`} className="cursor-pointer inline-block w-full">
                        <h4 className="text-[11px] md:text-[13px] font-bold text-gray-900 leading-[1.3] group-hover:text-[#429420] transition-colors line-clamp-2 h-[28px] md:h-[34px] overflow-hidden">
                            {product.name}
                        </h4>
                    </Link>
                </div>
                
                {/* Price & Mobile Add Button */}
                <div className="relative z-20 flex items-center justify-between mt-auto mb-1 lg:mb-2 min-h-[28px]">
                    <div className="flex flex-col gap-0.5 justify-center cursor-default">
                        <span className="text-[12px] md:text-[14px] font-bold text-[#429420] leading-none">QAR {product.price.toFixed(2)}</span>
                        {product.originalPrice && <span className="text-[10px] md:text-[12px] text-gray-400 line-through leading-none">QAR {product.originalPrice.toFixed(2)}</span>}
                    </div>
                    <button 
                        onClick={(e) => { e.preventDefault(); addItem(product as unknown as Product); }}
                        className="w-7 h-7 bg-[#1aad52] text-white rounded-full flex items-center justify-center lg:hidden hover:brightness-95 active:scale-90 transition-all flex-shrink-0 shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                
                {/* Desktop Add To Cart Hover Button */}
                <div className="mt-3 hidden lg:block opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto h-9">
                    <button 
                        onClick={(e) => { e.preventDefault(); addItem(product as unknown as Product); }}
                        className="w-full h-full bg-[#1aad52] text-white font-bold text-[13px] rounded-md hover:brightness-95 transition-all flex items-center justify-center"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
