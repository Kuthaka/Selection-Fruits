"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Calendar,
    Tag,
    Loader2,
    Search,
    ChevronRight,
    Clock
} from "lucide-react";
import Navbar from "@/components/headers/Navbar";
import Footer from "@/components/Footer";
import { Blog } from "@/types/blog";
import { STATIC_BLOGS } from "@/data/blogs";

export default function BlogsPage() {
    const [blogs] = useState<Blog[]>(STATIC_BLOGS);
    const [loading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Recipes", "Products", "Announcements", "Health"];

    const filteredBlogs = selectedCategory === "All"
        ? blogs
        : blogs.filter(b => b.category === selectedCategory);

    return (
        <div className="flex min-h-screen flex-col font-sans bg-transparent">
            <Navbar />

            <main className="flex-grow">
                {/* Simple Clean Header */}
                <section className="bg-white py-12 md:py-20 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                            The Journal
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
                            Exploring the heart of fresh produce, healthy recipes, and the juicy stories behind Selection Fruits.
                        </p>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                    {/* Category Filter Bar */}
                    <div className="bg-white rounded-md shadow-[0_2px_15px_-5px_rgba(0,0,0,0.05)] p-4 mb-10 flex items-center justify-between border border-gray-100 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-2 md:gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2.5 rounded-md text-[13px] font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                                        ? "bg-[#429420] text-white shadow-md shadow-[#429420]/20"
                                        : "bg-[#f4f7f4] text-gray-600 hover:bg-[#eaf4e7] hover:text-[#429420]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-24 flex flex-col items-center justify-center gap-4 bg-white rounded-md border border-gray-100 shadow-sm">
                            <Loader2 className="w-10 h-10 text-[#429420] animate-spin" />
                            <p className="text-[13px] font-bold text-gray-500">Loading Journal...</p>
                        </div>
                    ) : filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredBlogs.map((blog) => (
                                <Link
                                    href={`/blogs/${blog.slug}`}
                                    key={blog.id}
                                    className="group bg-white rounded-md overflow-hidden border border-gray-100 shadow-[0_2px_15px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full"
                                >
                                    {/* Blog Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f7f4]">
                                        {blog.cover_image ? (
                                            <Image
                                                src={blog.cover_image}
                                                alt={blog.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-200">
                                                <Tag className="w-8 h-8" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-[#429420] text-[11px] font-bold px-3 py-1.5 rounded-sm shadow-sm border border-gray-100/50">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-[12px] font-medium text-gray-400 mb-3">
                                            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.created_at).toLocaleDateString()}</div>
                                            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 5 Min Read</div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 leading-[1.3] mb-3 group-hover:text-[#429420] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display)" }}>
                                            {blog.title}
                                        </h3>

                                        <p className="text-[14px] text-gray-500 leading-relaxed mb-6 line-clamp-3">
                                            {blog.excerpt}
                                        </p>

                                        <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 bg-[#f4f7f4] rounded-full flex items-center justify-center text-[12px] font-bold text-[#429420]">
                                                    {blog.author.charAt(0)}
                                                </div>
                                                <span className="text-[13px] font-bold text-gray-700">{blog.author}</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#429420] group-hover:text-white transition-all transform group-hover:translate-x-1">
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-md p-20 text-center border font-medium border-gray-200 shadow-sm">
                            <div className="w-16 h-16 bg-[#f4f7f4] rounded-full flex items-center justify-center mx-auto mb-5">
                                <Search className="w-6 h-6 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700" style={{ fontFamily: "var(--font-display)" }}>No Articles Found</h3>
                            <p className="text-gray-500 text-[14px] mt-2">Check back later for fresh fruit insights</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
