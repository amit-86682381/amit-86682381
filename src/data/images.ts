/**
 * Central image registry.
 * All photographs are PLACEHOLDER stock imagery from Unsplash (https://unsplash.com/license)
 * and do not depict the company's own work. Replace `src` values with official
 * company photographs (local files in /public or remote URLs) when available.
 */
export type SiteImage = { src: string; alt: string };

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const images = {
  heroHighway: {
    src: unsplash("1545558014-8692077e9b5c"),
    alt: "Aerial view of a multi-lane highway curving through the landscape",
  },
  roadConstruction: {
    src: unsplash("1621155346337-1d19476ba7d6"),
    alt: "Road construction machinery laying fresh asphalt on a highway",
  },
  surveying: {
    src: unsplash("1581094288338-2314dddb7ece"),
    alt: "Engineer working with surveying and measuring equipment on site",
  },
  civilWorks: {
    src: unsplash("1541888946425-d81bb19240f5"),
    alt: "Reinforced concrete structure under construction on a civil engineering site",
  },
  infrastructure: {
    src: unsplash("1513828583688-c52646db42da"),
    alt: "Large bridge infrastructure spanning across a valley",
  },
  siteDevelopment: {
    src: unsplash("1504307651254-35680f356dfd"),
    alt: "Construction site with cranes and earthworks during site preparation",
  },
  maintenance: {
    src: unsplash("1517089596392-fb9a9033e05b"),
    alt: "Paved road surface with fresh lane markings after maintenance",
  },
  engineerPlans: {
    src: unsplash("1503387762-592deb58ef4e"),
    alt: "Engineering drawings and plans spread across a desk",
  },
  engineerSite: {
    src: unsplash("1581094794329-c8112a89af12"),
    alt: "Engineer in safety helmet reviewing work on a construction site",
  },
  roadLandscape: {
    src: unsplash("1469854523086-cc02fe5d8800"),
    alt: "Open road stretching into the distance through a natural landscape",
  },
} satisfies Record<string, SiteImage>;
