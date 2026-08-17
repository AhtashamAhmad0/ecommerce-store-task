# Project Requirement Document (PRD)
## Lumeire — Modern Animated Cosmetic E-Commerce Website (Frontend Only)

**Prepared for:** New Tech Softs — Frontend Development Internship, Task 02
**Prepared by:** Ahtasham Ahmad (Intern ID: NTS/INT/2026/001)
**Date:** Day 1 of 7

---

## 1. Project Overview

Lumeire is a premium cosmetics and beauty brand concept. This project is a **frontend-only**
e-commerce website that lets visitors browse cosmetic products, view detailed product
information, filter and search a shop catalogue, manage a shopping cart, and walk through a
checkout flow ending in an order confirmation screen. No backend, database, API, authentication,
or payment gateway is implemented — cart and order state live in browser memory and
`localStorage`/`sessionStorage`.

## 2. Project Objectives

- Build a professional, premium-feeling cosmetics brand website.
- Deliver a fully responsive layout across desktop, laptop, tablet, and mobile.
- Implement smooth, purposeful animations that don't hurt performance.
- Present products with rich detail: images, pricing, discounts, ingredients, benefits, usage.
- Provide category browsing, search, filtering, and sorting on a dedicated shop page.
- Implement a working frontend shopping cart (add/remove/qty, subtotal/total, persisted).
- Implement a checkout form and a professional order confirmation screen.
- Integrate a WhatsApp contact option throughout the site.
- Demonstrate clean component architecture and reusable code.

## 3. Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Routing | React Router v7 |
| Icons | lucide-react |
| State | React Context API + `localStorage` (cart), `sessionStorage` (last order) |

## 4. Website Structure (Sitemap)

```
/                     Home
/shop                 Shop / Product listing (search, filter, sort)
/product/:slug        Product details
/cart                 Shopping cart
/checkout             Checkout form
/order-confirmation   Order confirmation
```

## 5. Feature List

### Homepage
Hero section · brand introduction · marquee strip · featured products · new arrivals ·
best sellers · category grid · special offers banner · skincare/beauty edit · testimonials ·
newsletter call-to-action · WhatsApp button · footer.

### Shop / Product Listing
Product grid with image, name, short description, price, discounted price, category,
availability, Add to Cart, View Details · search bar · category filter · price range filter ·
sort (price, rating, name) · Load More pagination.

### Product Details
Gallery visual · name · price/discount · rating & reviews · description · ingredients ·
benefits · usage instructions · availability · category · quantity selector · Add to Cart ·
Order Now · related products · WhatsApp product inquiry.

### Shopping Cart
Add / remove items · increase / decrease quantity · per-item price and subtotal · order
total with shipping rule · continue shopping · proceed to checkout · persisted via
`localStorage` · toast confirmation on add.

### Checkout & Order Confirmation
Form: name, phone, email, address, city, order notes · client-side validation · order summary
sidebar (items, subtotal, shipping, total) · Place Order action · generated order number ·
confirmation screen with order details, delivery info, and WhatsApp contact option.

## 6. Product Categories

Skincare · Makeup · Lip Care · Hair Care · Fragrances · Face Care · Body Care ·
Beauty Accessories — 24 sample products distributed across these categories.

## 7. Shopping Cart Flow

```
Browse (Home/Shop) → View product → Add to Cart → Cart icon updates
  → Open Cart → Adjust quantities / remove items → Proceed to Checkout
  → Fill delivery details → Place Order → Order Confirmation → Cart cleared
```

## 8. Checkout Flow

```
Checkout page loads cart summary
  → Customer fills Name, Phone, Email, Address, City, (optional) Notes
  → Client-side validation on submit
  → Order object generated with a unique order number
  → Order stored in sessionStorage, cart cleared
  → Redirect to Order Confirmation with full order recap
```

## 9. Page Structure (Component Map)

```
App
 ├─ Navbar (logo, nav links, search, cart count, mobile menu)
 ├─ Routes
 │   ├─ Home (Hero, CategoryStrip, ProductCard grids, Testimonials, Newsletter)
 │   ├─ Shop (filters/sort sidebar + ProductCard grid + pagination)
 │   ├─ ProductDetails (gallery, info tabs, related products)
 │   ├─ Cart (line items, summary)
 │   ├─ Checkout (form + order summary)
 │   └─ OrderConfirmation (confirmation card)
 ├─ Footer
 └─ WhatsAppButton (floating, site-wide)
```

## 10. UI/UX References & Direction

Premium botanical-luxe aesthetic: warm cream background, deep berry and antique gold accents,
sage green highlight, serif display type (Fraunces) paired with a clean grotesque body face
(Manrope). Generous whitespace, soft rounded product cards, apothecary-label structural
details, and lightweight on-brand SVG product illustrations in place of stock photography.

## 11. Wireframes (Low-Fidelity, ASCII)

**Homepage**
```
[ Logo   Nav Links        Search  Cart(2) ]
[            HERO — headline, CTA, visual  ]
[  marquee strip: Cruelty-Free · Vegan ...  ]
[  Brand intro                              ]
[  Featured Products →  card card card card ]
[  Categories →  icon-grid of 8 categories  ]
[  New Arrivals →  card card card card      ]
[  Special Offer banner                     ]
[  Best Sellers →  card card card card      ]
[  Testimonials  carousel/grid              ]
[  Newsletter CTA                           ]
[  Footer                                   ]
```

**Product Details**
```
[ Gallery visual ]   [ Name / Rating        ]
[                 ]   [ Price / Discount     ]
[                 ]   [ Qty [-] 1 [+]  Add   ]
[                 ]   [ Order Now            ]
[ Tabs: Description | Ingredients | Usage    ]
[ Benefits grid                              ]
[ Related Products                           ]
```

**Cart / Checkout**
```
[ Cart line item: image, name, qty stepper, price, remove ]
[ ... ]
[ Subtotal / Shipping / Total ]  [ Proceed to Checkout ]

[ Checkout form: Name/Phone/Email/City/Address/Notes ] [ Order Summary ]
[ Place Order ]
```

## 12. Development Timeline (7 Days)

| Day | Focus |
|---|---|
| 1 | Requirements, PRD, inspiration research, project scaffolding |
| 2 | Homepage & branding (nav, hero, brand section, featured, categories, footer) |
| 3 | Shop page, filters/search, product details, related products |
| 4 | Cart, checkout form, order confirmation, WhatsApp integration |
| 5 | Animations & interactions (scroll reveals, hover states, transitions) |
| 6 | Responsive design across breakpoints, cross-device testing, bug fixes |
| 7 | Final polish, code cleanup, documentation, deployment, screenshots, demo video |

## 13. Out of Scope

Backend development, database, REST APIs, server-side authentication, admin panel,
server-side order management, and online payment gateway integration are explicitly not
part of this frontend-only task.
