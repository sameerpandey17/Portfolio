import React, { useState } from 'react';
import { SectionHeading } from './section-heading';
import { ScribbleLink } from './scribble-link';
import { portfolioContent } from '../content';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { contact, profile } = portfolioContent;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    });
  };

  return (
    <section id="contact" className="site-section section-contact" aria-labelledby="contact-heading">
      <div className="section-container">
        <div className="viewfinder-card contact-card">
          <span className="corner-tick top-left" />
          <span className="corner-tick top-right" />
          <span className="corner-tick bottom-left" />
          <span className="corner-tick bottom-right" />

          <SectionHeading
            number="07"
            kicker="Direct Frequency"
            title="Let's Connect & Build"
            subtitle="Open to full-stack, applied AI, and systems engineering roles. Available for high-impact teams."
            id="contact-heading"
          />

          <div className="contact-headline-box">
            <h2 className="contact-statement font-display">
              {contact.statement}
            </h2>
            <p className="contact-subtext">
              {contact.subtext}
            </p>
          </div>

          {/* Interactive Email Bar with 1-Click Copy */}
          <div className="contact-email-bar">
            <div className="email-display-group">
              <span className="email-label">PRIMARY INBOX</span>
              <a href={`mailto:${contact.email}`} className="email-link font-display">
                {contact.email}
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`copy-email-btn ${copied ? 'is-copied' : ''}`}
              aria-label="Copy email address to clipboard"
            >
              <span className="copy-icon" aria-hidden="true">
                {copied ? '✓' : '⧉'}
              </span>
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ADDRESS'}</span>
            </button>
          </div>

          {/* Direct Details & Social Links Row */}
          <div className="contact-details-row">
            <div className="detail-item">
              <span className="detail-tag">PHONE</span>
              <span className="detail-val">{profile.phone}</span>
            </div>
            <div className="detail-item">
              <span className="detail-tag">LOCATION</span>
              <span className="detail-val">{profile.location} ({profile.remote})</span>
            </div>
            <div className="detail-item">
              <span className="detail-tag">STATUS</span>
              <span className="detail-val status-active">
                <span className="status-dot" /> AVAILABLE FOR INTERNSHIPS
              </span>
            </div>
          </div>

          {/* Social Links Row with Scribble Animation */}
          <div className="contact-socials-row">
            <span className="socials-lead">NETWORKS //</span>
            <div className="socials-links-group">
              {contact.socials.map((social) => (
                <ScribbleLink
                  key={social.label}
                  href={social.url}
                  target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="social-action-link"
                >
                  {social.label} ↗
                </ScribbleLink>
              ))}
            </div>
          </div>
        </div>

        {/* Site Footer */}
        <footer className="site-footer">
          <div className="footer-left">
            <div className="footer-credits">
              <span className="footer-brand font-display">Sameer Pandey</span>
              <span className="footer-copy">© 2026 · AI & Full-Stack Developer</span>
            </div>
          </div>

          <div className="footer-meta">
            <span className="footer-tz">PUNE, IN · IST (UTC+5:30)</span>
            <span className="footer-stack">VITE // REACT // GSAP // LENIS</span>
          </div>
        </footer>
      </div>
    </section>
  );
};
