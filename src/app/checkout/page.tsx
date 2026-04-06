"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";

const steps = [
  { id: 1, label: "Information", icon: User },
  { id: 2, label: "Shipping", icon: Truck },
  { id: 3, label: "Payment", icon: CreditCard },
  { id: 4, label: "Review", icon: Package },
];

interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 7.99,
    freeOver: 100,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 14.99,
    freeOver: null,
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 29.99,
    freeOver: null,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, itemCount, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [info, setInfo] = useState<ShippingInfo>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
  });

  // Redirect to products if cart is empty
  useEffect(() => {
    if (items.length === 0 && currentStep !== 4) {
      router.push("/products");
    }
  }, [items.length, currentStep, router]);

  const shippingMethod = shippingMethods.find((m) => m.id === selectedShipping)!;
  const shippingCost =
    shippingMethod.freeOver && subtotal >= shippingMethod.freeOver
      ? 0
      : shippingMethod.price;
  const tax = subtotal * 0.0;
  const total = subtotal + shippingCost + tax;

  const updateInfo = (field: keyof ShippingInfo, value: string) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          info.email.trim() !== "" &&
          info.firstName.trim() !== "" &&
          info.lastName.trim() !== "" &&
          info.address.trim() !== "" &&
          info.city.trim() !== "" &&
          info.state.trim() !== "" &&
          info.zip.trim() !== ""
        );
      case 2:
        return selectedShipping !== "";
      case 3:
        return true; // Payment is a placeholder
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlaceOrder = () => {
    clearCart();
    router.push("/checkout/confirmation");
  };

  if (items.length === 0 && currentStep !== 4) {
    return null;
  }

  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                  disabled={step.id > currentStep}
                  className="flex items-center gap-2 group"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      step.id < currentStep
                        ? "bg-emerald-500 text-white"
                        : step.id === currentStep
                        ? "bg-crimson-700 text-white shadow-lg shadow-crimson-700/30"
                        : "bg-[var(--surface)] text-foreground-subtle border border-[var(--glass-border)]"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`hidden sm:block text-sm font-medium transition-colors ${
                      step.id <= currentStep
                        ? "text-foreground"
                        : "text-foreground-subtle"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 lg:w-24 h-px mx-2 sm:mx-3 transition-colors duration-300 ${
                      step.id < currentStep
                        ? "bg-emerald-500"
                        : "bg-[var(--border)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Step 1: Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Contact Information
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    We&apos;ll use this to send your order confirmation.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={info.email}
                      onChange={(e) => updateInfo("email", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                        First Name
                      </label>
                      <Input
                        placeholder="John"
                        value={info.firstName}
                        onChange={(e) => updateInfo("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                        Last Name
                      </label>
                      <Input
                        placeholder="Doe"
                        value={info.lastName}
                        onChange={(e) => updateInfo("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[var(--border)]" />

                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Shipping Address
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                      Country
                    </label>
                    <select
                      value={info.country}
                      onChange={(e) => updateInfo("country", e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-[var(--surface)] text-foreground border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-crimson-700/50 text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                      Street Address
                    </label>
                    <Input
                      placeholder="123 Main St"
                      value={info.address}
                      onChange={(e) => updateInfo("address", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                      Apartment, suite, etc. (optional)
                    </label>
                    <Input
                      placeholder="Apt 4B"
                      value={info.apartment}
                      onChange={(e) => updateInfo("apartment", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                        City
                      </label>
                      <Input
                        placeholder="New York"
                        value={info.city}
                        onChange={(e) => updateInfo("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                        State
                      </label>
                      <Input
                        placeholder="NY"
                        value={info.state}
                        onChange={(e) => updateInfo("state", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                        ZIP Code
                      </label>
                      <Input
                        placeholder="10001"
                        value={info.zip}
                        onChange={(e) => updateInfo("zip", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                      Phone (optional)
                    </label>
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={info.phone}
                      onChange={(e) => updateInfo("phone", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Shipping Method
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    Shipping to {info.address}, {info.city}, {info.state}{" "}
                    {info.zip}
                  </p>
                </div>

                <div className="space-y-3">
                  {shippingMethods.map((method) => {
                    const isFree =
                      method.freeOver && subtotal >= method.freeOver;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedShipping(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                          selectedShipping === method.id
                            ? "border-crimson-700 bg-crimson-700/5 shadow-sm"
                            : "border-[var(--glass-border)] bg-[var(--surface)] hover:border-[var(--glass-border-hover)]"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            selectedShipping === method.id
                              ? "border-crimson-700"
                              : "border-[var(--glass-border)]"
                          }`}
                        >
                          {selectedShipping === method.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-crimson-700" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">
                              {method.name}
                            </span>
                            {isFree && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                                Free
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-foreground-subtle">
                            {method.description}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {isFree ? (
                            <span className="text-emerald-400">$0.00</span>
                          ) : (
                            `$${method.price.toFixed(2)}`
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {subtotal < 100 && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-crimson-700/5 border border-crimson-700/20">
                    <Truck className="w-4 h-4 text-crimson-500 shrink-0" />
                    <p className="text-xs text-foreground-muted">
                      Add <span className="font-semibold text-foreground">${(100 - subtotal).toFixed(2)}</span> more
                      for free standard shipping!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Payment Method
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    All transactions are secure and encrypted.
                  </p>
                </div>

                {/* Placeholder payment form */}
                <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--surface)] overflow-hidden">
                  <div className="p-4 border-b border-[var(--border)] flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-crimson-500" />
                    <span className="text-sm font-semibold text-foreground">
                      Credit Card
                    </span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-10 h-6 rounded bg-[var(--background-secondary)] border border-[var(--glass-border)] flex items-center justify-center text-[9px] font-bold text-foreground-subtle">
                        VISA
                      </div>
                      <div className="w-10 h-6 rounded bg-[var(--background-secondary)] border border-[var(--glass-border)] flex items-center justify-center text-[9px] font-bold text-foreground-subtle">
                        MC
                      </div>
                      <div className="w-10 h-6 rounded bg-[var(--background-secondary)] border border-[var(--glass-border)] flex items-center justify-center text-[9px] font-bold text-foreground-subtle">
                        AMEX
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                        Card Number
                      </label>
                      <Input placeholder="4242 4242 4242 4242" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                        Name on Card
                      </label>
                      <Input
                        placeholder="John Doe"
                        defaultValue={
                          info.firstName && info.lastName
                            ? `${info.firstName} ${info.lastName}`
                            : ""
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                          Expiration
                        </label>
                        <Input placeholder="MM / YY" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-muted mb-1.5">
                          CVV
                        </label>
                        <Input placeholder="123" type="password" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="text-xs text-foreground-muted">
                    Payment processing will be connected in a future update.
                    This form is a visual placeholder.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Review Your Order
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    Please verify everything looks correct before placing your
                    order.
                  </p>
                </div>

                {/* Contact & Shipping Summary */}
                <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--surface)] divide-y divide-[var(--border)]">
                  <div className="p-4 flex items-start justify-between">
                    <div>
                      <p className="text-xs text-foreground-subtle font-medium uppercase tracking-wider mb-1">
                        Contact
                      </p>
                      <p className="text-sm text-foreground">{info.email}</p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-crimson-500 hover:text-crimson-400 font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="p-4 flex items-start justify-between">
                    <div>
                      <p className="text-xs text-foreground-subtle font-medium uppercase tracking-wider mb-1">
                        Ship to
                      </p>
                      <p className="text-sm text-foreground">
                        {info.firstName} {info.lastName}
                        <br />
                        {info.address}
                        {info.apartment && `, ${info.apartment}`}
                        <br />
                        {info.city}, {info.state} {info.zip}
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-crimson-500 hover:text-crimson-400 font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="p-4 flex items-start justify-between">
                    <div>
                      <p className="text-xs text-foreground-subtle font-medium uppercase tracking-wider mb-1">
                        Shipping Method
                      </p>
                      <p className="text-sm text-foreground">
                        {shippingMethod.name} &mdash;{" "}
                        {shippingMethod.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-crimson-500 hover:text-crimson-400 font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="p-4 flex items-start justify-between">
                    <div>
                      <p className="text-xs text-foreground-subtle font-medium uppercase tracking-wider mb-1">
                        Payment
                      </p>
                      <p className="text-sm text-foreground flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-foreground-subtle" />
                        Credit Card ending in 4242
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="text-xs text-crimson-500 hover:text-crimson-400 font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Items ({itemCount})
                  </h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)]"
                      >
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background-secondary)] flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-foreground-subtle/20">
                            {item.product.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-foreground-subtle">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    <span className="font-semibold text-amber-400">
                      Research Use Only:
                    </span>{" "}
                    By placing this order, you confirm that all products are
                    intended for legitimate research purposes only. Products are
                    not for human consumption. You must be 18 years or older to
                    purchase.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {currentStep < 4 ? (
                <Button
                  variant="glow"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="gap-1.5"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="glow"
                  size="lg"
                  onClick={handlePlaceOrder}
                  className="gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Place Order &mdash; ${total.toFixed(2)}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-32 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] backdrop-blur-sm overflow-hidden">
              <div className="p-5 border-b border-[var(--border)]">
                <h3 className="text-sm font-semibold text-foreground">
                  Order Summary
                </h3>
              </div>

              <div className="p-5 space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background)] flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-foreground-subtle/20">
                        {item.product.name.charAt(0)}
                      </span>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-crimson-700 text-[10px] font-bold text-white flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-foreground-subtle">
                        {item.product.category}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-[var(--border)] space-y-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">Subtotal</span>
                  <span className="font-medium text-foreground">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">Shipping</span>
                  <span className="font-medium text-foreground">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-400">Free</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">Tax</span>
                  <span className="font-medium text-foreground-subtle">
                    Calculated at payment
                  </span>
                </div>
                <div className="h-px bg-[var(--border)] my-1" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    Total
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="px-5 pb-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-foreground-subtle">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-bit SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground-subtle">
                    <MapPin className="w-3.5 h-3.5 text-crimson-500" />
                    <span>Ships from USA</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground-subtle">
                    <Package className="w-3.5 h-3.5 text-blue-400" />
                    <span>Discreet packaging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
