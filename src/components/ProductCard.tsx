import { Heart, Plus, Star } from "lucide-react"
import { Link } from "react-router"
import type { Product } from "../data/store"
import { Badge, Button } from "./ui"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/products/${product.id}`}>
          <img src={product.imageUrl} alt={product.name} />
        </Link>
        {product.badge && <Badge>{product.badge}</Badge>}
        <Button
          aria-label="Add to wishlist"
          className="wish"
          variant="secondary"
        >
          <Heart size={17} />
        </Button>
        <Button className="quick-add">
          <Plus size={16} /> Quick add
        </Button>
      </div>
      <div className="product-info">
        <span>{product.categoryName}</span>
        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="rating">
          <Star size={14} fill="currentColor" /> {product.rating}{" "}
          <span>({product.reviewCount})</span>
        </div>
        <div className="price">
          ${product.price.toFixed(2)}{" "}
          {product.originalPrice && (
            <del>${product.originalPrice.toFixed(2)}</del>
          )}
        </div>
      </div>
    </article>
  )
}
