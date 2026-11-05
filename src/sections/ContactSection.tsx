import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { locationLabel, site } from "@/data/site";

export function ContactSection({ defaultService }: { defaultService?: string }) {
  return (
    <section id="enquiry" className="topo-bg relative bg-navy-950 py-24 text-white sm:py-32" aria-label="Contact and enquiries">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="light"
            eyebrow="Start a conversation"
            title="Tell us about your project."
            text="Share your requirement and our team will get in touch to understand the scope, site and timelines."
          />
          <Reveal delay={0.2}>
            <ul className="mt-12 space-y-6">
              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-orange-500">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs tracking-[0.2em] text-concrete-400 uppercase">Email</p>
                  <a href={`mailto:${site.email}`} className="mt-1 block text-lg break-all hover:text-orange-500">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-orange-500">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs tracking-[0.2em] text-concrete-400 uppercase">Location</p>
                  <p className="mt-1 text-lg">{locationLabel}</p>
                  {!site.address.street && <p className="text-sm text-concrete-500">Full office address to be added</p>}
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-orange-500">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs tracking-[0.2em] text-concrete-400 uppercase">Phone</p>
                  {site.phone ? (
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-1 block text-lg hover:text-orange-500">
                      {site.phone}
                    </a>
                  ) : (
                    <p className="mt-1 text-lg text-concrete-500">To be added</p>
                  )}
                </div>
              </li>
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="rounded-2xl border border-white/10 bg-navy-900/60 p-6 backdrop-blur sm:p-10 lg:col-span-7">
          <ContactForm defaultService={defaultService} />
        </Reveal>
      </div>
    </section>
  );
}
