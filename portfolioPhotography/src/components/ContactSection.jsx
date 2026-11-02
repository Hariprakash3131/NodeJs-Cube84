import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Copy,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export default function ContactSection({ contact, prefilledInquiry = '', setCursorType }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: prefilledInquiry || contact.inquiryTypes[0],
    budget: '$5,000 – $15,000',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending inquiry
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section id="contact" className="py-24 md:py-36 relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-3">
            [ 05 / INITIATE DIALOGUE ]
          </span>
          <h2 className="font-editorial-heading text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight">
            Start a Conversation
          </h2>
          <p className="text-base text-text-secondary max-w-xl font-light mt-3">
            Whether inquiring about editorial assignments, architectural surveys, or private commissions, we respond within 24 hours.
          </p>
        </div>

        {/* 2-Column Grid: Studio Info vs Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Studio Details & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Direct Email Card with One-Click Copy */}
            <div className="glass-panel p-6 rounded-sm space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent block">
                Primary Studio Email
              </span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="font-editorial-heading text-xl sm:text-2xl text-text-primary hover:text-accent transition-colors break-all"
                  onMouseEnter={() => setCursorType && setCursorType('POINTER')}
                  onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
                >
                  {contact.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-full border border-border-subtle hover:border-accent text-text-secondary hover:text-accent transition-all shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                  onMouseEnter={() => setCursorType && setCursorType('POINTER')}
                  onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-accent" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copied && (
                <span className="text-[11px] font-mono text-accent block">
                  ✓ Copied to clipboard
                </span>
              )}
            </div>

            {/* Studio Locations */}
            <div className="space-y-4 p-6 rounded-sm bg-bg-surface/40 border border-border-subtle text-xs font-mono">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-text-muted block text-[10px] uppercase tracking-wider">
                    New York Studio
                  </span>
                  <p className="text-text-secondary mt-0.5 leading-relaxed">
                    {contact.studioAddress}
                  </p>
                </div>
              </div>

              <div className="border-t border-border-subtle pt-3 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-text-muted block text-[10px] uppercase tracking-wider">
                    Paris Bureau
                  </span>
                  <p className="text-text-secondary mt-0.5 leading-relaxed">
                    {contact.secondaryStudio}
                  </p>
                </div>
              </div>

              <div className="border-t border-border-subtle pt-3 flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-text-muted block text-[10px] uppercase tracking-wider">
                    Direct Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-text-primary hover:text-accent transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-text-muted block mb-3">
                Public Channels & Portfolios
              </span>
              <div className="grid grid-cols-2 gap-3">
                {contact.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-sm border border-border-subtle hover:border-accent bg-bg-surface/30 flex items-center justify-between text-xs font-mono text-text-secondary hover:text-accent transition-all duration-200"
                    onMouseEnter={() => setCursorType && setCursorType('POINTER')}
                    onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-sm border border-border-subtle">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent flex items-center justify-center text-accent mb-2">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="font-editorial-heading text-3xl text-text-primary">
                      Inquiry Received
                    </h3>
                    <p className="text-sm font-sans text-text-secondary max-w-md font-light leading-relaxed">
                      Thank you for reaching out. We have received your project details and will review our studio production calendar before contacting you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          inquiryType: contact.inquiryTypes[0],
                          budget: '$5,000 – $15,000',
                          message: '',
                        });
                      }}
                      className="mt-4 px-6 py-2.5 rounded-full border border-border-subtle hover:border-accent text-xs font-mono text-text-primary hover:text-accent transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono tracking-wider uppercase text-text-secondary block">
                          Your Name / Agency *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Maya Lin"
                          className="w-full px-4 py-3 rounded-sm bg-bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent text-sm transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-mono tracking-wider uppercase text-text-secondary block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="maya@studio.com"
                          className="w-full px-4 py-3 rounded-sm bg-bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent text-sm transition-colors"
                        />
                      </div>
                    </div>

                    {/* Inquiry Type Select */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono tracking-wider uppercase text-text-secondary block">
                        Commission Category *
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({ ...formData, inquiryType: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-sm bg-bg-surface border border-border-subtle text-text-primary focus:outline-none focus:border-accent text-sm transition-colors"
                      >
                        {contact.inquiryTypes.map((type) => (
                          <option key={type} value={type} className="bg-bg-surface text-text-primary">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Estimated Budget */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono tracking-wider uppercase text-text-secondary block">
                        Estimated Budget Scope
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          '$2,500 – $5k',
                          '$5,000 – $15k',
                          '$15,000 – $30k',
                          '$30,000+',
                        ].map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`py-2 px-3 rounded-sm text-xs font-mono border transition-all ${
                              formData.budget === b
                                ? 'border-accent bg-accent/10 text-accent font-semibold'
                                : 'border-border-subtle text-text-secondary hover:border-border-highlight'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono tracking-wider uppercase text-text-secondary block">
                        Project Brief & Timeline Details *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Please share locations, key dates, desired deliverables, and any aesthetic references..."
                        className="w-full px-4 py-3 rounded-sm bg-bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent text-sm transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-sm bg-accent hover:bg-accent-hover text-black font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-accent/20 disabled:opacity-50"
                      onMouseEnter={() => setCursorType && setCursorType('POINTER')}
                      onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
                    >
                      {isSubmitting ? (
                        <span>Transmitting Brief...</span>
                      ) : (
                        <>
                          <span>Transmit Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
