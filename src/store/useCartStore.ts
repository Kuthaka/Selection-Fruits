import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/product';
import { useToastStore } from '@/store/useToastStore';

const getFruitIcon = (name: string) => {
    const l = name.toLowerCase();
    if (l.includes('mango')) return '🥭';
    if (l.includes('apple')) return '🍎';
    if (l.includes('orange')) return '🍊';
    if (l.includes('grape')) return '🍇';
    if (l.includes('watermelon')) return '🍉';
    if (l.includes('banana')) return '🍌';
    if (l.includes('strawberry')) return '🍓';
    if (l.includes('kiwi')) return '🥝';
    if (l.includes('cherry')) return '🍒';
    if (l.includes('peach')) return '🍑';
    if (l.includes('lemon')) return '🍋';
    if (l.includes('coconut')) return '🥥';
    if (l.includes('pineapple')) return '🍍';
    if (l.includes('avocado')) return '🥑';
    if (l.includes('tomato')) return '🍅';
    if (l.includes('carrot')) return '🥕';
    if (l.includes('cabbage')) return '🥬';
    if (l.includes('corn')) return '🌽';
    if (l.includes('broccoli')) return '🥦';
    return '🛒';
};

export interface CartItem extends Product {
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: Product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...currentItems, { ...product, quantity: 1 }] });
                }
                
                useToastStore.getState().addToast(`Added ${product.name} to cart`, getFruitIcon(product.name));
            },

            removeItem: (productId: string) => {
                const itemToRemove = get().items.find(i => i.id === productId);
                set({
                    items: get().items.filter((item) => item.id !== productId),
                });
                if (itemToRemove) {
                    useToastStore.getState().addToast(`Removed ${itemToRemove.name} from cart`, getFruitIcon(itemToRemove.name));
                }
            },

            updateQuantity: (productId: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                const itemToUpdate = get().items.find(i => i.id === productId);
                set({
                    items: get().items.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                });
                if (itemToUpdate && itemToUpdate.quantity !== quantity) {
                    useToastStore.getState().addToast(`Updated ${itemToUpdate.name} quantity to ${quantity}`, getFruitIcon(itemToUpdate.name));
                }
            },

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'selection-fruits-cart',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
