/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Doctor, Department } from '../types';
import { DOCTORS, DEPARTMENTS } from '../data';
import { Search, Filter, Star, Clock, Calendar, Award, GraduationCap, X, ChevronRight } from 'lucide-react';

interface DoctorsSectionProps {
  onBookWithDoctor: (doctorId: string, departmentId: string) => void;
}

export default function DoctorsSection({ onBookWithDoctor }: DoctorsSectionProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = React.useState('all');
  const [activeProfileModal, setActiveProfileModal] = React.useState<Doctor | null>(null);

  // Filter logic
  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = selectedDeptFilter === 'all' || doc.departmentId === selectedDeptFilter;

    return matchesSearch && matchesDept;
  });

  const getDeptName = (deptId: string) => {
    const dept = DEPARTMENTS.find(d => d.id === deptId);
    return dept ? dept.name.split(' & ')[0] : 'Superspeciality';
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Headers */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-emerald-700 font-mono text-xs font-bold tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Medical Directors Directory
            </span>
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight mt-2">
              Our Clinical Specialists
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
              Browse profiles, schedules, academic credentials, and book direct medical checkups with our board certified senior consultants.
            </p>
          </div>
        </div>

        {/* Directory Controls (Search + Filters) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          
          {/* Search bar */}
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
            <input
              type="text"
              placeholder="Search by specialty, clinician name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-xs font-sans focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>

          {/* Tab Selector Filters */}
          <div className="lg:col-span-8 flex flex-wrap gap-2 items-center">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wide mr-2 lg:block hidden">
              Filter Division:
            </span>
            <button
              onClick={() => setSelectedDeptFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition ${
                selectedDeptFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              All Specialists
            </button>
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptFilter(dept.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition ${
                  selectedDeptFilter === dept.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {dept.name.split(' & ')[0]}
              </button>
            ))}
          </div>

        </div>

        {/* Specialists Card Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div 
                key={doc.id} 
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow hover:border-slate-200 transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 space-y-5">
                  
                  {/* Doctor header card info */}
                  <div className="flex gap-4 items-start">
                    <div className={`w-14 h-14 rounded-xl shrink-0 uppercase flex items-center justify-center font-sans font-extrabold text-base tracking-widest text-slate-900 shadow-inner ${
                      doc.gender === 'male' ? 'bg-indigo-50 border border-indigo-100' : 'bg-rose-50 border border-rose-100'
                    }`}>
                      {doc.name.split(' ').map(n=>n[0]).join('')}
                    </div>

                    <div className="space-y-1">
                      <span className="inline-block text-[9px] font-mono tracking-wider bg-emerald-50 text-emerald-850 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase">
                        {getDeptName(doc.departmentId)} Division
                      </span>
                      <h3 className="font-sans font-bold text-sm leading-tight text-slate-950">
                        {doc.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-sans leading-relaxed block">
                        {doc.role.split(' - ')[0]}
                      </p>
                    </div>
                  </div>

                  {/* Rating, Experience numbers */}
                  <div className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-xl text-[11px] font-mono text-slate-600">
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 mr-1 translate-y-[-0.5px]" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal ml-1">({doc.reviewsCount} reviews)</span>
                    </span>
                    <span>Experience: <strong>{doc.experience} Yrs</strong></span>
                  </div>

                  {/* Specialties checklist */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase block">
                      Main Specialization Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {doc.specialties.map((spec, index) => (
                        <span key={index} className="bg-slate-100 text-[10px] text-slate-700 px-2 py-0.5 rounded-md font-sans leading-tight">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card CTA Footer Area */}
                <div className="bg-slate-50/50 p-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setActiveProfileModal(doc)}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-950 transition cursor-pointer"
                  >
                    View Clinician Profile
                  </button>
                  <button
                    id={`doc-book-card-${doc.id}`}
                    onClick={() => onBookWithDoctor(doc.id, doc.departmentId)}
                    className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
                  >
                    <span>Book Consult</span>
                    <ChevronRight className="w-4.5 h-4.5 ml-1" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="text-slate-400 text-sm">No specialists matched your current search fields.</div>
            <button
              onClick={() => { setSearchQuery(''); setSelectedDeptFilter('all'); }}
              className="bg-emerald-650 text-white font-sans text-xs px-4 py-2 rounded-lg cursor-pointer"
            >
              Clear Directory Queries
            </button>
          </div>
        )}

      </div>

      {/* Specialist Advanced Profile Modal Window */}
      {activeProfileModal && (
        <div className="fixed inset-0 z-50 bg-[#020617]/50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative pt-12 animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setActiveProfileModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 border border-slate-100 p-1.5 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal contents */}
            <div className="p-6 md:p-8 space-y-8">
              
              {/* Profile Intro header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 pb-6 border-b border-slate-100">
                <div className={`w-20 h-20 rounded-2xl shrink-0 uppercase flex items-center justify-center font-sans font-extrabold text-2xl tracking-widest text-slate-900 shadow-inner ${
                  activeProfileModal.gender === 'male' ? 'bg-indigo-50 border border-indigo-150' : 'bg-rose-50 border border-rose-150'
                }`}>
                  {activeProfileModal.name.split(' ').map(n=>n[0]).join('')}
                </div>

                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-mono tracking-wider font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-0.5 rounded-full uppercase">
                    {getDeptName(activeProfileModal.departmentId)} Centre of Excellence
                  </span>
                  <h2 className="font-sans font-extrabold text-xl text-slate-950">
                    {activeProfileModal.name}
                  </h2>
                  <p className="text-xs font-medium text-slate-500">
                    {activeProfileModal.role}
                  </p>
                </div>
              </div>

              {/* About Clinician paragraph */}
              <div className="space-y-2">
                <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-slate-950 flex items-center">
                  Overview & Biography
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {activeProfileModal.about}
                </p>
              </div>

              {/* Education (Academics) and Awards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Education list */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                  <h5 className="font-sans font-bold text-xs tracking-wider uppercase text-slate-950 flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-indigo-600" />
                    Medical Education Board
                  </h5>
                  <ul className="space-y-2">
                    {activeProfileModal.education.map((edu, idx) => (
                      <li key={idx} className="text-slate-600 text-xs leading-normal font-sans pl-2 border-l-2 border-slate-300">
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Awards */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                  <h5 className="font-sans font-bold text-xs tracking-wider uppercase text-slate-950 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-amber-500" />
                    Clinical Certifications & Awards
                  </h5>
                  <ul className="space-y-2">
                    {activeProfileModal.awards.map((awr, idx) => (
                      <li key={idx} className="text-slate-600 text-xs leading-normal font-sans pl-2 border-l-2 border-slate-300">
                        {awr}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Timetable / Working schedule layout */}
              <div className="space-y-3 pt-2">
                <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-slate-950 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-emerald-650" />
                  Weekly Consultation Schedules
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProfileModal.schedule.map((sch, i) => (
                    <div key={i} className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-center text-xs">
                      <strong className="block text-slate-900 font-sans tracking-wide">{sch.day}</strong>
                      <span className="block text-[10px] text-slate-500 font-mono mt-1">{sch.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions footer box */}
              <div className="pt-6 border-t border-slate-150 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs text-slate-500 font-mono">
                  NABH audited patient ratings: <strong className="text-slate-900">{activeProfileModal.rating}/5.0</strong>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveProfileModal(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Close Window
                  </button>
                  <button
                    id="modal-cta-book"
                    onClick={() => {
                      const savedModalDoc = activeProfileModal;
                      setActiveProfileModal(null);
                      onBookWithDoctor(savedModalDoc.id, savedModalDoc.departmentId);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    Schedule Direct Visit
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
