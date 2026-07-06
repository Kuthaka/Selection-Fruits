export interface StaticProduct {
    id: string;
    brand: string;
    name: string;
    price: number;
    originalPrice: number | null;
    discount: number;
    isNew: boolean;
    rating: number;
    image: string;
    weight: string;
    category: string;
}

export const STATIC_PRODUCTS: StaticProduct[] = [
    { id: "1", brand: "Woodsman",  name: "Pusa Cabbage Green Pattagobi Seed",   price: 71.30, originalPrice: 85.90,  discount: 17, isNew: true,  rating: 3, image: "/promos/mango.png",  weight: "500 g",  category: "Vegetables" },
    { id: "2", brand: "Graphics",  name: "Fresh Juicy Banana Isolated On White",price: 48.90, originalPrice: null,   discount: 0,  isNew: true,  rating: 4, image: "/promos/grapes.png",weight: "1 kg",   category: "Fruits" },
    { id: "3", brand: "Graphics",  name: "Organic Fresh Green Avocado Fruits",  price: 61.90, originalPrice: null,   discount: 0,  isNew: true,  rating: 4, image: "/promos/meat.png",  weight: "3 pcs",  category: "Fruits" },
    { id: "4", brand: "Starwav",   name: "Irresistable Apple Fragrance Oil",    price: 35.20, originalPrice: 41.90,  discount: 16, isNew: true,  rating: 3, image: "/promos/coffee.png", weight: "250 ml", category: "Oils" },
    { id: "5", brand: "Vintage",   name: "Kirat Organic Green Capsicum Seed",   price: 56.90, originalPrice: null,   discount: 0,  isNew: true,  rating: 3, image: "/promos/mango.png",  weight: "50 g",   category: "Vegetables" },
    { id: "6", brand: "Golden",    name: "Onion Hybrid Seeds Vegetable Seeds",  price: 39.19, originalPrice: 50.90,  discount: 23, isNew: true,  rating: 4, image: "/promos/grapes.png",weight: "100 g",  category: "Vegetables" },
    { id: "7", brand: "Harvest",   name: "Farm Fresh Sweet Corn Seeds",         price: 22.50, originalPrice: 30.00,  discount: 25, isNew: false, rating: 5, image: "/promos/meat.png",  weight: "200 g",  category: "Vegetables" },
    { id: "8", brand: "Organic",   name: "Raw Honey From The Wild",             price: 89.00, originalPrice: 110.00, discount: 19, isNew: false, rating: 4, image: "/promos/coffee.png", weight: "500 g",  category: "Natural" },
    { id: "9", brand: "Spice",     name: "Red Chili Powder Organic",            price: 15.00, originalPrice: 18.00,  discount: 16, isNew: true,  rating: 5, image: "/promos/mango.png",  weight: "250 g",  category: "Spices" },
    { id: "10",brand: "Farm",      name: "Fresh Strawberries Basket",           price: 45.00, originalPrice: null,   discount: 0,  isNew: false, rating: 4, image: "/promos/grapes.png",weight: "1 Box",  category: "Fruits" },
];
