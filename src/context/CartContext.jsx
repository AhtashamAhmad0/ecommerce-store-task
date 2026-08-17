import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { discountedPrice } from '../data/products'

const CartContext = createContext(null)
const STORAGE_KEY = 'lumeire_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable, ignore */
    }
  }, [items])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { id: product.id, qty }]
    })
    setToast(`${product.name} added to cart`)
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const setQty = (id, qty) => {
    if (qty < 1) return removeItem(id)
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const clearCart = () => setItems([])

  const value = useMemo(() => ({ items, addItem, removeItem, setQty, clearCart, toast, setToast }), [items, toast])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function computeTotals(cartItems, allProducts) {
  const lines = cartItems
    .map((ci) => {
      const product = allProducts.find((p) => p.id === ci.id)
      if (!product) return null
      const unit = discountedPrice(product)
      return { product, qty: ci.qty, unit, subtotal: unit * ci.qty }
    })
    .filter(Boolean)
  const subtotal = lines.reduce((sum, l) => sum + l.subtotal, 0)
  const shipping = subtotal > 0 && subtotal < 5000 ? 250 : 0
  const total = subtotal + shipping
  const count = lines.reduce((sum, l) => sum + l.qty, 0)
  return { lines, subtotal, shipping, total, count }
}
