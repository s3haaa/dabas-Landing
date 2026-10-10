import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '../types';

type CartLine = { product: Product; quantity: number };
type ShopContextValue = {
  cart: CartLine[]; wishlist: string[]; cartOpen: boolean; wishlistOpen: boolean; quickView: Product | null;
  addToCart: (product: Product) => void; removeFromCart: (id: string) => void; updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (id: string) => void; setCartOpen: (open: boolean) => void; setWishlistOpen: (open: boolean) => void; setQuickView: (product: Product | null) => void;
  cartCount: number; cartTotal: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);
const read = <T,>(key: string, fallback: T): T => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => read('dabas-cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => read('dabas-wishlist', []));
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  useEffect(() => localStorage.setItem('dabas-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('dabas-wishlist', JSON.stringify(wishlist)), [wishlist]);
  const value = useMemo<ShopContextValue>(() => ({
    cart, wishlist, cartOpen, wishlistOpen, quickView,
    addToCart: (product) => { setCart((lines) => { const line = lines.find((item) => item.product.id === product.id); return line ? lines.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...lines, { product, quantity: 1 }]; }); setCartOpen(true); },
    removeFromCart: (id) => setCart((lines) => lines.filter((line) => line.product.id !== id)),
    updateQuantity: (id, quantity) => setCart((lines) => quantity < 1 ? lines.filter((line) => line.product.id !== id) : lines.map((line) => line.product.id === id ? { ...line, quantity } : line)),
    toggleWishlist: (id) => setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]),
    setCartOpen, setWishlistOpen, setQuickView,
    cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
    cartTotal: cart.reduce((sum, line) => sum + line.quantity * line.product.price, 0)
  }), [cart, wishlist, cartOpen, wishlistOpen, quickView]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => { const value = useContext(ShopContext); if (!value) throw new Error('useShop must be inside ShopProvider'); return value; };
