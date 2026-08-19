import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Minus, Plus, ShoppingBag, MessageCircle, Check } from 'lucide-react'
import { getProductImage } from '../data/productImages'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import { getProductBySlug, getRelated, discountedPrice, categories } from '../data/products'
import { useCart } from '../context/CartContext'

const TABS = ['Description', 'Ingredients', 'Usage', 'Reviews']

export default function ProductDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = getProductBySlug(slug)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('Description')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setQty(1)
    setTab('Description')
  }, [slug])

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-3xl mb-4">Product not found</h1>
        <Link to="/shop" className="label-caps text-[11px] text-berry border-b border-berry pb-0.5">Back to shop</Link>
      </div>
    )
  }

  const catLabel = categories.find((c) => c.slug === product.category)?.name
  const price = discountedPrice(product)
  const related = getRelated(product)

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <nav className="text-xs text-ink-soft mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-berry">Home</Link> /
        <Link to="/shop" className="hover:text-berry">Shop</Link> /
        <Link to={`/shop?category=${product.category}`} className="hover:text-berry">{catLabel}</Link> /
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[2rem] bg-gradient-to-br from-cream-dark to-blush aspect-square flex items-center justify-center overflow-hidden"
        >
          {product.badge && (
            <span className="absolute top-5 left-5 z-10 label-caps text-[10px] bg-berry text-cream px-3 py-1.5 rounded-full">{product.badge}</span>
          )}
          {product.discount > 0 && (
            <span className="absolute top-5 right-5 z-10 label-caps text-[10px] bg-gold text-ink px-3 py-1.5 rounded-full">-{product.discount}%</span>
          )}
          <img
            src={getProductImage(product)}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <p className="label-caps text-[11px] text-sage mb-2">{catLabel}</p>
          <h1 className="font-display text-4xl text-ink mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 mb-5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill={i < Math.round(product.rating) ? '#B9944C' : 'none'} color="#B9944C" strokeWidth={1.5} />
              ))}
            </div>
            <span className="text-xs text-ink-soft">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-3xl text-ink">Rs {price.toLocaleString()}</span>
            {product.discount > 0 && (
              <span className="text-ink-soft/50 line-through">Rs {product.price.toLocaleString()}</span>
            )}
          </div>

          <p className="text-ink-soft leading-relaxed mb-6">{product.short}</p>

          <div className="flex items-center gap-2 mb-8">
            <span className={`h-2 w-2 rounded-full ${product.availability === 'In Stock' ? 'bg-sage' : 'bg-gold'}`} />
            <span className="text-sm text-ink-soft">{product.availability}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center border border-ink/15 rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:text-berry" aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:text-berry" aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => addItem(product, qty)}
              className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 bg-berry text-cream px-6 py-3.5 rounded-full font-medium hover:bg-berry-dark transition-colors"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button
              onClick={() => {
                addItem(product, qty)
                navigate('/checkout')
              }}
              className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 border border-berry text-berry px-6 py-3.5 rounded-full font-medium hover:bg-berry hover:text-cream transition-colors"
            >
              Order Now
            </button>
          </div>

          <a
            href={`https://wa.me/10000000000?text=${encodeURIComponent(`Hi, I have a question about ${product.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-sage hover:text-ink transition-colors"
          >
            <MessageCircle size={16} /> Ask about this product on WhatsApp
          </a>

          <div className="mt-10 border-t border-ink/10 pt-6">
            <div className="flex gap-6 border-b border-ink/10 mb-5 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-3 text-sm whitespace-nowrap ${tab === t ? 'text-berry border-b-2 border-berry font-medium' : 'text-ink-soft'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            {tab === 'Description' && <p className="text-ink-soft leading-relaxed text-sm">{product.description}</p>}
            {tab === 'Ingredients' && (
              product.ingredients?.length ? (
                <ul className="text-sm text-ink-soft space-y-1.5">
                  {product.ingredients.map((ing) => (
                    <li key={ing} className="flex items-center gap-2"><Check size={13} className="text-sage shrink-0" /> {ing}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-soft">No listed ingredients &mdash; this is a beauty tool/accessory.</p>
              )
            )}
            {tab === 'Usage' && <p className="text-sm text-ink-soft leading-relaxed">{product.usage}</p>}
            {tab === 'Reviews' && (
              <div className="space-y-4">
                <p className="text-sm text-ink-soft">{product.reviews} verified customers rated this product {product.rating} out of 5.</p>
                <div className="text-sm text-ink-soft italic">&ldquo;Genuinely repurchased three times already.&rdquo; &mdash; Verified Buyer</div>
              </div>
            )}
          </div>

          {product.benefits?.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {product.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 bg-cream-dark rounded-xl px-3 py-2.5 text-xs text-ink-soft">
                  <Check size={13} className="text-sage shrink-0" /> {b}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <SectionHeading eyebrow="You Might Also Like" title="Related Products" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
