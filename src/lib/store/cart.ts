import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  maxQuantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => 
            item.productId === newItem.productId && 
            item.variantId === newItem.variantId
        );

        if (existingItem) {
          // Update quantity if item already exists
          const newQuantity = Math.min(
            existingItem.quantity + newItem.quantity,
            existingItem.maxQuantity
          );
          set({
            items: items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: newQuantity }
                : item
            ),
          });
        } else {
          // Add new item
          const itemId = `${newItem.productId}-${newItem.variantId}-${Date.now()}`;
          set({
            items: [...items, { ...newItem, id: itemId }],
          });
        }
        
        // Auto-open cart when item is added
        set({ isOpen: true });
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        return subtotal * 0.08; // 8% tax rate
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 500 ? 0 : 25; // Free shipping over $500
      },

      getTotalPrice: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping();
      },
    }),
    {
      name: 'luxe-atelier-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);