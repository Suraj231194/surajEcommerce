"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CreditCard, Loader2, MapPin, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Progress } from "../../components/ui/progress.jsx";
import { useToast } from "../../hooks/use-toast.js";
import { formatCurrency } from "../../lib/formatters.js";

const ADDRESS_OPTIONS = [
  {
    label: "Bandra Kurla Complex, Mumbai",
    address: "Unit 301, Maker Maxity",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400051",
  },
  {
    label: "Koramangala, Bengaluru",
    address: "55 7th Block, Koramangala",
    city: "Bengaluru",
    state: "Karnataka",
    zip: "560095",
  },
  {
    label: "Cyber City, Gurugram",
    address: "Tower C, DLF Cyber City",
    city: "Gurugram",
    state: "Haryana",
    zip: "122002",
  },
  {
    label: "Hitech City, Hyderabad",
    address: "Plot 92, Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    zip: "500081",
  },
];

const PAYMENT_METHODS = [
  { id: "card", title: "Card", subtitle: "Visa, Mastercard" },
  { id: "upi", title: "UPI", subtitle: "Pay instantly" },
  { id: "wallet", title: "Wallet", subtitle: "Saved wallet" },
];

export default function CheckoutPage() {
  const { items, getSubtotal, getTax, getShipping, getTotal, clearCart } = useCart();
  const { toast } = useToast();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponState, setCouponState] = useState("idle");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const addressSuggestions = useMemo(() => {
    const value = form.address.trim().toLowerCase();
    if (value.length < 2) {
      return [];
    }
    return ADDRESS_OPTIONS.filter((option) =>
      `${option.address} ${option.city} ${option.state}`.toLowerCase().includes(value)
    ).slice(0, 4);
  }, [form.address]);

  if (isSuccess) {
    return (
      <div className="container-shell py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-border/70 bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="text-3xl font-semibold">Order confirmed</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your order has been placed successfully. A confirmation email is on the way.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/orders">Track order</Link>
            </Button>
            <Button asChild className="rounded-full px-6">
              <Link href="/">Continue shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-shell py-20 text-center">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add products before checking out.</p>
        <Button asChild className="mt-6 rounded-full px-7">
          <Link href="/">Browse products</Link>
        </Button>
      </div>
    );
  }

  const validate = () => {
    const nextErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = "Required";
    if (!form.lastName.trim()) nextErrors.lastName = "Required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) nextErrors.phone = "Enter 10 digit mobile";
    if (!form.address.trim()) nextErrors.address = "Required";
    if (!form.city.trim()) nextErrors.city = "Required";
    if (!form.state.trim()) nextErrors.state = "Required";
    if (!/^\d{6}$/.test(form.zip)) nextErrors.zip = "Enter 6 digit PIN";

    if (paymentMethod === "card") {
      if (!form.cardName.trim()) nextErrors.cardName = "Required";
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) nextErrors.cardNumber = "Enter 16 digit card";
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) nextErrors.expiry = "MM/YY";
      if (!/^\d{3,4}$/.test(form.cvc)) nextErrors.cvc = "Invalid CVC";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCheckout = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast({ title: "Please complete required fields", description: "Some fields need your attention." });
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();

    toast({
      title: "Payment successful",
      description: "Your order is confirmed and being processed.",
    });
  };

  const onFormChange = (field, value) => {
    let nextValue = value;

    if (field === "phone") {
      nextValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (field === "zip") {
      nextValue = value.replace(/\D/g, "").slice(0, 6);
    }

    if (field === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      nextValue = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    }

    if (field === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      nextValue = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }

    if (field === "cvc") {
      nextValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const updated = { ...current };
      delete updated[field];
      return updated;
    });
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      return;
    }
    setCouponState("applying");
    window.setTimeout(() => setCouponState("applied"), 700);
  };

  const couponDiscount = couponState === "applied" ? 199 : 0;
  const payableTotal = Math.max(0, getTotal() - couponDiscount);

  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-card p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Secure checkout</p>
              <h1 className="text-3xl font-semibold">Complete your order</h1>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Step 2 of 3
            </span>
          </div>
          <Progress value={66} className="h-2" />
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs sm:text-sm">
            <StepChip label="Cart" complete />
            <StepChip label="Checkout" active />
            <StepChip label="Done" />
          </div>
        </div>

        <form onSubmit={handleCheckout} className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card className="rounded-2xl border-border/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery address
                </CardTitle>
                <CardDescription>Use suggestions for faster checkout.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {ADDRESS_OPTIONS.slice(0, 2).map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          address: option.address,
                          city: option.city,
                          state: option.state,
                          zip: option.zip,
                        }))
                      }
                      className="rounded-xl border border-border/70 bg-secondary/40 p-3 text-left transition hover:border-primary/40"
                    >
                      <p className="text-sm font-semibold">{option.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {option.address}, {option.city}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="firstName"
                    label="First name"
                    value={form.firstName}
                    onChange={(value) => onFormChange("firstName", value)}
                    error={errors.firstName}
                  />
                  <Field
                    id="lastName"
                    label="Last name"
                    value={form.lastName}
                    onChange={(value) => onFormChange("lastName", value)}
                    error={errors.lastName}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="email"
                    type="email"
                    label="Email"
                    value={form.email}
                    onChange={(value) => onFormChange("email", value)}
                    error={errors.email}
                  />
                  <Field
                    id="phone"
                    label="Mobile"
                    value={form.phone}
                    onChange={(value) => onFormChange("phone", value)}
                    inputMode="numeric"
                    placeholder="10 digit mobile"
                    error={errors.phone}
                  />
                </div>

                <div className="relative">
                  <Field
                    id="address"
                    label="Address"
                    value={form.address}
                    onFocus={() => setShowAddressSuggestions(true)}
                    onChange={(value) => {
                      onFormChange("address", value);
                      setShowAddressSuggestions(true);
                    }}
                    error={errors.address}
                  />

                  {showAddressSuggestions && addressSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-30 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                      {addressSuggestions.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => {
                            setForm((current) => ({
                              ...current,
                              address: option.address,
                              city: option.city,
                              state: option.state,
                              zip: option.zip,
                            }));
                            setShowAddressSuggestions(false);
                          }}
                          className="block w-full border-b border-border/60 px-3 py-2 text-left last:border-b-0 hover:bg-muted"
                        >
                          <p className="text-sm font-medium">{option.address}</p>
                          <p className="text-xs text-muted-foreground">{option.city}, {option.state} {option.zip}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    id="city"
                    label="City"
                    value={form.city}
                    onChange={(value) => onFormChange("city", value)}
                    error={errors.city}
                  />
                  <Field
                    id="state"
                    label="State"
                    value={form.state}
                    onChange={(value) => onFormChange("state", value)}
                    error={errors.state}
                  />
                  <Field
                    id="zip"
                    label="PIN code"
                    value={form.zip}
                    onChange={(value) => onFormChange("zip", value)}
                    inputMode="numeric"
                    placeholder="6 digit PIN"
                    error={errors.zip}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment method
                </CardTitle>
                <CardDescription>Choose the fastest way to pay.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-3">
                  {PAYMENT_METHODS.map((method) => {
                    const active = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`rounded-xl border p-3 text-left transition ${
                          active
                            ? "border-primary bg-primary/10 shadow-md"
                            : "border-border/70 hover:border-primary/40"
                        }`}
                      >
                        <p className="text-sm font-semibold">{method.title}</p>
                        <p className="text-xs text-muted-foreground">{method.subtitle}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-xl border border-border/70 bg-secondary/60 p-3 text-xs text-muted-foreground">
                  {paymentMethod === "card" && "Your card details are encrypted end-to-end."}
                  {paymentMethod === "upi" && "Approve in your UPI app to finish in seconds."}
                  {paymentMethod === "wallet" && "Use wallet balance for one-tap payment."}
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-4">
                    <Field
                      id="cardName"
                      label="Name on card"
                      value={form.cardName}
                      onChange={(value) => onFormChange("cardName", value)}
                      error={errors.cardName}
                    />
                    <Field
                      id="cardNumber"
                      label="Card number"
                      value={form.cardNumber}
                      onChange={(value) => onFormChange("cardNumber", value)}
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      error={errors.cardNumber}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        id="expiry"
                        label="Expiry"
                        placeholder="MM/YY"
                        value={form.expiry}
                        onChange={(value) => onFormChange("expiry", value)}
                        inputMode="numeric"
                        error={errors.expiry}
                      />
                      <Field
                        id="cvc"
                        label="CVC"
                        value={form.cvc}
                        onChange={(value) => onFormChange("cvc", value)}
                        inputMode="numeric"
                        placeholder="123"
                        error={errors.cvc}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <aside className="surface-card-strong sticky top-24 h-fit p-5">
            <h2 className="text-xl font-semibold">Order summary</h2>

            <div className="mt-4 space-y-3 text-sm">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 text-muted-foreground">
                    {item.quantity} x {item.product.name}
                  </p>
                  <p className="font-medium">
                    {formatCurrency(item.product.discountPrice * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-4 h-px bg-border" />

            <SummaryRow label="Subtotal" value={formatCurrency(getSubtotal())} />
            <SummaryRow label="Tax" value={formatCurrency(getTax())} />
            <SummaryRow
              label="Shipping"
              value={getShipping() === 0 ? "Free" : formatCurrency(getShipping())}
            />
            {couponState === "applied" && (
              <SummaryRow label="Coupon discount" value={formatCurrency(-couponDiscount)} strong={false} />
            )}
            <SummaryRow label="Total" value={formatCurrency(payableTotal)} strong />

            <div className="mt-3 rounded-xl border border-border/70 bg-background p-2">
              <div className="flex items-center gap-2">
                <Input
                  value={couponCode}
                  onChange={(event) => setCouponCode(event.target.value)}
                  placeholder="Coupon code"
                  className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
                <Button
                  type="button"
                  variant={couponState === "applied" ? "secondary" : "outline"}
                  className={`h-8 rounded-full px-4 text-xs transition ${
                    couponState === "applying" ? "animate-pulse" : ""
                  }`}
                  onClick={applyCoupon}
                >
                  {couponState === "applying"
                    ? "Applying..."
                    : couponState === "applied"
                    ? "Applied"
                    : "Apply"}
                </Button>
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-5 h-11 w-full rounded-xl" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing payment
                </>
              ) : (
                `Pay ${formatCurrency(payableTotal)}`
              )}
            </Button>

            <div className="mt-4 rounded-xl bg-secondary/70 p-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                Dispatch in 24 hours after confirmation.
              </p>
              <p className="mt-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                SSL-protected payment and buyer protection.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

function Field({ id, label, error, onChange, ...props }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        onChange={(event) => onChange(event.target.value)}
        className={error ? "border-destructive focus-visible:ring-destructive/20" : ""}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className={`flex items-center justify-between text-sm ${strong ? "mt-2 text-base font-semibold" : ""}`}>
      <span className={strong ? "text-foreground" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function StepChip({ label, active = false, complete = false }) {
  let classes = "border-border bg-background text-muted-foreground";

  if (active) {
    classes = "border-primary/30 bg-primary/10 text-primary font-semibold";
  }

  if (complete) {
    classes = "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 font-semibold";
  }

  return <div className={`rounded-full border px-3 py-1.5 text-center ${classes}`}>{label}</div>;
}
