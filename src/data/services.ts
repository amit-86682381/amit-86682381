import { images, type SiteImage } from "./images";

/**
 * Proposed service categories. Descriptions outline the intended scope of work
 * and are not claims of completed projects. Add, remove or reorder entries freely;
 * pages, navigation, the contact form and the sitemap update automatically.
 */
export type ServiceIconKey =
  | "road"
  | "survey"
  | "civil"
  | "infrastructure"
  | "site"
  | "maintenance";

export type Service = {
  slug: string;
  title: string;
  icon: ServiceIconKey;
  image: SiteImage;
  summary: string;
  intro: string;
  scope: string[];
  approach: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "road-construction",
    title: "Road Construction",
    icon: "road",
    image: images.roadConstruction,
    summary:
      "Construction of roads and pavements engineered for durability, safety and long service life.",
    intro:
      "Roads are the arteries of regional growth. Our road construction services are intended to cover the full build sequence, from subgrade preparation to the final wearing course, with an emphasis on sound engineering and disciplined site practice.",
    scope: [
      "Earthwork, subgrade and embankment preparation",
      "Granular sub-base and base course works",
      "Bituminous and concrete pavement construction",
      "Drainage, culverts and roadside structures",
      "Road furniture, signage and lane markings",
    ],
    approach: [
      { title: "Design alignment", text: "Execution planned around approved drawings, specifications and site conditions." },
      { title: "Material control", text: "Materials sourced and checked against the project's specified requirements." },
      { title: "Layered execution", text: "Each pavement layer built and inspected before the next begins." },
    ],
  },
  {
    slug: "road-surveying-and-mapping",
    title: "Road Surveying and Mapping",
    icon: "survey",
    image: images.surveying,
    summary:
      "Topographic surveys, alignment studies and mapping that give every project an accurate foundation.",
    intro:
      "Accurate data is the starting point of every successful infrastructure project. Our surveying and mapping services are intended to support planning, design and construction with reliable ground information.",
    scope: [
      "Topographic and detailed site surveys",
      "Road alignment and centre-line surveys",
      "Longitudinal and cross-section profiling",
      "Levelling and benchmark establishment",
      "Survey drawings and mapping outputs",
    ],
    approach: [
      { title: "Field accuracy", text: "Survey work carried out methodically with appropriate instruments." },
      { title: "Clear deliverables", text: "Outputs prepared in formats suited to design and execution teams." },
      { title: "Verification", text: "Key survey data cross-checked before it informs design decisions." },
    ],
  },
  {
    slug: "civil-engineering-works",
    title: "Civil Engineering Works",
    icon: "civil",
    image: images.civilWorks,
    summary:
      "General civil works delivered with structural discipline, careful detailing and quality-driven execution.",
    intro:
      "Civil engineering works form the physical backbone of development. We intend to deliver structural and non-structural civil works with a focus on precision, safety and adherence to specifications.",
    scope: [
      "Reinforced concrete and masonry works",
      "Foundations and structural elements",
      "Retaining walls and protection works",
      "Storm-water drainage and channels",
      "Ancillary civil structures",
    ],
    approach: [
      { title: "Specification-led", text: "Work executed in line with drawings, codes and project specifications." },
      { title: "Detailing", text: "Attention to reinforcement, formwork and finishing details." },
      { title: "Inspection", text: "Stage-wise checks at critical points of construction." },
    ],
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    icon: "infrastructure",
    image: images.infrastructure,
    summary:
      "Coordinated delivery of infrastructure that connects communities and supports long-term growth.",
    intro:
      "Infrastructure development brings multiple disciplines together. Our approach is intended to coordinate planning, engineering and execution so that infrastructure assets are delivered as integrated, functional systems.",
    scope: [
      "Connectivity and access infrastructure",
      "Utility corridors and service infrastructure",
      "Bridges, culverts and cross-drainage works",
      "Public and community infrastructure",
      "Project coordination across work packages",
    ],
    approach: [
      { title: "Integrated planning", text: "Work packages sequenced to reduce conflicts and rework." },
      { title: "Coordination", text: "Regular communication with stakeholders throughout the project." },
      { title: "Long-term view", text: "Design intent and durability kept central to execution decisions." },
    ],
  },
  {
    slug: "site-development-and-preparation",
    title: "Site Development and Preparation",
    icon: "site",
    image: images.siteDevelopment,
    summary:
      "Clearing, grading, levelling and earthworks that prepare sites for safe and efficient construction.",
    intro:
      "Good projects begin with well-prepared ground. Our site development services are intended to make sites ready for construction through careful earthworks, grading and enabling works.",
    scope: [
      "Site clearing and demarcation",
      "Excavation, cutting and filling",
      "Grading, levelling and compaction",
      "Access roads and temporary works",
      "Site drainage and enabling works",
    ],
    approach: [
      { title: "Assessment first", text: "Ground conditions reviewed before earthworks are planned." },
      { title: "Controlled earthworks", text: "Cut-and-fill carried out to defined levels and compaction requirements." },
      { title: "Safe sites", text: "Safety-conscious practices applied from the first day on site." },
    ],
  },
  {
    slug: "infrastructure-maintenance",
    title: "Infrastructure Maintenance",
    icon: "maintenance",
    image: images.maintenance,
    summary:
      "Planned and responsive maintenance that extends the life and performance of infrastructure assets.",
    intro:
      "Well-maintained infrastructure stays safe and serviceable for longer. Our maintenance services are intended to help asset owners keep roads and civil structures in good working condition.",
    scope: [
      "Road surface repairs and resurfacing",
      "Pothole and patch repair works",
      "Drainage cleaning and restoration",
      "Repair of civil structures",
      "Road marking and signage renewal",
    ],
    approach: [
      { title: "Condition review", text: "Defects identified and prioritised before work begins." },
      { title: "Minimal disruption", text: "Work planned to limit impact on users and traffic." },
      { title: "Durable repairs", text: "Repair methods chosen for lasting performance." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
