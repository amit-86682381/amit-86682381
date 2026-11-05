import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";

export function Portfolio() {
  const [featured, ...rest] = projects;
  const side = rest.slice(0, 2);
  const bottom = rest.slice(2, 4);
  return (
    <section className="bg-white py-24 sm:py-32" aria-label="Project portfolio">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="A showcase built for the work ahead."
            text="This portfolio uses clearly labelled sample entries to demonstrate the layout. Verified company projects and photographs will replace them."
          />
          <Reveal className="shrink-0">
            <Button href="/projects" variant="outline-dark">
              View all projects
            </Button>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {featured && (
            <Reveal className="lg:col-span-7">
              <ProjectCard project={featured} large />
            </Reveal>
          )}
          <div className="grid gap-5 lg:col-span-5">
            {side.map((p, i) => (
              <Reveal key={p.slug} delay={0.1 * (i + 1)}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          {bottom.map((p, i) => (
            <Reveal key={p.slug} delay={0.1 * i} className="lg:col-span-6">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
