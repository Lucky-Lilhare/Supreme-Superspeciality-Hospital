/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, Brain, HeartPulse, Bone, Baby, ShieldAlert, Award, ArrowRight, Star, ShieldCheck, HeartPulse as HeartIcon, Check } from 'lucide-react';
import { TESTIMONIALS } from '../data';

interface HomeSectionProps {
  setCurrentPage: (page: string) => void;
  onBookNow: () => void;
}

export default function HomeSection({ setCurrentPage, onBookNow }: HomeSectionProps) {
  const quickMetrics = [
    { value: '350+', label: 'Superspeciality Beds', description: 'Fully monitored, including 60 ICU beds' },
    { value: '45+', label: 'Senior Consultants', description: 'Trained at global Ivy League centers' },
    { value: '99.2%', label: 'Operative Success', description: 'Audited surgical survival outcomes' },
    { value: '24/7', label: 'Critical Response', description: 'Average stroke desk response in under 35 minutes' }
  ];

  const valueAxioms = [
    {
      title: 'Advanced Robotic Surgical Suites',
      description: 'Ultra-precise robotic arms assist our surgeons during complex joint replacements and deep oncological tumor removal procedures, resulting in minimal blood loss and shorter hospital stays.'
    },
    {
      title: 'Emergency Level-1 Stroke Center',
      description: 'Our rapid access pathways prioritize neurologic crises with instant CT imaging, in-house interventionists, and mechanical clot extraction options active round-the-clock.'
    },
    {
      title: 'Specialized Level III Neonatal ICU',
      description: 'Equipped with developmental incubators, respiratory support, and continuous physiological diagnostic tools to safeguard premature neonates born with complications.'
    }
  ];

  const getDeptIcon = (id: string) => {
    switch (id) {
      case 'cardiology': return <HeartPulse className="w-8 h-8 text-rose-500" />;
      case 'neurology': return <Brain className="w-8 h-8 text-teal-500" />;
      case 'orthopedics': return <Bone className="w-8 h-8 text-indigo-500" />;
      case 'pediatrics': return <Baby className="w-8 h-8 text-amber-500" />;
      default: return <ShieldAlert className="w-8 h-8 text-sky-500" />;
    }
  };

  return (
    <div className="bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-mono font-semibold text-emerald-800 tracking-wider uppercase">
                  Joint Commission International Accredited Campus
                </span>
              </div>
              
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-950 leading-[1.1]">
                Precision Medicine.<br />
                <span className="text-emerald-700">Compassionate Healing.</span>
              </h1>
              
              <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
                Welcome to Supreme Superspeciality Hospital, where cutting-edge robotic tech met with Ivy-League clinical specialists to deliver highly precise treatment solutions.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  id="hero-book-now"
                  onClick={onBookNow}
                  className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-sm font-semibold px-6 py-3.5 rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:translate-y-[-1px]"
                >
                  <Calendar className="w-4.5 h-4.5 mr-2" />
                  <span>Book Physical Consultation</span>
                </button>
                <button
                  id="hero-search-docs"
                  onClick={() => setCurrentPage('doctors')}
                  className="flex items-center justify-center bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-sans text-sm font-semibold px-6 py-3.5 rounded-xl transition cursor-pointer"
                >
                  <span>Consult Clinical Specialists</span>
                </button>
              </div>

              {/* Accreditations Icons */}
              <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center gap-6 text-slate-400">
                <span className="text-xs font-mono tracking-wider uppercase">Endorsed Standards:</span>
                <span className="font-sans text-xs font-bold text-slate-600">JCI CERTIFIED</span>
                <span className="text-slate-300">|</span>
                <span className="font-sans text-xs font-bold text-slate-600">NABH ACCREDITED</span>
                <span className="text-slate-300">|</span>
                <span className="font-sans text-xs font-bold text-slate-600">NABL MOLECULAR LAB</span>
              </div>
            </div>

            {/* Hero Digital Illustration Block */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-square max-w-[420px] mx-auto">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-emerald-100 rounded-2xl transform rotate-3 scale-98" />
                
                {/* Visual Canvas Card representing our supreme high standard */}
                <div className="absolute inset-0 bg-[#0f172a] text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between border border-slate-700 transform transition-transform hover:-rotate-1 duration-500">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="bg-emerald-600 p-2.5 rounded-lg text-white">
                        <HeartIcon className="w-5 h-5 animate-pulse" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-900">
                        24/7 HELPDESK
                      </span>
                    </div>
                    <div>
                      <h3 className="font-sans text-xl font-bold tracking-tight text-white leading-snug">
                        24-Hour Emergency Medical Response Network
                      </h3>
                      <p className="text-slate-400 text-xs mt-2 font-sans leading-relaxed">
                        Toll-Free triage hotline is supervised directly by Senior Trauma Resuscitation Specialists.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-800">
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Cardiology On-duty Team: <strong>Available</strong></span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Neurology Trauma Specialist: <strong>Active</strong></span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>Advanced ICU Bed Availability: <strong>14 Available</strong></span>
                    </div>
                  </div>

                  <div className="text-slate-500 font-mono text-[9px] text-right mt-4">
                    Supreme Medical Systems &copy; 2026
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {quickMetrics.map((metric, idx) => (
              <div key={idx} className="text-center space-y-1">
                <span className="block font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  {metric.value}
                </span>
                <span className="block font-sans font-bold text-xs text-emerald-700 tracking-wide uppercase">
                  {metric.label}
                </span>
                <span className="block font-sans text-xs text-slate-500">
                  {metric.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Highlights Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-emerald-700 font-mono text-xs font-bold tracking-widest uppercase">
              Centres of Clinical Leadership
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
              Our Five Foundations of Excellence
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We specialize across complex medical segments, combining multidisciplinary diagnostics with advanced tech layers for holistic, rapid healing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Cardiology */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow transition duration-200 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-rose-50 p-2.5 rounded-lg w-fit">
                  {getDeptIcon('cardiology')}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-slate-900">Cardiology & Cardiac</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Catheterization labs, coronary balloon therapeutic angioplasty, and bypass operations.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('departments')}
                className="mt-6 flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition group-hover:translate-x-1 cursor-pointer"
              >
                <span>View Department</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            {/* Neurology */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow transition duration-200 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-teal-50 p-2.5 rounded-lg w-fit">
                  {getDeptIcon('neurology')}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-slate-900">Neurology & Stroke</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Endovascular clot removal, spinal decompression therapies, and microsurgery interfaces.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('departments')}
                className="mt-6 flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition group-hover:translate-x-1 cursor-pointer"
              >
                <span>View Department</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            {/* Orthopedics */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow transition duration-200 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-indigo-50 p-2.5 rounded-lg w-fit">
                  {getDeptIcon('orthopedics')}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-slate-900">Orthopedic Robotics</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Joint replacements, sports reconstructive arthroscopy, and complex trauma protocols.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('departments')}
                className="mt-6 flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition group-hover:translate-x-1 cursor-pointer"
              >
                <span>View Department</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            {/* Pediatrics */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow transition duration-200 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-amber-50 p-2.5 rounded-lg w-fit">
                  {getDeptIcon('pediatrics')}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-slate-900">Pediatric Care & NICU</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Level III Neonatal intensive units, immunology screening, and child growth care plans.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('departments')}
                className="mt-6 flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition group-hover:translate-x-1 cursor-pointer"
              >
                <span>View Department</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            {/* Oncology */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow transition duration-200 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-sky-50 p-2.5 rounded-lg w-fit">
                  {getDeptIcon('oncology')}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-slate-900">Precision Oncology</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Highly targeted LINAC radiotherapy, precise molecular drug infusions & cancer rehab.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('departments')}
                className="mt-6 flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition group-hover:translate-x-1 cursor-pointer"
              >
                <span>View Department</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Tech and Axioms of Care */}
      <section className="bg-white py-16 lg:py-24 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-emerald-700 font-mono text-xs font-bold tracking-widest uppercase">
                Clinical Advancements
              </span>
              <h2 className="font-sans font-extrabold text-3xl text-slate-950 tracking-tight leading-snug">
                Why Medical Pioneers Choose Supreme Hospital
              </h2>
              <p className="text-slate-600 text-smLEADING-RELAXED">
                Our surgical suites feature continuous technological checks. We eliminate variable surgical margins to achieve maximum healing outcomes.
              </p>
              
              {/* Accolades checklist */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start">
                  <div className="bg-emerald-50 text-emerald-700 p-1 rounded-full mr-3 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-slate-900">Accidental Trauma Cover 24/7</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Dedicated shock wave beds and acute mechanical clot extractors.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-emerald-50 text-emerald-700 p-1 rounded-full mr-3 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-slate-900">Sterilized Airflow Modular Operative Cabinets</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Class 100 vertical laminar air ventilation ensures absolute zero pathogen markers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {valueAxioms.map((axiom, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex gap-4">
                    <div className="text-emerald-600 text-xs font-mono font-bold shrink-0 bg-white shadow-sm w-9 h-9 rounded-lg flex items-center justify-center border border-slate-100">
                      0{idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-sm text-slate-950">{axiom.title}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed">{axiom.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Patient Stories / Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-emerald-700 font-mono text-xs font-bold tracking-widest uppercase">
              Proven Outcomes
            </span>
            <h2 className="font-sans font-extrabold text-3xl text-slate-950 tracking-tight">
              Shared Patient Rehabilitation Stories
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Read how our dedicated multidisciplinary clinical approach has successfully restored pain-free lives to our patients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex text-amber-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <div>
                    <strong className="block text-xs text-slate-950 font-sans font-bold">{t.name}</strong>
                    <span className="block text-[10px] text-slate-400 font-mono tracking-wider">{t.procedure}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-450 bg-slate-50 px-2 py-0.5 rounded border border-slate-150">
                    {t.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Prompt banner to book */}
          <div className="bg-[#0f172a] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden shadow-lg mt-12">
            <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 opacity-10">
              <Award className="w-80 h-80" />
            </div>
            
            <div className="max-w-3xl space-y-6 relative z-10">
              <h3 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-white leading-tight">
                Secure Your Diagnostic Evaluation Today
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Connect directly with major international clinical consultants. No long waiting lines — use our standard integrated online medical appointments wizard now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={onBookNow}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-semibold px-6 py-3 rounded-xl transition shadow cursor-pointer text-center"
                >
                  Schedule Your Physical Visit
                </button>
                <button
                  onClick={() => setCurrentPage('doctors')}
                  className="bg-transparent hover:bg-slate-800 text-white border border-slate-700 font-sans text-xs font-semibold px-6 py-3 rounded-xl transition cursor-pointer text-center"
                >
                  Browse Active Consultants List
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
