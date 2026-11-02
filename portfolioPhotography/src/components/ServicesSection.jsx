import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

export default function ServicesSection({ services, onSelectServiceInquiry, setCursorType }) {
  return (
    <section id="services" className="py-24 md:py-36 relative border-t border-border-subtle bg-bg/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-3">
              [ 04 / CAPABILITIES & COMMISSIONS ]
            </span>
            <h2 className="font-editorial-heading text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight">
              Services & Scope
            </h2>
          </div>
          <p className="text-sm font-mono text-text-secondary max-w-md">
            Every commission begins with a thorough dialogue to understand context, physical materials, and final exhibition medium.
          </p>
        </div>

        {/* 4 Offerings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-sm bg-bg-surface/60 border border-border-subtle hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
                  <span className="font-mono text-xs text-accent uppercase tracking-widest">
                    SERVICE // {service.number}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.timeline}</span>
                  </div>
                </div>

                <h3 className="font-editorial-heading text-2xl sm:text-3xl text-text-primary group-hover:text-accent transition-colors duration-200 mb-3">
                  {service.title}
                </h3>

                <p className="text-sm font-sans text-text-secondary leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                {/* Deliverables list */}
                <div className="space-y-2 mb-8">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-text-muted block mb-2">
                    Scope & Deliverables:
                  </span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry link button */}
              <a
                href="#contact"
                onClick={() => onSelectServiceInquiry && onSelectServiceInquiry(service.title)}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-text-primary hover:text-accent transition-colors pt-4 border-t border-border-subtle group-hover:border-accent/30"
                onMouseEnter={() => setCursorType && setCursorType('POINTER')}
                onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
              >
                <span>Request Commission Brief</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
