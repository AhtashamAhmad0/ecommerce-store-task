// ---------------------------------------------------------------------------
// Product images
// ---------------------------------------------------------------------------
// 1) Real product photos (your own images)
//    Drop your photo files into `src/assets/products/`, import them below,
//    and map them to the matching product `slug` (see `products.js`).
//
//      import dewVeilImg from '../assets/products/dew-veil-hydrating-serum.jpg'
//
//      export const PRODUCT_IMAGES = {
//        'dew-veil-hydrating-serum': dewVeilImg,
//      }
//
//    Any product whose slug is NOT listed here will automatically fall back
//    to a live stock photo for its category (step 2), so you can add your
//    real photos gradually — nothing breaks in the meantime.
// ---------------------------------------------------------------------------
export const PRODUCT_IMAGES = {
  // 'product-slug': importedImage,
}

// ---------------------------------------------------------------------------
// 2) Live fallback photos (used for any product not listed above)
// ---------------------------------------------------------------------------
// A small pool per category so products in the same category don't all show
// the exact same photo. Swap these URLs any time.
export const CATEGORY_IMAGE_POOL = {
  skincare: [
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80',
  ],
  makeup: [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1583241800698-9f4b8ac0f2c9?auto=format&fit=crop&w=900&q=80',
  ],
  'lip-care': [
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1631730359585-5e5ee6f70a3f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1631214540242-de1300b3ab52?auto=format&fit=crop&w=900&q=80',
  ],
  'hair-care': [
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
  ],
  fragrances: [
    'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=80',
  ],
  'face-care': [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35cc9019b3?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1614859913202-70cf12efaee1?auto=format&fit=crop&w=900&q=80',
  ],
  'body-care': [
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80',
  ],
  'beauty-accessories': [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1522337194846-cb139aa5a4b5?auto=format&fit=crop&w=900&q=80',
  ],
}

const DEFAULT_POOL = CATEGORY_IMAGE_POOL.skincare

/**
 * Resolve the best available image for a product:
 * 1. A real photo you've mapped in PRODUCT_IMAGES by slug
 * 2. A live stock photo from that product's category pool (rotated by `accent`)
 * 3. A hard fallback image, just in case
 */
export function getProductImage(product) {
  if (!product) return DEFAULT_POOL[0]

  const custom = PRODUCT_IMAGES[product.slug]
  if (custom) return custom

  const pool = CATEGORY_IMAGE_POOL[product.category] || DEFAULT_POOL
  const idx = (product.accent ?? 0) % pool.length
  return pool[idx]
}

export const DEFAULT_FALLBACK_IMAGE = DEFAULT_POOL[0]
