import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { Badge, Button, Input, Select } from "../components/ui"
import { orders, products } from "../data/store"

export function AdminDashboard() {
  const cards = [
    ["Total revenue", "$128,490", "+12.8%", true],
    ["Total orders", "1,284", "+8.2%", true],
    ["Total customers", "3,842", "+5.4%", true],
    ["Total products", "246", "-1.2%", false],
  ] as const
  return (
    <div className="admin-page">
      <AdminHeading
        title="Good morning, Olivia"
        copy="Here is what is happening with your store today."
        action="Export report"
      />
      <div className="metric-grid">
        {cards.map(([label, value, change, up]) => (
          <div className="metric" key={label}>
            <span>
              {label}
              <small>This month</small>
            </span>
            <strong>{value}</strong>
            <em className={up ? "up" : "down"}>
              {up ? <ArrowUpRight /> : <ArrowDownRight />}
              {change}
            </em>
          </div>
        ))}
      </div>
      <div className="chart-grid">
        <section className="admin-card revenue-chart">
          <div className="card-heading">
            <div>
              <h2>Revenue overview</h2>
              <p>Revenue and orders over the last 6 months</p>
            </div>
            <Select>
              <option>Last 6 months</option>
            </Select>
          </div>
          <div className="chart">
            <div className="y-labels">
              <span>$40k</span>
              <span>$30k</span>
              <span>$20k</span>
              <span>$10k</span>
              <span>$0</span>
            </div>
            <div className="bars">
              {[52, 64, 58, 78, 72, 91].map((h, i) => (
                <div key={i}>
                  <i style={{ height: `${h}%` }} />
                  <span>{["May", "Jun", "Jul", "Aug", "Sep", "Oct"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="admin-card best-products">
          <div className="card-heading">
            <div>
              <h2>Best sellers</h2>
              <p>Top products this month</p>
            </div>
          </div>
          {products.slice(0, 4).map((p, i) => (
            <div key={p.id}>
              <span>{i + 1}</span>
              <img src={p.imageUrl} alt="" />
              <p>
                <strong>{p.name}</strong>
                <small>{38 - i * 6} sold</small>
              </p>
              <b>${p.price * (38 - i * 6)}</b>
            </div>
          ))}
        </section>
      </div>
      <section className="admin-card recent-orders">
        <div className="card-heading">
          <div>
            <h2>Recent orders</h2>
            <p>Latest orders from your store</p>
          </div>
          <Button variant="secondary">View all</Button>
        </div>
        <AdminOrdersTable />
      </section>
    </div>
  )
}

function AdminHeading({
  title,
  copy,
  action,
}: {
  title: string
  copy: string
  action?: string
}) {
  return (
    <div className="admin-heading">
      <div>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {action && (
        <Button>
          {action === "Add product" ? <Plus /> : <Download />}
          {action}
        </Button>
      )}
    </div>
  )
}

export function AdminProductsPage() {
  return (
    <div className="admin-page">
      <AdminHeading
        title="Products"
        copy="Manage your product catalog, pricing and inventory."
        action="Add product"
      />
      <div className="admin-card data-card">
        <div className="data-toolbar">
          <label>
            <Search />
            <Input placeholder="Search products..." />
          </label>
          <div>
            <Button variant="secondary">
              <SlidersHorizontal /> Filter
            </Button>
            <Select>
              <option>All categories</option>
            </Select>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="table-product">
                      <img src={p.imageUrl} alt="" />
                      <span>
                        <strong>{p.name}</strong>
                        <small>SKU · AF-{1040 + p.id}</small>
                      </span>
                    </div>
                  </td>
                  <td>{p.categoryName}</td>
                  <td>${p.price}.00</td>
                  <td>{p.stock}</td>
                  <td>
                    <Badge tone={p.stock > 10 ? "success" : "warning"}>
                      {p.stock > 10 ? "Active" : "Low stock"}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="ghost">
                      <MoreHorizontal />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing 1–8 of 246 products</span>
          <div>
            <Button variant="secondary">Previous</Button>
            <Button variant="secondary">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminOrdersTable() {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {[...orders, ...orders.slice(0, 2)].map((o, i) => (
            <tr key={`${o.id}-${i}`}>
              <td>
                <strong>#{Number(o.id.slice(-5)) + i}</strong>
              </td>
              <td>
                <span className="customer-cell">
                  <i>{["OM", "SC", "JL", "AM", "EW"][i]}</i>
                  <span>
                    <strong>
                      {
                        [
                          "Olivia Martin",
                          "Sofia Chen",
                          "James Lee",
                          "Ava Morgan",
                          "Emma Wilson",
                        ][i]
                      }
                    </strong>
                    <small>
                      {
                        [
                          "olivia@example.com",
                          "sofia@example.com",
                          "james@example.com",
                          "ava@example.com",
                          "emma@example.com",
                        ][i]
                      }
                    </small>
                  </span>
                </span>
              </td>
              <td>{o.date}</td>
              <td>{o.total}</td>
              <td>
                <Badge tone="success">Paid</Badge>
              </td>
              <td>
                <Badge tone={i === 1 ? "success" : "warning"}>
                  {i === 1 ? "Delivered" : o.status}
                </Badge>
              </td>
              <td>
                <Button variant="ghost">
                  <Eye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function AdminOrdersPage() {
  return (
    <div className="admin-page">
      <AdminHeading
        title="Orders"
        copy="Track, fulfill and manage customer orders."
        action="Export report"
      />
      <div className="admin-tabs">
        {[
          "All orders",
          "Processing",
          "Confirmed",
          "Shipping",
          "Delivered",
          "Cancelled",
        ].map((x) => (
          <button key={x}>{x}</button>
        ))}
      </div>
      <section className="admin-card data-card">
        <div className="data-toolbar">
          <label>
            <Search />
            <Input placeholder="Search by order or customer..." />
          </label>
          <Button variant="secondary">
            <SlidersHorizontal /> Filter
          </Button>
        </div>
        <AdminOrdersTable />
      </section>
    </div>
  )
}

export function AdminCustomersPage() {
  const names = [
    "Olivia Martin",
    "Sofia Chen",
    "James Lee",
    "Ava Morgan",
    "Emma Wilson",
    "Noah Williams",
  ]
  return (
    <div className="admin-page">
      <AdminHeading
        title="Customers"
        copy="View customer details, order history and spending."
        action="Export report"
      />
      <div className="metric-grid small">
        <div className="metric">
          <span>Total customers</span>
          <strong>3,842</strong>
        </div>
        <div className="metric">
          <span>New this month</span>
          <strong>184</strong>
        </div>
        <div className="metric">
          <span>Returning rate</span>
          <strong>42.8%</strong>
        </div>
      </div>
      <section className="admin-card data-card">
        <div className="data-toolbar">
          <label>
            <Search />
            <Input placeholder="Search customers..." />
          </label>
          <Button variant="secondary">
            <SlidersHorizontal /> Filter
          </Button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total spending</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {names.map((name, i) => (
                <tr key={name}>
                  <td>
                    <span className="customer-cell">
                      <i>
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </i>
                      <span>
                        <strong>{name}</strong>
                        <small>
                          {name.toLowerCase().replace(" ", ".")}@example.com
                        </small>
                      </span>
                    </span>
                  </td>
                  <td>+1 503 555 01{42 + i}</td>
                  <td>{12 - i}</td>
                  <td>${(1842 - i * 193).toLocaleString()}</td>
                  <td>
                    <Badge tone="success">Active</Badge>
                  </td>
                  <td>
                    <Button variant="ghost">
                      <MoreHorizontal />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="admin-page">
      <AdminHeading
        title={title}
        copy={`Manage store ${title.toLowerCase()} and related settings.`}
      />
      <section className="admin-card empty-admin">
        <h2>{title} workspace</h2>
        <p>This module is ready for connection to the Spring Boot API.</p>
        <Button>Configure {title.toLowerCase()}</Button>
      </section>
    </div>
  )
}
