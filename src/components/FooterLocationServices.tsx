"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LocationServiceItem {
  title: string;
  slug: string;
}

export default function FooterLocationServices() {
  const [services, setServices] = useState<LocationServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPatnaServices() {
      try {
        const res = await fetch("/api/seo-pages?status=published&locationName=Patna&limit=8", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const json = await res.json();
        if (json.success && Array.isArray(json.data) && isMounted) {
          const liveItems: LocationServiceItem[] = json.data.map((item: any) => ({
            title: item.h1Heading || `${item.serviceName} in ${item.locationName}`,
            slug: item.slug,
          }));
          setServices(liveItems);
        }
      } catch (err) {
        console.error("Error loading footer services for Patna:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPatnaServices();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h4 className="footer-col-title">Services in Patna</h4>
      <ul className="footer-links-list">
        {services.map((item) => (
          <li key={item.slug} className="footer-link-item">
            <Link href={`/${item.slug}`} title={item.title}>
              {item.title}
            </Link>
          </li>
        ))}

        {services.length === 0 && !loading && (
          <li className="footer-link-item" style={{ color: "#94a3b8", fontSize: "13px" }}>
            <span>Patna Doorstep Service</span>
          </li>
        )}

        <li className="footer-link-item" style={{ paddingTop: "6px" }}>
          <Link href="/locations" className="footer-view-all-link">
            <span>View All Locations</span>
            <ArrowRight size={13} style={{ display: "inline-block" }} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
