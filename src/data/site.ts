/**
 * Core company information. Fields set to `null` are unverified and are rendered
 * as clearly labelled placeholders until official details are supplied.
 */
export const site = {
  name: "Ayni Sree Engineering Projects Private Limited",
  shortName: "Ayni Sree Engineering",
  legalType: "Private Limited Company",
  tagline: "Building Infrastructure. Connecting Tomorrow.",
  description:
    "Delivering engineering-driven solutions for infrastructure, construction and development with a commitment to quality, precision and progress.",
  email: "aepplranchi@gmail.com",
  phone: null as string | null,
  address: {
    locality: "Ranchi",
    region: "Jharkhand",
    country: "India",
    street: null as string | null,
  },
  hours: null as string | null,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  social: [
    { label: "LinkedIn", href: null as string | null },
    { label: "Facebook", href: null as string | null },
    { label: "Instagram", href: null as string | null },
    { label: "X (Twitter)", href: null as string | null },
  ],
  registrationReference:
    "https://tracxn.com/d/legal-entities/india/ayni-sree-engineering-projects-private-limited/__OAqtTMUeagDfNJWIXR9RASsGkeNu2RNu4OdKB-Rej8A",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const locationLabel = `${site.address.locality}, ${site.address.region}, ${site.address.country}`;
