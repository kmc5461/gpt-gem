// mobile/src/store/cartStore.ts
import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
};

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addItem: (newItem) => set((state) => {
    const existing = state.items.find((i) => i.id === newItem.id);
    if (existing) {
      return {
        items: state.items.map((i) => 
          i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        )
      };
    }
    return { items: [...state.items, newItem] };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id)
  })),

  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map((i) => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    })
  })),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}));
