/**
 * Editorial content: company values, working process, vision and mission.
 * Values describe the company's intended working principles and are not
 * independently verified certifications or performance claims.
 */
export const values = [
  {
    icon: "compass",
    title: "Engineering-focused approach",
    text: "Decisions grounded in engineering principles, drawings and specifications rather than shortcuts.",
  },
  {
    icon: "scan",
    title: "Attention to detail",
    text: "Careful checks on levels, alignments, materials and finishes at every stage of work.",
  },
  {
    icon: "badge",
    title: "Quality-driven execution",
    text: "Work planned and executed with the intention of meeting the project's quality requirements.",
  },
  {
    icon: "shield",
    title: "Safety-conscious practices",
    text: "Safe working practices treated as a priority for people on site and the public around it.",
  },
  {
    icon: "target",
    title: "Commitment to requirements",
    text: "A clear focus on the scope, timelines and expectations agreed with each client.",
  },
  {
    icon: "users",
    title: "Professional coordination",
    text: "Transparent communication with clients, consultants and stakeholders throughout delivery.",
  },
] as const;

export type ValueIconKey = (typeof values)[number]["icon"];

export const processSteps = [
  { title: "Initial Consultation", text: "Understanding your objectives, requirements, constraints and expected timelines." },
  { title: "Site Assessment", text: "Visiting the site to understand ground conditions, access and existing features." },
  { title: "Surveying and Planning", text: "Collecting accurate survey data and preparing a practical execution plan." },
  { title: "Engineering and Execution", text: "Carrying out the works in line with approved designs and specifications." },
  { title: "Quality Inspection", text: "Inspecting completed work against requirements and addressing observations." },
  { title: "Project Handover", text: "Handing over completed work with the relevant records and documentation." },
];

export const about = {
  heading: "Engineering the ground that progress is built on.",
  paragraphs: [
    "Ayni Sree Engineering Projects Private Limited is a civil engineering and construction company based in Ranchi, Jharkhand. The company is positioned to serve the infrastructure sector, with a focus on road construction, road surveying, civil engineering works and related infrastructure development.",
    "We believe infrastructure should be planned carefully, built precisely and maintained responsibly — because roads and civil works shape how communities connect, travel and grow.",
  ],
  pillars: [
    {
      title: "Our approach",
      text: "Every project starts with understanding the site and the requirement. We plan around accurate information, sound engineering and practical execution.",
    },
    {
      title: "Commitment to quality",
      text: "We aim to build to specification, check our work at every stage, and treat quality as part of the process — not an afterthought.",
    },
    {
      title: "Vision for infrastructure",
      text: "We want to contribute to safer, better-connected infrastructure across Jharkhand and beyond, supporting regional development for years to come.",
    },
  ],
};

export const visionMission = {
  vision:
    "To be a trusted engineering partner in building infrastructure that connects communities and supports lasting regional growth.",
  mission:
    "To deliver civil engineering and infrastructure works with precision, safety and integrity — guided by sound engineering, clear communication and respect for every project's requirements.",
  commitment:
    "We are committed to doing the fundamentals well: understanding the ground, planning thoroughly, building carefully and standing behind our work.",
};
