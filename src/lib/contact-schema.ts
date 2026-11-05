import { z } from "zod";

const singleLine = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer`)
    .refine((v) => !/[\r\n]/.test(v), "Must be a single line");

export const contactSchema = z.object({
  name: singleLine(100).pipe(z.string().min(2, "Please enter your full name")),
  email: z.string().trim().max(254).email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine((v) => v === "" || /^\+?[0-9\s()-]{7,20}$/.test(v), "Please enter a valid phone number"),
  organisation: singleLine(150),
  service: z.string().trim().min(1, "Please select a service").max(100),
  location: singleLine(150),
  message: z
    .string()
    .trim()
    .min(20, "Please share a few more details (at least 20 characters)")
    .max(4000, "Message must be 4000 characters or fewer"),
  // Honeypot: must stay empty. Bots tend to fill every field.
  website: z.string().max(500).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = Exclude<keyof ContactInput, "website">;
