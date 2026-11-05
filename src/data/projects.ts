import { images, type SiteImage } from "./images";

/**
 * SAMPLE PROJECTS — PLACEHOLDER CONTENT ONLY.
 * These entries demonstrate the portfolio layout and do NOT represent work
 * carried out by the company. Replace with verified project information and
 * photographs, and set `isSample` to false for real projects.
 */
export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  image: SiteImage;
  summary: string;
  overview: string;
  highlights: string[];
  isSample: boolean;
};

const sampleLocation = "Location to be confirmed";

export const projects: Project[] = [
  {
    slug: "sample-road-upgrade",
    title: "Sample Project: Road Upgrade",
    category: "Road Construction",
    location: sampleLocation,
    image: images.roadConstruction,
    summary: "Placeholder entry illustrating how a road construction project will be presented.",
    overview:
      "This is sample content used to demonstrate the project detail layout. Replace it with the verified scope, timeline and outcomes of an actual company project.",
    highlights: ["Project scope — to be added", "Key works — to be added", "Client / authority — to be added"],
    isSample: true,
  },
  {
    slug: "sample-topographic-survey",
    title: "Sample Project: Topographic Survey",
    category: "Road Surveying and Mapping",
    location: sampleLocation,
    image: images.surveying,
    summary: "Placeholder entry illustrating how a surveying and mapping assignment will be presented.",
    overview:
      "This is sample content used to demonstrate the project detail layout. Replace it with the verified scope, timeline and outcomes of an actual company project.",
    highlights: ["Survey extent — to be added", "Deliverables — to be added", "Client / authority — to be added"],
    isSample: true,
  },
  {
    slug: "sample-civil-structure",
    title: "Sample Project: Civil Structure",
    category: "Civil Engineering Works",
    location: sampleLocation,
    image: images.civilWorks,
    summary: "Placeholder entry illustrating how a civil engineering project will be presented.",
    overview:
      "This is sample content used to demonstrate the project detail layout. Replace it with the verified scope, timeline and outcomes of an actual company project.",
    highlights: ["Structure type — to be added", "Key works — to be added", "Client / authority — to be added"],
    isSample: true,
  },
  {
    slug: "sample-site-preparation",
    title: "Sample Project: Site Preparation",
    category: "Site Development and Preparation",
    location: sampleLocation,
    image: images.siteDevelopment,
    summary: "Placeholder entry illustrating how a site development project will be presented.",
    overview:
      "This is sample content used to demonstrate the project detail layout. Replace it with the verified scope, timeline and outcomes of an actual company project.",
    highlights: ["Site area — to be added", "Earthworks — to be added", "Client / authority — to be added"],
    isSample: true,
  },
  {
    slug: "sample-bridge-connectivity",
    title: "Sample Project: Connectivity Infrastructure",
    category: "Infrastructure Development",
    location: sampleLocation,
    image: images.infrastructure,
    summary: "Placeholder entry illustrating how an infrastructure development project will be presented.",
    overview:
      "This is sample content used to demonstrate the project detail layout. Replace it with the verified scope, timeline and outcomes of an actual company project.",
    highlights: ["Asset type — to be added", "Key works — to be added", "Client / authority — to be added"],
    isSample: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
