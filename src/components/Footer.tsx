import React from "react";
import Link from "next/link";
import Image from "next/image";
import { popularCategories } from "@/data/servicesData";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  const userLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-repair-saathi/" },
    { name: "Contact Us", href: "/contact-repair-saathi/" },
    { name: "Blogs", href: "/home-appliance-repair-blog/" },
    { name: "My Bookings", href: "/my-bookings/" },
    { name: "Terms and Condition", href: "/terms-and-conditions/" },
    { name: "Privacy Policy", href: "/privacy-policy/" },
    { name: "Refund Policy", href: "/refund-and-returns-policy/" },
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: About */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Image
                src="/images/logo.webp"
                alt="Repair Saathi - Home Appliance Repair Service in Patna"
                width={40}
                height={40}
                style={{ borderRadius: "6px" }}
              />
              <span style={{ fontSize: "18px", fontWeight: "900", color: "#ffffff" }}>
                Repair <span style={{ color: "#fbbc34" }}>Saathi</span>
              </span>
            </div>
            <p className="footer-about-text">
              Our platform helps customers to book reliable home services, like AC Cleaning & Maintenance,
              Washing Machine Repair, Microwave, Geyser etc., all types of Electronic appliances on a single click.
            </p>
            <div style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.6" }}>
              <strong style={{ color: "#fbbc34" }}>Service Hours:</strong> 8:00 AM – 9:00 PM (Monday – Sunday)
              <br />
              <strong>Doorstep Coverage:</strong> All Patna areas including Danapur, Saguna More, Bailey Road, Boring Road, Kankarbagh & more.
            </div>
          </div>

          {/* Col 2: Popular Categories */}
          <div>
            <h4 className="footer-col-title">Popular Categories</h4>
            <ul className="footer-links-list">
              {popularCategories.map((cat) => (
                <li key={cat.name} className="footer-link-item">
                  <Link href={cat.link}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: For Users */}
          <div>
            <h4 className="footer-col-title">For Users</h4>
            <ul className="footer-links-list">
              {userLinks.map((item) => (
                <li key={item.name} className="footer-link-item">
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links & Contact */}
          <div>
            <h4 className="footer-col-title">Contact & Help</h4>
            
            <div className="footer-contact-item">
              <span>📞</span>
              <a href="tel:+919304415657" style={{ fontWeight: "700", color: "#ffffff" }}>
                +91-9304415657
              </a>
            </div>

            <div className="footer-contact-item">
              <WhatsAppIcon size={16} color="#25d366" />
              <a
                href="https://wa.me/919304415657?text=Hi%20Repair%20Saathi"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontWeight: "700", color: "#25d366" }}
              >
                +91-9304415657 (WhatsApp)
              </a>
            </div>

            <div className="footer-contact-item">
              <span>✉️</span>
              <a href="mailto:infohrepairsaathi@gmail.com">
                infohrepairsaathi@gmail.com
              </a>
            </div>

            <div className="footer-contact-item">
              <span>📍</span>
              <span>
                RR Guest House, Ground floor, Near Hi Tech Hospital, Saguna More Balaji Nagar. Patna (Bihar)
              </span>
            </div>

            <div style={{ marginTop: "16px" }}>
              <span style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700" }}>
                Follow Us
              </span>
              <div className="footer-social-links">
                <a
                  href="https://www.instagram.com/a2zsmttc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Instagram"
                >
                  IG
                </a>
                <a
                  href="https://www.linkedin.com/in/ripendrakr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="LinkedIn"
                >
                  IN
                </a>
                <a
                  href="https://x.com/ripendrakr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="X (Twitter)"
                >
                  𝕏
                </a>
                <a
                  href="https://www.threads.com/@a2zsmttc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Threads"
                >
                  @
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Repair Saathi. All rights reserved.</p>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/terms-and-conditions/">Terms</Link>
            <Link href="/privacy-policy/">Privacy</Link>
            <Link href="/refund-and-returns-policy/">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
