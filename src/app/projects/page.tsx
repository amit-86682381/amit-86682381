import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ContactSection } from "@/sections/ContactSection";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project portfolio of Ayni Sree Engineering Projects Private Limited. Entries shown are clearly labelled samples until verified project details are published.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work that builds connectivity."
        text="All entries below are labelled sample content and do not represent completed company projects. Verified projects will be published here as they become available."
      />
      <section className="bg-white py-24 sm:py-32" aria-label="Project list">
        <div className="container-x">
          <div className="mb-10 inline-flex items-center rounded-full border border-dashed border-orange-500/60 bg-orange-500/5 px-4 py-2 text-xs font-semibold tracking-wide text-orange-700">
            All portfolio entries are sample placeholders
          </div>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
