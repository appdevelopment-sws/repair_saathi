import React from "react";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Fast Doorstep Appliance Repair Service in Patna | Repair Saathi",
  description:
    "Contact Repair Saathi for instant home appliance repair in Patna, Danapur & Saguna More. Call +91-9304415657 or chat on WhatsApp. 15-min callback, 30-min doorstep arrival.",
  keywords: [
    "contact repair saathi",
    "appliance repair customer care patna",
    "ac technician phone number patna",
    "doorstep repair danapur saguna more",
    "repair saathi contact number",
    "washing machine technician patna contact",
  ],
  openGraph: {
    title: "Contact Repair Saathi | Appliance Repair Service Patna",
    description:
      "Get in touch with Patna's leading doorstep appliance repair service. Direct call helpline +91-9304415657, WhatsApp support, and Saguna More workshop.",
    type: "website",
    url: "https://repairsaathi.in/contact-repair-saathi/",
  },
  alternates: {
    canonical: "https://repairsaathi.in/contact-repair-saathi/",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
