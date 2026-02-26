"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { BRAND_NAME, BRAND_SHORT, SUPPORT_EMAIL } from "../../lib/brand.js";

const footerLinks = {
  Shop: [
    { label: "Mobile Phones", href: "/category/mobile-phones" },
    { label: "Laptops", href: "/category/laptops-computers" },
    { label: "Fashion", href: "/category/mens-fashion" },
    { label: "Beauty", href: "/category/beauty-personal-care" },
    { label: "Flash Deals", href: "/deals" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Help Center", href: "/support" },
    { label: "Track Order", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Account", href: "/account" },
    { label: "Returns", href: "/returns" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border/70 bg-card/80">
      <div className="container-shell py-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-semibold">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-500 text-sm font-black text-white">
                {BRAND_SHORT}
              </span>
              {BRAND_NAME}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Premium shopping destination for electronics, fashion, and lifestyle essentials.
            </p>
            <div className="mt-4 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:text-primary"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {title}
              </h4>
              <ul className="mt-3 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm transition hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-border/70 bg-background p-4 md:grid-cols-3">
          <ContactItem icon={Mail} label="Email" value={SUPPORT_EMAIL} href={`mailto:${SUPPORT_EMAIL}`} />
          <ContactItem icon={Phone} label="Phone" value="1800-123-4567" href="tel:18001234567" />
          <ContactItem icon={MapPin} label="Address" value="Bandra Kurla Complex, Mumbai" />
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-border/70 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Copyright {currentYear} {BRAND_NAME}. All rights reserved.</p>
          <p>Authentic products. Secure checkout. Fast delivery.</p>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <Icon className="mt-0.5 h-4 w-4 text-primary" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex items-start gap-2 rounded-xl p-2 transition hover:bg-muted/60">
        {content}
      </a>
    );
  }

  return <div className="flex items-start gap-2 rounded-xl p-2">{content}</div>;
}
