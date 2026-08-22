import React from "react";
import "./Footer.css";
import logo from "./logo/sohra-updated.png";
import makeInIndia from "./logo/Make_In_India.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  faFacebookF,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <footer className="sohra-footer">
    <div className="sohra-footer-surface">
      <div className="sohra-footer-hero">
        <div className="footer-brand-block">
          <img
            src={logo}
            className="footer-logo-main"
            alt="Sohra UPVC Industries"
          />

          <div className="footer-brand-copy">
            <p className="footer-eyebrow">Trusted UPVC craftsmanship</p>
            <h2>Elegant finishes built to last.</h2>
            <p>
              Premium doors and windows, tailored for a sharp first impression
              and long-term performance.
            </p>
          </div>
        </div>

        <div className="footer-cta-group">
          <a className="footer-cta primary" href="tel:7470955631">
            <FontAwesomeIcon icon={faPhone} />
            Call Now
          </a>

          <a
            className="footer-cta secondary"
            href="https://wa.me/7470955631"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="sohra-footer-grid">
        <section className="footer-panel">
          <div className="footer-panel-title">Visit Us</div>

          <div className="footer-contact">
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              Serve No. 487/2 min, Near Jaggkhedi Panchayat Bhawan,
              Sanjeet Road
            </div>

            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              Village: Jaggkhedi, Dist.: Mandsaur, M.P.
            </div>

            <div>
              <FontAwesomeIcon icon={faPhone} className="icon" />
              Mobile No.: 7470955631
            </div>

            <div>
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              Fast response on call and WhatsApp
            </div>
          </div>
        </section>

        <section className="footer-panel footer-panel-accent">
          <div className="footer-panel-title">Follow Us</div>

          <div className="footer-social-label">
            Stay connected for updates, projects, and new designs.
          </div>

          <div className="footer-social">
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a
              href="https://www.facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>

            <a
              href="https://wa.me/7470955631"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>

          <img
            src={makeInIndia}
            className="footer-makeinindia"
            alt="Make in India"
          />
        </section>
      </div>

      <div className="footer-copy">
        <span>
          © {new Date().getFullYear()} Sohra UPVC Industries. All Rights
          Reserved.
        </span>

        <span className="developer-credit">
          Developed with <span>❤️</span> by <strong>Dikshit Raj</strong>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
