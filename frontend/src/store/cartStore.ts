import { create, StateCreator } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  decrement: (id: number) => void;
}


const cartState: StateCreator<CartState> = (set, get) => ({
  items: [],

  addToCart: (product: CartItem) => {
    const items: CartItem[] = get().items; 
    const exist = items.find((i: CartItem) => i.id === product.id);
    if (exist) {
      set({
        items: items.map((i: CartItem) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (id: number) => {
    set({
      items: get().items.filter((i: CartItem) => i.id !== id)
    });
  },

  decrement: (id: number) => {
    const items: CartItem[] = get().items;
    const item = items.find((i: CartItem) => i.id === id);
    if (!item) return;

    if (item.quantity > 1) {
      set({
        items: items.map((i: CartItem) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
      });
    } else {
      set({ items: items.filter((i: CartItem) => i.id !== id) });
    }
  }
});

export const useCartStore = create<CartState>(cartState);