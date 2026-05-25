/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Award, HeartPulse, Building2, Calendar, FileText, ChevronDown, CheckCircle, HelpCircle } from 'lucide-react';
import React from 'react';
import { FAQS } from '../data';

interface AboutSectionProps {
  onBookNow: () => void;
}

export default function AboutSection({ onBookNow }: AboutSectionProps) {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const pillars = [
    {
      icon: <Building2 className="w-6 h-6 text-emerald-600" />,
      title: 'State-of-the-Art Infrastructure',
      description: 'Our hospital grounds stretch over 4 acres of high-care environments, built with Class-100 micro-filtered ventilation and digital smart control panels to avoid standard clinical contamination.'
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      title: 'Global Clinical Accreditations',
      description: 'Proudly holding certifications from Joint Commission International (JCI) and NABH, we adhere to rigid clinical transparency audits and surgical safety protocols.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
      title: 'Academic & Translational Science',
      description: 'Supreme runs continuous clinical diagnostic trials and holds partnerships with global medical institutions, maintaining standard molecular pathology registries.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Intro Hero Header */}
      <section className="bg-white py-12 lg:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            <span className="text-[10px] font-mono font-semibold text-indigo-800 tracking-wider uppercase">
              Our Clinical Legacy
            </span>
          </div>
          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950">
            Supreme Superspeciality Hospital
          </h1>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
            Supreme Superspeciality Hospital, founded under the visionary leadership of Dr. Pushparaj Giri, was established with a profound commitment to making world-class healthcare accessible, ethical, and comprehensive. Driven by a "Patient-First" philosophy, the hospital has evolved into a premier multispeciality destination that seamlessly brings together advanced infrastructure and compassionate clinical care under one roof. We pride ourselves on delivering excellence across critical medical domains, specializing in Orthopedics, Cardiology, Gynaecology, and Nephrology. Under the continuous guidance of Dr. Giri, our dedicated team of specialists works tirelessly to provide precise diagnostics and advanced treatments, ensuring that every patient who walks through our doors receives the supreme care they truly deserve.
          </p>
        </div>
      </section>

      {/* Core Mission & Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg w-fit">
                {pillar.icon}
              </div>
              <h3 className="font-sans font-bold text-base text-slate-900">
                {pillar.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hospital History & Timeline */}
      <section className="bg-white py-16 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-emerald-700 font-mono text-xs font-bold tracking-widest uppercase">
                Milestones of Healing
              </span>
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-950 tracking-tight leading-snug">
                Chronicles of Supreme Superspeciality
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                From a small cardiac diagnostic care center to a premiere 350-bed multi-disciplinary superspeciality ecosystem, Supreme has consistently focused on restoring healthy lives to our global patient community.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>JCI Accreditation - Gold Stamp of Global Quality Approval</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>State of the art 4D Catheterization Diagnostic Suite</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Weekly Tumor Board with Global Experts Integration</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onBookNow}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-semibold px-6 py-3 rounded-xl transition cursor-pointer"
                >
                  Schedule Your Patient Evaluation
                </button>
              </div>
            </div>

            {/* Structured Timeline Steps */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative border-l-2 border-slate-150 pl-6 space-y-8 ml-4">
                
                {/* 2018 */}
                <div className="relative">
                  <span className="absolute -left-10 top-0.5 bg-emerald-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-mono text-[10px] font-bold border-4 border-white shadow-sm">
                    18
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-emerald-700">2018 — Founding Stone</span>
                    <h4 className="font-sans font-bold text-sm text-slate-950">Hospital Launch</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Constructed our initial modern cardiac and neurological diagnostics wing in Supreme City with 100 patient beds.
                    </p>
                  </div>
                </div>

                {/* 2021 */}
                <div className="relative">
                  <span className="absolute -left-10 top-0.5 bg-indigo-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-mono text-[10px] font-bold border-4 border-white shadow-sm">
                    21
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-indigo-700">2021 — Robotics Addition</span>
                    <h4 className="font-sans font-bold text-sm text-slate-950">Precision Robotic Surgery Launch</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Introduced high-precision orthopedic joint replacement systems and targeted medical Linac systems for precise oncology therapeutics.
                    </p>
                  </div>
                </div>

                {/* 2025 */}
                <div className="relative">
                  <span className="absolute -left-10 top-0.5 bg-emerald-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-mono text-[10px] font-bold border-4 border-white shadow-sm">
                    25
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-emerald-700">2025 — Global Reach</span>
                    <h4 className="font-sans font-bold text-sm text-slate-950">Accredited by JCI Global Panel</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Secured prestigious Joint Commission International golden stamp, validating our patient outcomes and security guidelines.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clinical FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-emerald-700 font-mono text-xs font-bold tracking-widest uppercase">
              Patient Guidance Desk
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-950 tracking-tight">
              Frequently Asked Care Questions
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Review standard admission procedures, parking conditions, and insurance coverage metrics.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-5 text-left font-sans font-semibold text-xs sm:text-sm text-slate-950 hover:bg-slate-50/50 transition cursor-pointer"
                  >
                    <span className="flex items-center">
                      <HelpCircle className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-250 shrink-0 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 border-t border-slate-50 bg-slate-50/30 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans animate-in slide-in-from-top-1 duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
