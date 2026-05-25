/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeartPulse, Menu, X, Phone, Clock, Calendar } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onQuickBook: () => void;
}

export default function Header({ currentPage, setCurrentPage, onQuickBook }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Our Doctors' },
    { id: 'booking', label: 'Book Appointment' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      {/* Main Navbar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo and Title */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-emerald-600 text-white p-2.5 rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-tight text-slate-900 block leading-tight">
                SUPREME
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-600 block">
                Superspeciality Hospital
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Tabs */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative font-sans text-sm font-medium py-2 transition-colors duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-emerald-700 font-semibold' 
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden lg:flex items-center">
            <button
              id="cta-book-header"
              onClick={onQuickBook}
              className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Instant Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Action Handlers */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={onQuickBook}
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 p-2 rounded-lg transition-colors cursor-pointer"
              title="Quick Book"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 hover:text-slate-950 p-1.5 focus:outline-none cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Portal */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-50 border-t border-slate-100 py-4 px-4 shadow-inner animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium block transition-colors ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 px-4">
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>Helpline: +91 7507716433, +91 7378738884, +91 8624920084</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
