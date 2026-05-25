/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeartPulse, Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleDepartmentClick = (id: string) => {
    setCurrentPage('departments');
    // Scroll to the specific department might be nice, but simple navigation works!
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Hospital Mission & Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="bg-emerald-600 text-white p-2 rounded-lg">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-white block">
                SUPREME
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Supreme Superspeciality Hospital is a premier medical institution dedicated to high-precision diagnosis, modern therapeutics, and compassionate patient care.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-900/50 text-emerald-400 border border-emerald-800">
                JCI & JCI Accredited
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-sans font-semibold text-sm tracking-wider uppercase text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  Home Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  Clinical Legacy & About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('departments'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  Our Specialized Departments
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('doctors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  Medical Specialists Directory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer flex items-center text-emerald-400 font-medium"
                >
                  Book Instant Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Departments */}
          <div className="space-y-4">
            <h3 className="font-sans font-semibold text-sm tracking-wider uppercase text-white">
              Centres of Excellence
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleDepartmentClick('cardiology')} className="hover:text-white transition-colors cursor-pointer">
                  Cardiology & Thoracic Care
                </button>
              </li>
              <li>
                <button onClick={() => handleDepartmentClick('neurology')} className="hover:text-white transition-colors cursor-pointer">
                  Neurology & Brain Sciences
                </button>
              </li>
              <li>
                <button onClick={() => handleDepartmentClick('orthopedics')} className="hover:text-white transition-colors cursor-pointer">
                  Orthopedics & Joint Robotic Arthroplasty
                </button>
              </li>
              <li>
                <button onClick={() => handleDepartmentClick('pediatrics')} className="hover:text-white transition-colors cursor-pointer">
                  Pediatrics & Neonatal Care
                </button>
              </li>
              <li>
                <button onClick={() => handleDepartmentClick('oncology')} className="hover:text-white transition-colors cursor-pointer">
                  Oncology & Targeted Cancer Care
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Clinical Support */}
          <div className="space-y-4">
            <h3 className="font-sans font-semibold text-sm tracking-wider uppercase text-white">
              Hospital Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                <span>
                  Railway Chowki Road, Vivekanand Colony,<br />
                  Haddi Toli, Gondia,<br />
                  Maharashtra 441601
                </span>
              </div>
              <div className="flex items-start">
                <Phone className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                <span>
                  Helpline: +91 7507716433, +91 7378738884, +91 8624920084
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                <span className="font-mono">enquiry@supremehospital.org</span>
              </div>
              <div className="flex items-start">
                <Clock className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                <span>
                  Emergency Trauma & NICU:<br />
                  <strong className="text-red-400">Open 24 Hours / 365 Days</strong>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Styled Location Map Placeholder Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="border border-slate-800 bg-slate-950 p-6 rounded-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-white font-sans font-semibold text-sm">Physical Campus & Parking Coordinates</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Located directly off highway Exit 14. Dedicated 4-story patient and visitor parking facility is open next to the emergency wing, featuring EV fast chargers.
            </p>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs px-4 py-2.5 rounded-lg border border-slate-700 transition"
          >
            <span>Launch Satellite Navigation</span>
            <ExternalLink className="w-3.5 h-3.5 ml-2" />
          </a>
        </div>
      </div>

      {/* Bottom Intellectual Legal Bar */}
      <div className="bg-slate-950 border-t border-slate-900 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <span>&copy; 2026 Supreme Superspeciality Hospital. All rights reserved.</span>
          <div className="flex space-x-6">
            <span>Clinical Transparency Policy</span>
            <span>Terms of Care</span>
            <span>HIPAA Patient Privacy Act</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
