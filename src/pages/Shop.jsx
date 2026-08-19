import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories, discountedPrice } from '../data/products'

const PAGE_SIZE = 8
const SORTS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name: A-Z' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const search = params.get('search') || ''
  const sort = params.get('sort') || 'relevance'
  const maxPrice = Number(params.get('maxPrice') || 10000)

  const [searchInput, setSearchInput] = useState(search)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => setSearchInput(search), [search])
  useEffect(() => setVisible(PAGE_SIZE), [category, search, sort, maxPrice])

  const update = (patch) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === '' || v === 'all') next.delete(k)
      else next.set(k, v)
    })
    setParams(next)
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => discountedPrice(p) <= maxPrice)
    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.short.toLowerCase().includes(q))
    }
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => discountedPrice(a) - discountedPrice(b))
        break
      case 'price-desc':
        list = [...list].sort((a, b) => discountedPrice(b) - discountedPrice(a))
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }
    return list
  }, [category, search, sort, maxPrice])

  const visibleProducts = filtered.slice(0, visible)

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <div className="mb-8">
        <p className="label-caps text-[11px] text-berry mb-2">Shop All</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink">
          {category !== 'all' ? categories.find((c) => c.slug === category)?.name : 'Every Product'}
        </h1>
        <p className="text-ink-soft mt-2">{filtered.length} products</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className={`md:w-64 shrink-0 ${filtersOpen ? 'block' : 'hidden'} md:block`}>
          <div className="sticky top-24 space-y-8">
            <div>
              <p className="label-caps text-[11px] text-ink mb-3">Search</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  update({ search: searchInput })
                }}
              >
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products..."
                  className="w-full border border-ink/15 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-berry"
                />
              </form>
            </div>

            <div>
              <p className="label-caps text-[11px] text-ink mb-3">Category</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => update({ category: 'all' })}
                  className={`text-left text-sm py-1 ${category === 'all' ? 'text-berry font-semibold' : 'text-ink-soft hover:text-ink'}`}
                >
                  All Products
                </button>
                {categories.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => update({ category: c.slug })}
                    className={`text-left text-sm py-1 ${category === c.slug ? 'text-berry font-semibold' : 'text-ink-soft hover:text-ink'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="label-caps text-[11px] text-ink mb-3">Max Price: Rs {maxPrice.toLocaleString()}</p>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => update({ maxPrice: e.target.value })}
                className="w-full accent-berry"
              />
            </div>

            {(category !== 'all' || search || maxPrice < 10000) && (
              <button
                onClick={() => setParams({})}
                className="flex items-center gap-1.5 text-xs text-berry hover:text-berry-dark"
              >
                <X size={13} /> Clear filters
              </button>
            )}
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 gap-4">
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="md:hidden inline-flex items-center gap-2 border border-ink/15 rounded-full px-4 py-2 text-sm"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <div className="ml-auto flex items-center gap-2">
              <label className="text-xs text-ink-soft hidden sm:inline">Sort by</label>
              <select
                value={sort}
                onChange={(e) => update({ sort: e.target.value })}
                className="border border-ink/15 rounded-full px-3 py-2 text-sm bg-cream focus:outline-none focus:border-berry"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-ink mb-2">No products found</p>
              <p className="text-ink-soft text-sm mb-6">Try adjusting your search or filters.</p>
              <button onClick={() => setParams({})} className="label-caps text-[11px] text-berry border-b border-berry pb-0.5">
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 ">
                <AnimatePresence>
                  {visibleProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </AnimatePresence>
              </div>
              {visible < filtered.length && (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="border border-ink/20 px-8 py-3 rounded-full text-sm font-medium hover:border-berry hover:text-berry transition-colors"
                  >
                    Load More
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
