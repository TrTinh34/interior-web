import { ArrowRight, Quote, Star } from "lucide-react"
import { Link } from "react-router"
import ProductCard from "../components/ProductCard"
import { Button, ButtonLink, Input, SectionTitle } from "../components/ui"
import { categories, photos, products } from "../data/store"

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <img
          src={photos.hero}
          alt="Warm modern living room with natural wood details"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="eyebrow light-text">
            A home, thoughtfully considered
          </span>
          <h1>
            Make your space
            <br />
            feel like home.
          </h1>
          <p>
            Thoughtfully designed decor pieces that bring warmth, character and
            timeless beauty to your everyday.
          </p>
          <div>
            <ButtonLink to="/products">Shop collection</ButtonLink>
            <ButtonLink to="/products" variant="secondary">
              Explore new arrivals
            </ButtonLink>
          </div>
        </div>
        <div className="hero-note">
          <span>New edit</span>
          <strong>The Art of Slow Living</strong>
          <Link to="/collections">
            Discover <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="section category-section">
        <SectionTitle
          eyebrow="Shop by room"
          title="Objects with a sense of place"
          copy="Curated pieces to bring beauty and intention to every corner."
          action={{ label: "View all categories", to: "/categories" }}
        />
        <div className="category-row">
          {categories.slice(0, 5).map((category) => (
            <Link className="category-card" to="/products" key={category.id}>
              <img src={category.imageUrl} alt="" />
              <div>
                <span>{category.count} pieces</span>
                <h3>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section products-section">
        <SectionTitle
          eyebrow="New this season"
          title="Freshly found favorites"
          action={{ label: "Shop all new arrivals", to: "/products" }}
        />
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="editorial">
        <div className="editorial-image">
          <img
            src={photos.collection}
            alt="Natural material decor collection"
          />
          <span>01 / 04</span>
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">The material edit</span>
          <h2>
            Nature,
            <br />
            refined.
          </h2>
          <p>
            Warm textures, organic silhouettes and timeless materials inspired
            by the quiet beauty of the natural world.
          </p>
          <ul>
            <li>Hand-finished ceramics</li>
            <li>Responsibly sourced timber</li>
            <li>Natural linen and stone</li>
          </ul>
          <ButtonLink to="/collections">Explore the collection</ButtonLink>
        </div>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Most loved"
          title="The pieces you return to"
          action={{ label: "View best sellers", to: "/products" }}
        />
        <div className="product-grid">
          {products.slice(4, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="inspiration section">
        <SectionTitle
          eyebrow="At home with Arbor & Form"
          title="Spaces that inspire"
          copy="Quiet rooms, tactile details and the art of living well."
        />
        <div className="inspiration-grid">
          <Link to="/blog">
            <img src={photos.hero} alt="Living room" />
            <span>
              Living room <ArrowRight />
            </span>
          </Link>
          <Link to="/blog">
            <img src={photos.dining} alt="Dining room" />
            <span>
              Dining room <ArrowRight />
            </span>
          </Link>
          <Link to="/blog">
            <img src={photos.office} alt="Workspace" />
            <span>
              Workspace <ArrowRight />
            </span>
          </Link>
        </div>
      </section>

      <section className="reviews section">
        <SectionTitle eyebrow="Notes from home" title="Loved in real spaces" />
        <div className="review-grid">
          {[
            [
              "Amelia R.",
              "The pieces feel even more special in person. Beautiful texture, thoughtful packaging, and a warmth that changed the whole room.",
            ],
            [
              "Sophie M.",
              "My lamp has become the quiet focal point of our living room. It is timeless, beautifully made and gives the loveliest light.",
            ],
            [
              "Clara D.",
              "Everything feels curated rather than mass-produced. Arbor & Form is now the first place I look when a room needs something.",
            ],
          ].map(([name, text]) => (
            <article key={name}>
              <Quote />
              <div className="stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p>“{text}”</p>
              <div className="reviewer">
                <span>{name.slice(0, 1)}</span>
                <div>
                  <strong>{name}</strong>
                  <small>Verified customer</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <div>
          <span className="eyebrow light-text">A considered inbox</span>
          <h2>Bring inspiration home.</h2>
          <p>
            Join our community for seasonal edits, styling stories and a little
            more beauty in your week.
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input type="email" placeholder="Enter your email address" />
          <Button>Subscribe</Button>
        </form>
      </section>
    </>
  )
}
