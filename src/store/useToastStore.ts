import { create } from 'zustand';
import { toast as sonnerToast } from 'sonner';

export interface ToastItem {
    id: string | number;
    message: string;
    icon?: string;
}

interface ToastStore {
    toasts: ToastItem[]; // Kept for backward compatibility if any component reads it
    addToast: (message: string, icon?: string) => void;
    removeToast: (id: string | number) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (message, icon = '🛒') => {
        sonnerToast(message, {
            icon: icon,
        });
    },
    removeToast: (id) => {
        sonnerToast.dismiss(id);
    },
}));
