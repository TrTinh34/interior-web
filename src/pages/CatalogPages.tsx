import {
  ChevronDown,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  Truck,
} from "lucide-react"
import { useState } from "react"
import { Link, useParams, useSearchParams } from "react-router"
import ProductCard from "../components/ProductCard"
import {
  Badge,
  Button,
  ButtonLink,
  Input,
  SearchField,
  SectionTitle,
  Select,
} from "../components/ui"
import { categories, products } from "../data/store"

function Breadcrumb({ current }: { current: string }) {
  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link>
      <ChevronRight size={14} />
      <span>{current}</span>
    </div>
  )
}

export function ProductsPage({ searchMode = false }: { searchMode?: boolean }) {
  const [params] = useSearchParams()
  const query = params.get("q") || "table lamp"
  return (
    <div className="page section catalog-page">
      <Breadcrumb current={searchMode ? "Search" : "All products"} />
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {searchMode ? "Discover" : "The full collection"}
          </span>
          <h1>
            {searchMode ? `Search results for “${query}”` : "All products"}
          </h1>
          <p>
            {searchMode
              ? "8 considered pieces found for your space."
              : "Timeless objects, natural materials and quiet details for a well-lived home."}
          </p>
        </div>
      </div>
      {searchMode && (
        <div className="search-hero">
          <SearchField placeholder="Search for products, rooms or materials" />
          <Button>
            <Search size={17} /> Search
          </Button>
        </div>
      )}
      <div className="catalog-toolbar">
        <span>Showing 1–8 of 48 pieces</span>
        <div>
          <Button variant="secondary">
            <SlidersHorizontal size={16} /> Filters
          </Button>
          <Select aria-label="Sort products">
            <option>Featured</option>
            <option>Newest</option>
            <option>Price: low to high</option>
            <option>Best rated</option>
          </Select>
        </div>
      </div>
      <div className="catalog-layout">
        <aside className="filters">
          <Filter
            title="Category"
            items={["Lighting", "Vases", "Wall art", "Table decor", "Textiles"]}
          />
          <Filter
            title="Material"
            items={["Ceramic", "Wood", "Stone", "Linen", "Glass"]}
          />
          <Filter
            title="Color"
            items={["Natural", "Ivory", "Brown", "Charcoal"]}
          />
          <Filter
            title="Price"
            items={["Under $75", "$75 – $150", "$150 – $300", "$300+"]}
          />
          <Filter title="Availability" items={["In stock", "Made to order"]} />
        </aside>
        <div>
          <div className="product-grid catalog-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="pagination">
            <Button variant="secondary">Previous</Button>
            <Button>1</Button>
            <Button variant="ghost">2</Button>
            <Button variant="ghost">3</Button>
            <span>…</span>
            <Button variant="ghost">6</Button>
            <Button variant="secondary">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Filter({ title, items }: { title: string items: string[] }) {
  return (
    <div className="filter-group">
      <h3>
        {title}
        <ChevronDown size={16} />
      </h3>
      {items.map((item) => (
        <label key={item}>
          <input type="checkbox" /> <span>{item}</span>
          <small>{Math.floor(Math.random() * 20) + 4}</small>
        </label>
      ))}
    </div>
  )
}

export function CategoriesPage() {
  return (
    <div className="page section">
      <Breadcrumb current="Categories" />
      <div className="page-heading center">
        <span className="eyebrow">Explore by collection</span>
        <h1>Find your finishing touch</h1>
        <p>
          From soft light to sculptural form, discover considered objects for
          every corner of home.
        </p>
      </div>
      <div className="categories-grid">
        {categories.map((c, i) => (
          <Link
            className={
              i === 0 || i === 5 ? "category-tile wide" : "category-tile"
            }
            to="/products"
            key={c.id}
          >
            <img src={c.imageUrl} alt={c.name} />
            <div>
              <span>{c.count} products</span>
              <h2>{c.name}</h2>
              <small>
                Explore collection <Arrow />
              </small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
function Arrow() {
  return <span>→</span>
}

export function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id)) ?? products[0]
  const [quantity, setQuantity] = useState(1)
  return (
    <div className="page section product-detail">
      <Breadcrumb current={product.name} />
      <div className="product-detail-grid">
        <div className="gallery">
          <div className="thumbnails">
            {[product.imageUrl, products[1].imageUrl, products[3].imageUrl].map(
              (src, i) => (
                <button key={src} className={i === 0 ? "active" : ""}>
                  <img src={src} alt="" />
                </button>
              ),
            )}
          </div>
          <div className="main-image">
            <img src={product.imageUrl} alt={product.name} />
            <Badge>{product.badge ?? "Hand finished"}</Badge>
          </div>
        </div>
        <div className="detail-info">
          <span className="eyebrow">{product.categoryName}</span>
          <h1>{product.name}</h1>
          <div className="rating">
            <Star size={16} fill="currentColor" /> {product.rating}{" "}
            <Link to="#reviews">{product.reviewCount} reviews</Link>
          </div>
          <div className="detail-price">
            ${product.price.toFixed(2)}{" "}
            {product.originalPrice && <del>${product.originalPrice}</del>}
          </div>
          <Badge tone="success">In stock — ready to ship</Badge>
          <p className="detail-copy">
            A study in texture and restraint. Each piece is shaped to bring
            warmth and quiet character to the room, with a naturally tactile
            finish that makes every one subtly unique.
          </p>
          <div className="option">
            <strong>
              Finish <span>Warm ivory</span>
            </strong>
            <div className="swatches">
              <button className="selected" aria-label="Warm ivory" />
              <button aria-label="Sand" />
              <button aria-label="Charcoal" />
            </div>
          </div>
          <div className="option">
            <strong>
              Size <span>Medium</span>
            </strong>
            <div className="sizes">
              <Button variant="secondary">Small</Button>
              <Button>Medium</Button>
              <Button variant="secondary">Large</Button>
            </div>
          </div>
          <div className="buy-row">
            <div className="quantity">
              <Button
                variant="ghost"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus />
              </Button>
              <span>{quantity}</span>
              <Button variant="ghost" onClick={() => setQuantity(quantity + 1)}>
                <Plus />
              </Button>
            </div>
            <Button className="add-cart">
              Add to cart — ${(product.price * quantity).toFixed(2)}
            </Button>
            <Button variant="secondary" aria-label="Wishlist">
              <Heart />
            </Button>
          </div>
          <Button className="buy-now">Buy now</Button>
          <div className="detail-perks">
            <span>
              <Truck /> Complimentary shipping over $100
            </span>
            <span>↻ 30-day considered returns</span>
          </div>
          <div className="accordions">
            {[
              "Description & care",
              "Dimensions",
              "Materials",
              "Shipping & returns",
            ].map((x) => (
              <button key={x}>
                {x}
                <Plus size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <section className="related">
        <SectionTitle eyebrow="Complete the room" title="You may also like" />
        <div className="product-grid">
          {products.slice(1, 5).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}

export function WishlistPage() {
  return (
    <div className="page section">
      <Breadcrumb current="Wishlist" />
      <div className="page-heading">
        <span className="eyebrow">Saved for later</span>
        <h1>Your wishlist</h1>
        <p>Four pieces you have your eye on.</p>
      </div>
      <div className="product-grid">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
