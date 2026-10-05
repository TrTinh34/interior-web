import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react"
import { Link, useParams } from "react-router"
import { Button, Input, SectionTitle } from "../components/ui"
import { photos } from "../data/store"

const articles = [
  {
    slug: "quiet-art-of-layering",
    category: "Home Styling",
    title: "The quiet art of layering a room",
    copy: "A thoughtful guide to building texture, warmth and a sense of belonging over time.",
    image: photos.hero,
    date: "October 2, 2026",
  },
  {
    slug: "natural-materials",
    category: "Interior Design",
    title: "Why natural materials always feel at home",
    copy: "Stone, linen, timber and clay bring an effortless calm to everyday rooms.",
    image: photos.collection,
    date: "September 24, 2026",
  },
  {
    slug: "setting-the-table",
    category: "Tips & Guides",
    title: "Setting a table for slow evenings",
    copy: "Simple rituals and tactile objects for dinners that linger a little longer.",
    image: photos.dining,
    date: "September 12, 2026",
  },
  {
    slug: "beautiful-workspace",
    category: "Inspiration",
    title: "A workspace that makes room for ideas",
    copy: "How to create a focused, grounded corner without losing warmth.",
    image: photos.office,
    date: "August 28, 2026",
  },
]

export function BlogPage() {
  return (
    <div className="page">
      <section className="blog-hero section">
        <span className="eyebrow">The journal</span>
        <h1>Notes on a beautiful life</h1>
        <p>
          Stories on considered spaces, enduring materials and the small rituals
          that make a house feel like home.
        </p>
      </section>
      <section className="featured-story section">
        <img src={articles[0].image} alt="" />
        <div>
          <span className="eyebrow">{articles[0].category}</span>
          <h2>{articles[0].title}</h2>
          <p>{articles[0].copy}</p>
          <small>By Clara Hale · {articles[0].date} · 6 min read</small>
          <Link className="text-link" to={`/blog/${articles[0].slug}`}>
            Read the story <ArrowRight />
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="journal-nav">
          {[
            "All stories",
            "Interior Design",
            "Home Styling",
            "Inspiration",
            "Tips & Guides",
            "Trends",
          ].map((x) => (
            <button key={x}>{x}</button>
          ))}
        </div>
        <div className="article-grid">
          {articles.slice(1).map((a) => (
            <Link to={`/blog/${a.slug}`} key={a.slug}>
              <img src={a.image} alt="" />
              <span className="eyebrow">{a.category}</span>
              <h3>{a.title}</h3>
              <p>{a.copy}</p>
              <small>{a.date} · 5 min read</small>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export function BlogDetailPage() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug) ?? articles[0]
  return (
    <article className="article-page">
      <header>
        <span className="eyebrow">{article.category}</span>
        <h1>{article.title}</h1>
        <p>{article.copy}</p>
        <div>
          By Clara Hale <span>·</span> {article.date} <span>·</span>{" "}
          <Clock size={15} /> 6 min read
        </div>
      </header>
      <img className="article-hero" src={article.image} alt="" />
      <div className="article-body">
        <p className="lead">
          The most compelling rooms rarely arrive all at once. They are built
          slowly, through objects chosen with care and materials that grow more
          beautiful as they are lived with.
        </p>
        <h2>Begin with how you want to feel</h2>
        <p>
          Before thinking about individual pieces, consider the atmosphere you
          want to create. Calm, warmth and ease can become useful guides—helping
          every choice feel connected rather than merely coordinated.
        </p>
        <blockquote>
          “A room should feel collected, not decorated. Let it hold the evidence
          of a life well lived.”
        </blockquote>
        <h2>Let materials do the talking</h2>
        <p>
          Natural timber, handmade ceramic, softly woven linen and time-worn
          stone each carry their own quiet variation. Together, they create
          depth without noise.
        </p>
        <img
          src={photos.stillLife}
          alt="A composed still life of natural home objects"
        />
        <h2>Leave room for life</h2>
        <p>
          Resist the urge to fill every surface. Empty space gives meaningful
          objects room to breathe, and leaves a home flexible enough to evolve
          with you.
        </p>
      </div>
      <section className="section related">
        <SectionTitle eyebrow="Continue reading" title="Related stories" />
        <div className="article-grid">
          {articles.slice(1).map((a) => (
            <Link to={`/blog/${a.slug}`} key={a.slug}>
              <img src={a.image} alt="" />
              <h3>{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}

export function CollectionsPage() {
  const names = [
    "Modern Minimalist",
    "Scandinavian",
    "Japandi",
    "Warm Contemporary",
    "Natural Living",
    "Vintage Inspired",
  ]
  const images = [
    photos.hero,
    photos.sofa,
    photos.collection,
    photos.dining,
    photos.office,
    photos.stillLife,
  ]
  return (
    <div className="page section">
      <div className="page-heading center">
        <span className="eyebrow">Curated worlds</span>
        <h1>Collections for considered living</h1>
        <p>
          Distinct moods, enduring forms, and a shared belief in the beauty of
          less.
        </p>
      </div>
      <div className="collections-grid">
        {names.map((name, i) => (
          <Link to="/products" key={name}>
            <img src={images[i]} alt="" />
            <div>
              <span>Collection 0{i + 1}</span>
              <h2>{name}</h2>
              <p>
                {i % 2
                  ? "Soft forms and natural texture in effortless balance."
                  : "Clean lines, quiet tones and objects with intention."}
              </p>
              <strong>Explore collection →</strong>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function AboutPage() {
  return (
    <div className="page about-page">
      <section className="about-hero">
        <img src={photos.dining} alt="" />
        <div>
          <span className="eyebrow light-text">Our philosophy</span>
          <h1>
            Live with less.
            <br />
            Love it for longer.
          </h1>
        </div>
      </section>
      <section className="story section">
        <span className="eyebrow">Our story</span>
        <div>
          <h2>
            Beautifully useful,
            <br />
            quietly enduring.
          </h2>
          <div>
            <p>
              Arbor & Form began with a simple belief: the things we bring into
              our homes should add meaning, not noise.
            </p>
            <p>
              We seek out enduring materials, honest craft and forms that feel
              as relevant years from now as they do today.
            </p>
          </div>
        </div>
      </section>
      <section className="values">
        <div>
          <span>01</span>
          <h3>Natural by nature</h3>
          <p>
            We favor honest materials that reveal their grain, texture and
            subtle imperfection.
          </p>
        </div>
        <div>
          <span>02</span>
          <h3>Made with intention</h3>
          <p>
            Every piece earns its place through purpose, proportion and
            thoughtful detail.
          </p>
        </div>
        <div>
          <span>03</span>
          <h3>Designed to endure</h3>
          <p>Timeless objects, made responsibly and chosen to stay with you.</p>
        </div>
      </section>
      <section className="editorial reverse">
        <div className="editorial-image">
          <img src={photos.collection} alt="" />
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">Our materials</span>
          <h2>
            Honest from
            <br />
            the beginning.
          </h2>
          <p>
            From responsibly sourced wood to small-batch ceramics, we choose
            materials for how they feel, age and return to the earth.
          </p>
          <Button>Our material guide</Button>
        </div>
      </section>
    </div>
  )
}

export function ContactPage() {
  return (
    <div className="page section contact-page">
      <div className="page-heading">
        <span className="eyebrow">We are here to help</span>
        <h1>Let’s talk</h1>
        <p>
          Questions about a piece, your order, or styling your space? Our studio
          team would love to hear from you.
        </p>
      </div>
      <div className="contact-grid">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>
              Full name
              <Input />
            </label>
            <label>
              Email address
              <Input type="email" />
            </label>
          </div>
          <div>
            <label>
              Phone number
              <Input />
            </label>
            <label>
              Subject
              <Input />
            </label>
          </div>
          <label>
            Message
            <textarea rows={6} placeholder="How can we help?" />
          </label>
          <Button>Send message</Button>
        </form>
        <aside>
          <h2>Studio details</h2>
          <p>
            <Phone />{" "}
            <span>
              <strong>Call us</strong>+1 503 555 0148
            </span>
          </p>
          <p>
            <Mail />{" "}
            <span>
              <strong>Email us</strong>hello@arborandform.com
            </span>
          </p>
          <p>
            <MapPin />{" "}
            <span>
              <strong>Visit the studio</strong>24 Willow Lane, Portland, OR
            </span>
          </p>
          <hr />
          <h3>Opening hours</h3>
          <p>
            Monday–Friday <span>9am–5pm</span>
          </p>
          <p>
            Saturday <span>10am–4pm</span>
          </p>
        </aside>
      </div>
      <div className="map">
        <div>
          <MapPin />
          <strong>Arbor & Form Studio</strong>
          <span>Portland, Oregon</span>
        </div>
      </div>
    </div>
  )
}
