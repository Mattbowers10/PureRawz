"use client";

import { useState } from "react";
import Link from "next/link";
import { mockUser, mockOrders, type Order } from "@/lib/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  User,
  MapPin,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  Copy,
  ShoppingCart,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  Shield,
} from "lucide-react";

const tabs = [
  { id: "orders", label: "Order History", icon: Package },
  { id: "details", label: "Account Details", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type TabId = (typeof tabs)[number]["id"];

const statusConfig = {
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    variant: "success" as const,
    color: "text-emerald-400",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    variant: "info" as const,
    color: "text-blue-400",
  },
  processing: {
    label: "Processing",
    icon: Clock,
    variant: "warning" as const,
    color: "text-amber-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    variant: "secondary" as const,
    color: "text-foreground-subtle",
  },
};

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--surface)] overflow-hidden">
      {/* Order header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-4 sm:p-5 text-left hover:bg-[var(--surface-hover)] transition-colors"
      >
        <div className={`w-10 h-10 rounded-lg bg-[var(--background-secondary)] flex items-center justify-center shrink-0 ${status.color}`}>
          <StatusIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-foreground font-mono">
              {order.id}
            </span>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-foreground-subtle">
            <span>{order.date}</span>
            <span>
              {order.items.length} item{order.items.length !== 1 && "s"}
            </span>
            <span className="font-medium text-foreground-muted">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-foreground-subtle shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-foreground-subtle shrink-0" />
        )}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-[var(--border)] animate-fade-in-up">
          {/* Items */}
          <div className="p-4 sm:p-5 space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background-secondary)] flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-foreground-subtle/20">
                      {item.productName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.productName}
                    </p>
                    <p className="text-xs text-foreground-subtle">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals & tracking */}
          <div className="border-t border-[var(--border)] p-4 sm:p-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-subtle">Subtotal</span>
                  <span className="text-foreground">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-subtle">Shipping</span>
                  <span className="text-foreground">
                    {order.shipping === 0 ? (
                      <span className="text-emerald-400">Free</span>
                    ) : (
                      `$${order.shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="h-px bg-[var(--border)]" />
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-foreground-subtle mb-0.5">
                    Shipping Method
                  </p>
                  <p className="text-sm text-foreground">
                    {order.shippingMethod}
                  </p>
                </div>
                {order.trackingNumber && (
                  <div>
                    <p className="text-xs text-foreground-subtle mb-0.5">
                      Tracking Number
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-foreground font-mono">
                        {order.trackingNumber}
                      </code>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(order.trackingNumber!);
                        }}
                        className="text-foreground-subtle hover:text-foreground transition-colors"
                        aria-label="Copy tracking number"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              {order.status !== "cancelled" && (
                <Button variant="outline" size="sm">
                  <Package className="w-3.5 h-3.5 mr-1.5" />
                  View Details
                </Button>
              )}
              {(order.status === "delivered" ||
                order.status === "cancelled") && (
                <Button variant="secondary" size="sm">
                  <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                  Reorder
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabId>("orders");
  const [isEditing, setIsEditing] = useState(false);

  const totalOrders = mockOrders.length;
  const totalSpent = mockOrders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Account header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crimson-700 to-crimson-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {mockUser.firstName.charAt(0)}
              {mockUser.lastName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {mockUser.firstName} {mockUser.lastName}
              </h1>
              <p className="text-sm text-foreground-muted">
                Member since {mockUser.joined}
              </p>
            </div>
          </div>
          <Button variant="ghost" className="gap-1.5 text-foreground-muted self-start">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)]">
            <p className="text-xs text-foreground-subtle uppercase tracking-wider mb-1">
              Total Orders
            </p>
            <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)]">
            <p className="text-xs text-foreground-subtle uppercase tracking-wider mb-1">
              Total Spent
            </p>
            <p className="text-2xl font-bold text-foreground">
              ${totalSpent.toFixed(2)}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)]">
            <p className="text-xs text-foreground-subtle uppercase tracking-wider mb-1">
              Active Shipments
            </p>
            <p className="text-2xl font-bold text-foreground">
              {mockOrders.filter((o) => o.status === "shipped").length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)]">
            <p className="text-xs text-foreground-subtle uppercase tracking-wider mb-1">
              Reward Points
            </p>
            <p className="text-2xl font-bold text-foreground">1,245</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-crimson-700 text-white shadow-sm"
                      : "text-foreground-muted hover:text-foreground hover:bg-[var(--surface)]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content area */}
          <div className="lg:col-span-3">
            {/* Orders */}
            {activeTab === "orders" && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-foreground">
                    Order History
                  </h2>
                  <span className="text-sm text-foreground-subtle">
                    {mockOrders.length} orders
                  </span>
                </div>

                {mockOrders.length === 0 ? (
                  <div className="text-center py-16 rounded-xl border border-[var(--glass-border)] bg-[var(--surface)]">
                    <Package className="w-10 h-10 text-foreground-subtle mx-auto mb-3" />
                    <p className="text-foreground-muted mb-2">No orders yet</p>
                    <p className="text-sm text-foreground-subtle mb-6">
                      Browse our catalog to place your first order.
                    </p>
                    <Button variant="glow" asChild>
                      <Link href="/products" className="gap-1.5">
                        Shop Products
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  mockOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))
                )}
              </div>
            )}

            {/* Account Details */}
            {activeTab === "details" && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    Account Details
                  </h2>
                  <Button
                    variant={isEditing ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>

                <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--surface)] p-5 sm:p-6 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground-subtle uppercase tracking-wider mb-1.5">
                        First Name
                      </label>
                      {isEditing ? (
                        <Input defaultValue={mockUser.firstName} />
                      ) : (
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          {mockUser.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-subtle uppercase tracking-wider mb-1.5">
                        Last Name
                      </label>
                      {isEditing ? (
                        <Input defaultValue={mockUser.lastName} />
                      ) : (
                        <p className="text-sm font-medium text-foreground">
                          {mockUser.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground-subtle uppercase tracking-wider mb-1.5">
                      <Mail className="w-3 h-3 inline mr-1" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <Input defaultValue={mockUser.email} type="email" />
                    ) : (
                      <p className="text-sm font-medium text-foreground">
                        {mockUser.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground-subtle uppercase tracking-wider mb-1.5">
                      <Phone className="w-3 h-3 inline mr-1" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <Input defaultValue={mockUser.phone} type="tel" />
                    ) : (
                      <p className="text-sm font-medium text-foreground">
                        {mockUser.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground-subtle uppercase tracking-wider mb-1.5">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Member Since
                    </label>
                    <p className="text-sm font-medium text-foreground">
                      {mockUser.joined}
                    </p>
                  </div>
                </div>

                {/* Password section */}
                <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--surface)] p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-crimson-500" />
                    Security
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground-subtle uppercase tracking-wider mb-1.5">
                        Password
                      </label>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-foreground-muted">
                          ••••••••••••
                        </p>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === "addresses" && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    Saved Addresses
                  </h2>
                  <Button variant="outline" size="sm">
                    Add New Address
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Default address */}
                  <div className="rounded-xl border-2 border-crimson-700/30 bg-[var(--surface)] p-5 relative">
                    <Badge
                      variant="default"
                      className="absolute top-4 right-4"
                    >
                      Default
                    </Badge>
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="w-4 h-4 text-crimson-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          {mockUser.firstName} {mockUser.lastName}
                        </p>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                          {mockUser.address.street}
                          <br />
                          {mockUser.address.apartment && (
                            <>
                              {mockUser.address.apartment}
                              <br />
                            </>
                          )}
                          {mockUser.address.city}, {mockUser.address.state}{" "}
                          {mockUser.address.zip}
                          <br />
                          {mockUser.address.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Add new address card */}
                  <button className="rounded-xl border border-dashed border-[var(--glass-border)] bg-transparent p-5 flex flex-col items-center justify-center text-center hover:border-[var(--glass-border-hover)] hover:bg-[var(--surface)] transition-all min-h-[180px]">
                    <div className="w-10 h-10 rounded-lg bg-[var(--surface)] border border-[var(--glass-border)] flex items-center justify-center mb-3">
                      <MapPin className="w-5 h-5 text-foreground-subtle" />
                    </div>
                    <p className="text-sm font-medium text-foreground-muted">
                      Add New Address
                    </p>
                    <p className="text-xs text-foreground-subtle mt-1">
                      Save an additional shipping address
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-xl font-semibold text-foreground">
                  Account Settings
                </h2>

                {/* Notifications */}
                <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--surface)] p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4">
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Order updates",
                        desc: "Get notified about order status changes and shipping updates",
                        defaultChecked: true,
                      },
                      {
                        label: "Product announcements",
                        desc: "New product launches and restocks",
                        defaultChecked: true,
                      },
                      {
                        label: "Research guides",
                        desc: "New blog posts and compound guides",
                        defaultChecked: false,
                      },
                      {
                        label: "Promotions & offers",
                        desc: "Exclusive deals and discount codes",
                        defaultChecked: true,
                      },
                    ].map((item) => (
                      <label
                        key={item.label}
                        className="flex items-start gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={item.defaultChecked}
                          className="mt-1 w-4 h-4 rounded border-[var(--glass-border)] bg-[var(--background-secondary)] text-crimson-700 focus:ring-crimson-700/50 cursor-pointer"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-crimson-400 transition-colors">
                            {item.label}
                          </p>
                          <p className="text-xs text-foreground-subtle">
                            {item.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Danger zone */}
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-red-400 mb-2">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-foreground-muted mb-4">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
