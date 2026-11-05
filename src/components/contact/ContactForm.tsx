"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { contactSchema, type ContactField, type ContactInput } from "@/lib/contact-schema";
import { services } from "@/data/services";

const initial: ContactInput = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  service: "",
  location: "",
  message: "",
  website: "",
};

type Errors = Partial<Record<ContactField, string>>;
type Status = { type: "idle" | "loading" } | { type: "success" | "error"; message: string };

const fieldBase =
  "peer w-full rounded-lg border bg-white/[0.03] px-4 pt-6 pb-2.5 text-white placeholder-transparent outline-none transition-colors focus:border-orange-500 focus:bg-white/[0.06]";

function validateField(values: ContactInput, field: ContactField) {
  const result = contactSchema.safeParse(values);
  if (result.success) return undefined;
  return result.error.flatten().fieldErrors[field]?.[0];
}

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [values, setValues] = useState<ContactInput>({ ...initial, service: defaultService });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const update = (field: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (field !== "website" && touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(next, field) }));
  };

  const blur = (field: ContactField) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(values, field) }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      const next: Errors = {};
      (Object.keys(fe) as ContactField[]).forEach((k) => (next[k] = fe[k]?.[0]));
      setErrors(next);
      setTouched(Object.fromEntries(Object.keys(initial).map((k) => [k, true])));
      setStatus({ type: "error", message: "Please correct the highlighted fields." });
      const first = Object.keys(next)[0];
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus({ type: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string[]> };
      if (res.ok && data.ok) {
        setStatus({ type: "success", message: "Thank you — your enquiry has been sent. We will get back to you soon." });
        setValues({ ...initial });
        setErrors({});
        setTouched({});
        return;
      }
      if (data.fieldErrors) {
        const next: Errors = {};
        Object.entries(data.fieldErrors).forEach(([k, v]) => (next[k as ContactField] = v?.[0]));
        setErrors(next);
      }
      setStatus({ type: "error", message: data.error ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    }
  };

  const field = (name: ContactField, label: string, opts: { type?: string; required?: boolean; autoComplete?: string } = {}) => {
    const err = touched[name] ? errors[name] : undefined;
    const id = `contact-${name}`;
    return (
      <div className="relative">
        <input
          id={id}
          name={name}
          type={opts.type ?? "text"}
          value={values[name] ?? ""}
          onChange={update(name)}
          onBlur={blur(name)}
          placeholder={label}
          autoComplete={opts.autoComplete}
          required={opts.required}
          aria-required={opts.required}
          aria-invalid={!!err}
          aria-describedby={err ? `${id}-error` : undefined}
          className={`${fieldBase} ${err ? "border-red-400" : "border-white/15"}`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-2 left-4 text-xs text-concrete-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-400"
        >
          {label}
          {opts.required && <span className="text-orange-500"> *</span>}
        </label>
        {err && (
          <p id={`${id}-error`} className="mt-1.5 text-xs text-red-300">
            {err}
          </p>
        )}
      </div>
    );
  };

  const serviceErr = touched.service ? errors.service : undefined;
  const messageErr = touched.message ? errors.message : undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-label="Project enquiry form">
      {field("name", "Full name", { required: true, autoComplete: "name" })}
      {field("email", "Email address", { type: "email", required: true, autoComplete: "email" })}
      {field("phone", "Phone number", { type: "tel", autoComplete: "tel" })}
      {field("organisation", "Company / Organisation", { autoComplete: "organization" })}

      <div className="relative">
        <select
          id="contact-service"
          name="service"
          value={values.service}
          onChange={update("service")}
          onBlur={blur("service")}
          required
          aria-required
          aria-invalid={!!serviceErr}
          aria-describedby={serviceErr ? "contact-service-error" : undefined}
          className={`${fieldBase} appearance-none ${serviceErr ? "border-red-400" : "border-white/15"} ${values.service ? "" : "text-concrete-400"}`}
        >
          <option value="" disabled className="text-navy-950">
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title} className="text-navy-950">
              {s.title}
            </option>
          ))}
          <option value="Other / Not sure" className="text-navy-950">
            Other / Not sure
          </option>
        </select>
        <label htmlFor="contact-service" className="pointer-events-none absolute top-2 left-4 text-xs text-concrete-400">
          Service interested in<span className="text-orange-500"> *</span>
        </label>
        <svg className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-concrete-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
        </svg>
        {serviceErr && (
          <p id="contact-service-error" className="mt-1.5 text-xs text-red-300">
            {serviceErr}
          </p>
        )}
      </div>
      {field("location", "Project location")}

      <div className="relative sm:col-span-2">
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={update("message")}
          onBlur={blur("message")}
          placeholder="Message"
          required
          aria-required
          aria-invalid={!!messageErr}
          aria-describedby={messageErr ? "contact-message-error" : undefined}
          className={`${fieldBase} resize-y ${messageErr ? "border-red-400" : "border-white/15"}`}
        />
        <label
          htmlFor="contact-message"
          className="pointer-events-none absolute top-2 left-4 text-xs text-concrete-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-400"
        >
          Tell us about your project<span className="text-orange-500"> *</span>
        </label>
        {messageErr && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-300">
            {messageErr}
          </p>
        )}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-concrete-400">
          Fields marked <span className="text-orange-500">*</span> are required. See our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-white">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-sm font-semibold text-navy-950 transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status.type === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send enquiry <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <div aria-live="polite" role="status" className="sm:col-span-2">
        {(status.type === "success" || status.type === "error") && (
          <div
            className={`flex items-start gap-3 rounded-lg border p-4 text-sm ${
              status.type === "success" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-red-400/40 bg-red-400/10 text-red-200"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            <p>{status.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}
