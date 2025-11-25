// store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: {
    size?: string;
    color?: string;
  };
};

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant?: { size?: string; color?: string }) => void;
  updateQuantity: (id: string, delta: number, variant?: { size?: string; color?: string }) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (newItem) => {
        set((state) => {
          // Aynı ürün ve aynı varyant var mı kontrol et
          const existingItemIndex = state.items.findIndex(
            (item) => 
              item.id === newItem.id && 
              JSON.stringify(item.variant) === JSON.stringify(newItem.variant)
          );

          if (existingItemIndex > -1) {
            // Varsa adeti artır
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems, isOpen: true }; // Ekleme yapılınca çekmeceyi aç
          }

          // Yoksa yeni ekle
          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (id, variant) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant))
          ),
        }));
      },

      updateQuantity: (id, delta, variant) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant)) {
              const newQuantity = Math.max(1, item.quantity + delta);
              return { ...item, quantity: newQuantity };
            }
            return item;
          });
          return { items: newItems };
        });
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'archetype-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
