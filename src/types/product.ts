export type Product = {
    id: string;
    slug: string;
    name: string;
    category: string;
    regular_price: number;
    offer_price?: number;
    price: number;
    size_grams: number;
    images: string[];
    is_listed: boolean;
    created_at: string;
    updated_at: string;
};


