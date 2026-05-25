/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Department, Doctor } from '../types';
import { DEPARTMENTS, DOCTORS } from '../data';
import { HeartPulse, Brain, Bone, Baby, Activity, HelpCircle, ArrowRight, ShieldCheck, Award, Star, Calendar } from 'lucide-react';

interface DepartmentsSectionProps {
  onBookWithDoctor: (doctorId: string, departmentId: string) => void;
}

export default function DepartmentsSection({ onBookWithDoctor }: DepartmentsSectionProps) {
  const [selectedDeptId, setSelectedDeptId] = React.useState<string>(DEPARTMENTS[0].id);

  const activeDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
  const activeDoctors = DOCTORS.filter(doc => doc.departmentId === selectedDeptId);

  const getIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className={`${className} text-rose-500`} />;
      case 'Brain':
        return <Brain className={`${className} text-teal-500`} />;
      case 'Bone':
        return <Bone className={`${className} text-indigo-500`} />;
      case 'Baby':
        return <Baby className={`${className} text-amber-500`} />;
      case 'Activity':
        return <Activity className={`${className} text-sky-500`} />;
      default:
        return <Activity className={`${className} text-emerald-500`} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-emerald-700 font-mono text-xs font-bold tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Supreme Clinical Services
          </span>
          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
            Specialized Centres of Excellence
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Select a clinical division below to explore in-depth treatment frameworks, modular diagnostic suites, and meet our senior medical directors.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-200 pb-2">
          {DEPARTMENTS.map((dept) => {
            const isSelected = dept.id === selectedDeptId;
            return (
              <button
                key={dept.id}
                id={`dept-tab-${dept.id}`}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`flex items-center space-x-2.5 px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white text-slate-600 hover:bg-slate-100/50 border border-slate-100'
                }`}
              >
                {getIcon(dept.iconName, 'w-4 h-4')}
                <span>{dept.name.split(' & ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Split Layout: Dept Details and Dept Doctors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Department Overview & Services */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-50 p-3 rounded-lg">
                  {getIcon(activeDept.iconName, 'w-8 h-8')}
                </div>
                <div>
                  <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-950 leading-tight">
                    {activeDept.name}
                  </h2>
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 block mt-0.5">
                    SUPREME SPECIALTY SERVICE
                  </span>
                </div>
              </div>
              
              <p className="text-slate-700 font-sans text-xs sm:text-sm leading-relaxed border-l-2 border-emerald-500 pl-4 py-1 italic">
                "{activeDept.description}"
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-sans font-bold text-xs tracking-wider uppercase text-slate-950">
                Division Framework Overview
              </h3>
              <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                {activeDept.overview}
              </p>
            </div>

            {/* Service Offerings */}
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-xs tracking-wider uppercase text-slate-950">
                Core Clinical Interventions & Procedures
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeDept.services.map((service, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <span className="bg-emerald-50 text-emerald-700 rounded-full w-4.5 h-4.5 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-slate-600 font-sans text-xs sm:text-sm leading-snug">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Statistics Panel */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-sans font-bold text-xs tracking-wider uppercase text-slate-950 mb-4">
                Hospital Clinical Metrics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {activeDept.stats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl text-center space-y-1">
                    <span className="block font-sans font-extrabold text-sm sm:text-base text-slate-950">
                      {stat.value}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-wide">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Department Specialists Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-sans font-bold text-xs tracking-wider uppercase text-slate-950">
                   Active Specialists Directory
                </h3>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                  {activeDoctors.length} Specialists
                </span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Consult with certified surgical and medical leads of our {activeDept.name.split(' & ')[0]} team.
              </p>

              {/* Consultants listing */}
              <div className="space-y-4 pt-2">
                {activeDoctors.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-white flex items-start gap-4"
                  >
                    {/* Unique generated doctor initial profile placeholder */}
                    <div className={`w-12 h-12 rounded-xl shrink-0 uppercase flex items-center justify-center font-sans font-extrabold text-sm tracking-widest text-[#0f172a] shadow-inner ${
                      doc.gender === 'male' ? 'bg-indigo-50 border border-indigo-100' : 'bg-rose-50 border border-rose-100'
                    }`}>
                      {doc.name.split(' ').map(n=>n[0]).join('')}
                    </div>

                    <div className="space-y-2 flex-grow">
                      <div>
                        <strong className="block text-xs sm:text-sm text-slate-900 font-sans font-bold leading-tight">
                          {doc.name}
                        </strong>
                        <span className="block text-[10px] text-emerald-700 font-mono tracking-wider mt-0.5">
                          {doc.role.split(' - ')[0]}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-mono">
                        <span>XP: <strong>{doc.experience} Years</strong></span>
                        <span>•</span>
                        <span className="flex items-center text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500 mr-1" />
                          <strong>{doc.rating}</strong>
                        </span>
                      </div>

                      <div className="pt-1 flex flex-wrap gap-1">
                        {doc.specialties.slice(0, 2).map((sp, idx) => (
                          <span key={idx} className="bg-slate-100 text-[9px] text-slate-600 px-1.5 py-0.5 rounded font-sans">
                            {sp}
                          </span>
                        ))}
                      </div>

                      <div className="pt-1 border-t border-slate-100/60 mt-2 flex justify-end">
                        <button
                          id={`dept-book-${doc.id}`}
                          onClick={() => onBookWithDoctor(doc.id, activeDept.id)}
                          className="flex items-center text-[10px] font-semibold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>Request Appointment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
