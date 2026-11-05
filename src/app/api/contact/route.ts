import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { MailNotConfiguredError, sendEnquiry } from "@/lib/mailer";
import { site } from "@/data/site";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot filled: accept silently without sending.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  try {
    await sendEnquiry(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof MailNotConfiguredError) {
      return NextResponse.json(
        { error: `Online enquiries are not available yet. Please email us directly at ${site.email}.` },
        { status: 503 },
      );
    }
    console.error("Contact form delivery failed:", err instanceof Error ? err.name : "unknown error");
    return NextResponse.json(
      { error: `We couldn't send your message right now. Please try again or email ${site.email}.` },
      { status: 502 },
    );
  }
}
