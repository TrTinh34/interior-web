import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react"
import { Link } from "react-router"
import { ArrowRight, Search } from "lucide-react"

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost"
}) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  children,
  to,
  variant = "primary",
  className = "",
}: {
  children: ReactNode
  to: string
  variant?: "primary" | "secondary" | "ghost"
  className?: string
}) {
  return (
    <Link className={`btn btn-${variant} ${className}`} to={to}>
      {children}
    </Link>
  )
}

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`input ${className}`} {...props} />
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="input select" {...props} />
}

export function SectionTitle({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow?: string
  title: string
  copy?: string
  action?: { label: string to: string }
}) {
  return (
    <div className="section-title">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {action && (
        <Link className="text-link" to={action.to}>
          {action.label}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}

export function SearchField({
  placeholder = "Search our collection...",
}: {
  placeholder?: string
}) {
  return (
    <label className="search-field">
      <Search size={18} />
      <Input aria-label="Search" placeholder={placeholder} />
    </label>
  )
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: "neutral" | "success" | "warning"
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}
