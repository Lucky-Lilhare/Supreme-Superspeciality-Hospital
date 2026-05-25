/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import DepartmentsSection from './components/DepartmentsSection';
import DoctorsSection from './components/DoctorsSection';
import BookingSection from './components/BookingSection';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<string>('home');
  const [preselectedDoctorId, setPreselectedDoctorId] = React.useState<string | null>(null);
  const [preselectedDepartmentId, setPreselectedDepartmentId] = React.useState<string | null>(null);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickBook = () => {
    setPreselectedDoctorId(null);
    setPreselectedDepartmentId(null);
    handlePageChange('booking');
  };

  const handleBookWithDoctor = (doctorId: string, departmentId: string) => {
    setPreselectedDoctorId(doctorId);
    setPreselectedDepartmentId(departmentId);
    handlePageChange('booking');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 antialiased font-sans">
      
      {/* Upper Navigation System */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={handlePageChange} 
        onQuickBook={handleQuickBook} 
      />

      {/* Main Specialized Clinical Sections Viewport */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomeSection 
            setCurrentPage={handlePageChange} 
            onBookNow={handleQuickBook} 
          />
        )}
        
        {currentPage === 'about' && (
          <AboutSection 
            onBookNow={handleQuickBook} 
          />
        )}

        {currentPage === 'departments' && (
          <DepartmentsSection 
            onBookWithDoctor={handleBookWithDoctor} 
          />
        )}

        {currentPage === 'doctors' && (
          <DoctorsSection 
            onBookWithDoctor={handleBookWithDoctor} 
          />
        )}

        {currentPage === 'booking' && (
          <BookingSection 
            preselectedDoctorId={preselectedDoctorId} 
            preselectedDepartmentId={preselectedDepartmentId} 
            clearPreselections={() => {
              setPreselectedDoctorId(null);
              setPreselectedDepartmentId(null);
            }} 
          />
        )}
      </main>

      {/* Corporate Clinical Footer Block */}
      <Footer setCurrentPage={handlePageChange} />

    </div>
  );
}

