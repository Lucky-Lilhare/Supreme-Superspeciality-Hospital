/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Department, Doctor, Appointment } from '../types';
import { DEPARTMENTS, DOCTORS } from '../data';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, ArrowRight, ArrowLeft, Trash2, ShieldCheck, Ticket, Download, Printer, LogIn, UserPlus, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface BookingSectionProps {
  preselectedDoctorId?: string | null;
  preselectedDepartmentId?: string | null;
  clearPreselections?: () => void;
}

export default function BookingSection({ 
  preselectedDoctorId, 
  preselectedDepartmentId,
  clearPreselections 
}: BookingSectionProps) {
  
  // Custom Firebase Authentication Context
  const { user, userProfile, loading: authLoading, signIn, signUp, signInGoogle, logout } = useAuth();
  
  // Firestore state
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [dbLoading, setDbLoading] = React.useState(false);

  // Authentication mode states
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = React.useState('');
  const [authPassword, setAuthPassword] = React.useState('');
  const [authName, setAuthName] = React.useState('');
  const [authError, setAuthError] = React.useState('');
  const [authActionLoading, setAuthActionLoading] = React.useState(false);
  
  // Active booking wizard states
  const [step, setStep] = React.useState(1);
  const [selectedDeptId, setSelectedDeptId] = React.useState('');
  const [selectedDocId, setSelectedDocId] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState('');
  
  // Patient details state
  const [patientName, setPatientName] = React.useState('');
  const [patientPhone, setPatientPhone] = React.useState('');
  const [patientEmail, setPatientEmail] = React.useState('');
  const [symptoms, setSymptoms] = React.useState('');

  const [wizardCompletedCode, setWizardCompletedCode] = React.useState<string | null>(null);
  const [wizardError, setWizardError] = React.useState<string | null>(null);

  // Load bookings from Firestore when user changes
  React.useEffect(() => {
    if (!user) {
      setAppointments([]);
      return;
    }
    
    const fetchBookings = async () => {
      setDbLoading(true);
      try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(
          bookingsRef, 
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetched: Appointment[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push(doc.data() as Appointment);
        });
        
        // Sort chronologically (descending by createdAt)
        fetched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAppointments(fetched);
      } catch (e) {
        console.error("Failed to load appointments from Firestore", e);
      } finally {
        setDbLoading(false);
      }
    };
    
    fetchBookings();
  }, [user]);

  // Pre-fill Patient details based on authenticated profile
  React.useEffect(() => {
    if (user) {
      setPatientName(user.displayName || userProfile?.name || '');
      setPatientEmail(user.email || '');
    }
  }, [user, userProfile]);

  // Sync pre-selected doctor or department from navigation links
  React.useEffect(() => {
    if (preselectedDepartmentId) {
      setSelectedDeptId(preselectedDepartmentId);
    }
    if (preselectedDoctorId) {
      setSelectedDocId(preselectedDoctorId);
      // Ensure the department of that doctor is selected too!
      const doc = DOCTORS.find(d => d.id === preselectedDoctorId);
      if (doc) {
        setSelectedDeptId(doc.departmentId);
      }
    }
    if (preselectedDepartmentId || preselectedDoctorId) {
      // Direct user to booking main page step 1
      setStep(1);
    }
  }, [preselectedDoctorId, preselectedDepartmentId]);

  // Derived arrays
  const filteredDoctors = DOCTORS.filter(d => d.departmentId === selectedDeptId);
  const selectedDoctorObj = DOCTORS.find(d => d.id === selectedDocId);
  const selectedDeptObj = DEPARTMENTS.find(d => d.id === selectedDeptId);

  // Check the weekday of the selected date and return matching doctor schedules
  const getSelectedDayDetails = () => {
    if (!selectedDate || !selectedDoctorObj) return null;
    
    const parsedDate = new Date(selectedDate);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdayName = daysOfWeek[parsedDate.getDay()];
    
    const sched = selectedDoctorObj.schedule.find(s => s.day.toLowerCase() === weekdayName.toLowerCase());
    return {
      weekdayName,
      isAvailable: !!sched,
      slots: sched ? sched.slots : [],
      hours: sched ? sched.hours : ''
    };
  };

  const dayDetails = getSelectedDayDetails();

  // Handle steps validations and controls
  const handleNextStep1 = () => {
    if (!selectedDeptId || !selectedDocId) {
      setWizardError('Please select both a Clinical Department and a Specialist Physician before continuing.');
      return;
    }
    setWizardError(null);
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!selectedDate) {
      setWizardError('Please select a valid consultation date.');
      return;
    }
    if (!selectedTimeSlot) {
      setWizardError('Please select an active consultation time slot.');
      return;
    }
    setWizardError(null);
    setStep(3);
  };

  // Auth processing hooks
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthActionLoading(true);

    try {
      if (authMode === 'signin') {
        await signIn(authEmail, authPassword);
      } else {
        if (!authName.trim()) {
          setAuthError('Please enter your full name.');
          setAuthActionLoading(false);
          return;
        }
        await signUp(authEmail, authName, authPassword);
      }
    } catch (error: any) {
      console.error(error);
      let errorMsg = 'An authentication error occurred. Please verify your details.';
      if (error?.code === 'auth/invalid-credential' || error?.code === 'auth/wrong-password' || error?.code === 'auth/user-not-found') {
        errorMsg = 'Incorrect email or password. Please try again.';
      } else if (error?.code === 'auth/email-already-in-use') {
        errorMsg = 'This email address is already registered as a patient.';
      } else if (error?.code === 'auth/weak-password') {
        errorMsg = 'The password should be at least 6 characters.';
      } else if (error?.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
      }
      setAuthError(errorMsg);
    } finally {
      setAuthActionLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthActionLoading(true);
    try {
      await signInGoogle();
    } catch (error: any) {
      console.error(error);
      if (error?.code !== 'auth/popup-closed-by-user') {
        setAuthError('Failed to sign in with Google. Please try again or create an email account.');
      }
    } finally {
      setAuthActionLoading(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWizardError(null);
    if (!user) {
      setWizardError('Please authenticate to submit your consultation booking.');
      return;
    }
    if (!patientName.trim()) {
      setWizardError('Please enter the patient\'s full name.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.trim().length < 8) {
      setWizardError('Please enter a valid patient telephone/mobile number (minimum 8 characters).');
      return;
    }
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      setWizardError('Please enter a valid patient email address.');
      return;
    }

    // Creating booking
    const ticketCode = `SSH-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`;
    const newAppointment: Appointment = {
      id: ticketCode,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim(),
      departmentId: selectedDeptId,
      doctorId: selectedDocId,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      symptoms: symptoms || 'Routine General Consultation Check',
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
      userId: user.uid
    };

    try {
      await setDoc(doc(db, 'bookings', ticketCode), newAppointment);
      setAppointments(prev => [newAppointment, ...prev]);

      // Complete wizard
      setWizardCompletedCode(ticketCode);
      setStep(4);

      if (clearPreselections) {
        clearPreselections();
      }
    } catch (err: any) {
      console.error("Booking submission error: ", err);
      const systemError = err instanceof Error ? err.message : String(err);
      setWizardError(`Clinical server synchronization failed: ${systemError}. Please verify details and try again.`);
      try {
        handleFirestoreError(err, OperationType.WRITE, `bookings/${ticketCode}`);
      } catch (logErr) {
        // Suppress secondary throw so thread execution is not completely halted
        console.warn("Firestore error diagnostic recorded.", logErr);
      }
    }
  };

  const handleCancelAppointment = async (id: string) => {
    let confirmDeletion = false;
    try {
      confirmDeletion = confirm('Are you sure you want to cancel this scheduled appointment? This action is permanent.');
    } catch (e) {
      // In case native confirm is blocked inside iframe sandbox
      confirmDeletion = true; 
    }

    if (confirmDeletion) {
      try {
        const docRef = doc(db, 'bookings', id);
        await setDoc(docRef, { status: 'Cancelled' }, { merge: true });
        
        const updated = appointments.map(app => 
          app.id === id ? { ...app, status: 'Cancelled' as const } : app
        );
        setAppointments(updated);
      } catch (err: any) {
        console.error("Cancel appointment error: ", err);
        setWizardError("Error: cancellation request failed. Please try again.");
        try {
          handleFirestoreError(err, OperationType.WRITE, `bookings/${id}`);
        } catch (logErr) {
          console.warn("Firestore warning logged", logErr);
        }
      }
    }
  };

  const handleResetWizard = () => {
    setWizardError(null);
    setStep(1);
    setSelectedDeptId('');
    setSelectedDocId('');
    setSelectedDate('');
    setSelectedTimeSlot('');
    setPatientName(user?.displayName || '');
    setPatientPhone('');
    setPatientEmail(user?.email || '');
    setSymptoms('');
    setWizardCompletedCode(null);
  };

  // Helper getters
  const getDocNameStr = (id: string) => {
    const d = DOCTORS.find(doc => doc.id === id);
    return d ? d.name : 'Unknown Specialist';
  };

  const getDeptNameStr = (id: string) => {
    const d = DEPARTMENTS.find(dep => dep.id === id);
    return d ? d.name.split(' & ')[0] : 'Unknown Clinical Team';
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner Section */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-emerald-700 font-mono text-xs font-bold tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Smart Consultation Desk
          </span>
          <h1 className="font-sans font-extrabold text-3xl text-slate-950 tracking-tight">
            Schedule Clinical Consults
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Configure dates, choose available specialists, and secure your digital consultation reservation in five clicks.
          </p>
        </div>

        {/* Main Grid: Wizard on Left/Full, Appointments tracker on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Appointment Booking Wizard Box */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
            
            {authLoading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                <span className="text-xs text-slate-500 font-mono">Verifying patient credentials...</span>
              </div>
            ) : !user ? (
              <div className="space-y-6">
                <div className="text-center max-w-md mx-auto space-y-3">
                  <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-2xl w-fit mx-auto border border-emerald-100/50">
                    <LogIn className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                    Secure Patient Portal
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Please authenticate your patient account below to coordinate medical specialist consults and monitor active slot bookings securely.
                  </p>
                </div>

                {/* Tabs to toggle mode */}
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200/60 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signin');
                      setAuthError('');
                    }}
                    className={`flex-1 flex items-center justify-center space-x-2 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition cursor-pointer ${
                      authMode === 'signin'
                        ? 'bg-white text-slate-950 shadow-sm border border-slate-200/50'
                        : 'text-slate-500 hover:text-slate-850'
                    }`}
                  >
                    <span>Sign In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setAuthError('');
                    }}
                    className={`flex-1 flex items-center justify-center space-x-2 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition cursor-pointer ${
                      authMode === 'signup'
                        ? 'bg-white text-slate-950 shadow-sm border border-slate-200/50'
                        : 'text-slate-500 hover:text-slate-850'
                    }`}
                  >
                    <span>Create Account</span>
                  </button>
                </div>

                {authError && (
                  <div className="max-w-xs sm:max-w-md mx-auto p-3 rounded-xl bg-red-50 border border-red-100 flex items-start space-x-2 text-xs text-red-700 font-sans">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="max-w-xs sm:max-w-md mx-auto space-y-3.5 pt-1">
                  {authMode === 'signup' && (
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">
                        Full Patient Name:
                      </label>
                      <input
                        type="text"
                        placeholder="Johnathan Doe"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-sans focus:outline-0 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-sans focus:outline-0 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">
                      Secret Password:
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-sans focus:outline-0 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authActionLoading}
                    className="w-full py-2.5 bg-emerald-650 bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs font-semibold rounded-lg shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer disabled:bg-emerald-650/50 disabled:cursor-not-allowed"
                  >
                    {authActionLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>{authMode === 'signin' ? 'Sign In' : 'Sign Up & Create Profile'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="relative max-w-xs sm:max-w-md mx-auto py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-mono text-slate-400">
                    <span className="bg-white px-3">or</span>
                  </div>
                </div>

                <div className="max-w-xs sm:max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={authActionLoading}
                    className="w-full py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-sans text-xs font-semibold rounded-lg shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 0, 0)">
                        <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.57h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4C21.68,11.77 21.56,11.41 21.35,11.1z" fill="#4285F4" />
                        <path d="M12,20.9c2.4,0 4.4,-0.8 5.88,-2.18l-3.3,-2.57c-0.9,0.6 -2.07,0.95 -3.3,0.95c-2.54,0 -4.68,-1.72 -5.44,-4.03H2.33v2.66C3.81,18.66 7.64,20.9 12,20.9z" fill="#34A853" />
                        <path d="M6.56,13.07c-0.2,-0.6 -0.3,-1.23 -0.3,-1.87s0.1,-1.27 0.3,-1.87V6.67H2.33c-0.84,1.68 -1.33,3.58 -1.33,5.53s0.49,3.85 1.33,5.53L6.56,13.07z" fill="#FBBC05" />
                        <path d="M12,5.92c1.3,0 2.48,0.45 3.4,1.32l2.55,-2.55C16.4,3.33 14.4,2.5 12,2.5c-4.36,0 -8.19,2.24 -9.67,5.53l4.23,3.28C7.32,7.64 9.46,5.92 12,5.92z" fill="#EA4335" />
                      </g>
                    </svg>
                    <span>Verify identity with Google</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Premium user identity tag line */}
                <div className="flex justify-between items-center bg-emerald-50/25 p-3 px-4 rounded-xl border border-emerald-100/50 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-600 text-white font-bold w-7.5 h-7.5 rounded-full flex items-center justify-center text-[10px] uppercase shadow-sm">
                      {(user.displayName || userProfile?.name || 'P')[0]}
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-wider font-semibold text-slate-500 block">Authenticated Patient:</span>
                      <strong className="text-xs text-slate-900 block font-semibold leading-none">{user.displayName || userProfile?.name}</strong>
                    </div>
                  </div>
                  <button 
                    onClick={logout} 
                    className="text-[9px] font-mono font-bold uppercase text-slate-500 border border-slate-200 bg-white hover:bg-slate-50 transition px-2.5 py-1 rounded-lg cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Steps Progress Visualizer */}
                {step < 4 && (
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                
                {/* Step 1 Pill */}
                <div className="flex items-center space-x-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    1
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans font-semibold text-slate-700 hidden sm:inline">
                    Specialist Selection
                  </span>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-300" />

                {/* Step 2 Pill */}
                <div className="flex items-center space-x-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    2
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans font-semibold text-slate-700 hidden sm:inline">
                    Schedule & Timing
                  </span>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-300" />

                {/* Step 3 Pill */}
                <div className="flex items-center space-x-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    3
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans font-semibold text-slate-700 hidden sm:inline">
                    Patient Details
                  </span>
                </div>

              </div>
            )}

            {/* Wizard Alerts Banner */}
            {wizardError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100/80 flex items-start space-x-3 text-red-800 animate-in fade-in slide-in-from-top-1 duration-200">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-xs font-sans font-bold">Booking Application Error</strong>
                  <span className="block text-[11px] leading-relaxed font-sans text-red-700">{wizardError}</span>
                </div>
              </div>
            )}

            {/* WIZARD MOUNTED SCREENS */}
            
            {/* Step 1: Department & Doctor */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 border-l-2 border-emerald-500 pl-3">
                    STEP 1: Identify Clinical Division & Specialist
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">Select the therapeutic segment of your health concern, followed by your preferred physician.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Select Department */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-slate-500 font-bold">
                      1. Specialty Department:
                    </label>
                    <select
                      id="select-dept"
                      value={selectedDeptId}
                      onChange={(e) => {
                        setSelectedDeptId(e.target.value);
                        setSelectedDocId(''); // Clear doctor since department shifted
                      }}
                      className="w-full p-3 rounded-lg border border-slate-200 text-xs sm:text-sm font-sans focus:outline-0 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50"
                    >
                      <option value="">-- Choose Specialization --</option>
                      {DEPARTMENTS.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Doctor */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-slate-500 font-bold">
                      2. Consult Specialist:
                    </label>
                    <select
                      id="select-doctor"
                      value={selectedDocId}
                      onChange={(e) => setSelectedDocId(e.target.value)}
                      disabled={!selectedDeptId}
                      className="w-full p-3 rounded-lg border border-slate-200 text-xs sm:text-sm font-sans focus:outline-0 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {!selectedDeptId ? 'Please select a department first...' : '-- Select Active Doctor --'}
                      </option>
                      {filteredDoctors.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name} ({doc.role.split(' - ')[0]})</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Selected Doctor Summary Card */}
                {selectedDoctorObj && (
                  <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-600 text-white font-extrabold w-8 h-8 rounded-lg flex items-center justify-center text-[10px] tracking-wider shrink-0 uppercase">
                        {selectedDoctorObj.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <strong className="block text-xs sm:text-sm text-slate-900 font-sans font-semibold">
                          {selectedDoctorObj.name}
                        </strong>
                        <span className="block text-[10px] text-slate-500 font-mono mt-0.5">
                          {selectedDoctorObj.role}
                        </span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-600 leading-relaxed font-sans">
                      <strong>Clinician Profile Segment:</strong> {selectedDoctorObj.about.slice(0, 150)}...
                    </div>
                  </div>
                )}

                {/* Next CTA */}
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    id="wizard-step1-next"
                    onClick={handleNextStep1}
                    className="flex items-center justify-center bg-slate-900 hover:bg-slate-850 text-white font-sans text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition cursor-pointer"
                  >
                    <span>Configure Date & Slots</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>

              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 border-l-2 border-emerald-500 pl-3">
                    STEP 2: Choose Date & Scheduled Check-In Time
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">Select your calendar day and review physician timing modules.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Select Date */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-slate-500 font-bold flex items-center">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                      1. Checkup Date:
                    </label>
                    <input
                      type="date"
                      id="booking-date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedTimeSlot(''); // Clear slot
                      }}
                      min={new Date().toISOString().split('T')[0]} // Prevents scheduling in history
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-sans focus:outline-0 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>

                  {/* Doctor schedule hints info */}
                  <div className="space-y-2 font-sans bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                    <strong className="block text-slate-950 font-semibold uppercase tracking-wider text-[10px] font-mono mb-2">
                      Doctor Clinical Schedule:
                    </strong>
                    {selectedDoctorObj?.schedule.map((sch, i) => (
                      <div key={i} className="flex justify-between py-1 border-b border-slate-100/60 last:border-0">
                        <span className="font-semibold text-slate-700">{sch.day}</span>
                        <span className="text-slate-500 font-mono tracking-tight">{sch.hours}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Slots selection */}
                {selectedDate && (
                  <div className="space-y-3 pt-2">
                    
                    {/* Schedule availability alert status */}
                    <div className="flex items-center space-x-2 text-[11px] font-mono">
                      <span>Parsed Weekday: <strong className="text-slate-900 uppercase">{dayDetails?.weekdayName}</strong></span>
                      <span>•</span>
                      {dayDetails?.isAvailable ? (
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          Active Timetable Registered
                        </span>
                      ) : (
                        <span className="text-amber-800 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                          Not Scheduled on this day
                        </span>
                      )}
                    </div>

                    <label className="block text-xs font-mono uppercase text-slate-500 font-bold flex items-center pt-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                      2. Available Booking Slots:
                    </label>

                    {dayDetails?.isAvailable ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {dayDetails.slots.map((slot) => {
                          const isSelectedSlot = slot === selectedTimeSlot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`p-2.5 rounded-lg font-mono text-xs font-semibold cursor-pointer border text-center transition ${
                                isSelectedSlot
                                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/20 text-xs text-amber-800 space-y-2">
                        <span>
                          {selectedDoctorObj?.name} does not hold standard clinical consultations on <strong>{dayDetails?.weekdayName || 'this day'}</strong>. Please choose another weekday (e.g., matching the days noted above).
                        </span>
                        <div className="pt-2 font-mono text-[10px]">
                          Backup slots are not recommended to preserve surgical quality.
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* Wizard controls */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center text-xs font-semibold text-slate-600 hover:text-slate-950 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back to Doctor Selection</span>
                  </button>

                  <button
                    id="wizard-step2-next"
                    onClick={handleNextStep2}
                    disabled={!selectedTimeSlot}
                    className="flex items-center justify-center bg-slate-900 hover:bg-slate-850 text-white font-sans text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  >
                    <span>Patient Information</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>

              </div>
            )}

            {/* Step 3: Patient Form details */}
            {step === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div>
                  <h3 className="font-sans font-bold text-sm tracking-wide text-slate-900 border-l-2 border-emerald-500 pl-3">
                    STEP 3: Provide Patient & Symptom Information
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">Please supply accurate contact coordinates for JCI medical registration metrics.</p>
                </div>

                <div className="space-y-4">
                  
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase text-slate-500 font-bold flex items-center">
                        <User className="w-3.5 h-3.5 text-emerald-650 mr-1.5" />
                        Patient Full Name:
                      </label>
                      <input
                        type="text"
                        placeholder="Johnathan Doe"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-sans focus:outline-0 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase text-slate-500 font-bold flex items-center">
                        <Phone className="w-3.5 h-3.5 text-emerald-650 mr-1.5" />
                        Patient Phone Mobile:
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 555-0199"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-sans focus:outline-0 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Web communications Email info */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-slate-500 font-bold flex items-center">
                      <Mail className="w-3.5 h-3.5 text-emerald-650 mr-1.5" />
                      Email Address:
                    </label>
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-sans focus:outline-0 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>

                  {/* Reasons & symptom details text box */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-slate-500 font-bold flex items-center">
                      <FileText className="w-3.5 h-3.5 text-emerald-650 mr-1.5" />
                      Symptoms / Primary Medical Concerns:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly notes symptoms, medication allergy checks, any past treatment references..."
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-sans focus:outline-0 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-slate-50/50 resize-y"
                    />
                  </div>

                </div>

                {/* Safety compliance alerts segment */}
                <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-normal">
                    By submitting registration metrics, you authorize Supreme Superspeciality check-in desks to compile security charts in compliance with worldwide HIPAA Patient privacy provisions.
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center text-xs font-semibold text-slate-600 hover:text-slate-950 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back to Date Selection</span>
                  </button>

                  <button
                    id="submit-booking-wizard"
                    type="submit"
                    className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-semibold px-6 py-3 rounded-lg shadow-sm transition cursor-pointer"
                  >
                    <span>Finalize Consultation booking</span>
                  </button>
                </div>

              </form>
            )}

            {/* Step 4: Complete Confirmation Ticket Slip representation */}
            {step === 4 && wizardCompletedCode && (
              <div className="space-y-8 animate-in zoom-in-95 duration-200">
                
                <div className="text-center space-y-2">
                  <div className="bg-emerald-550/10 text-emerald-600 p-3 rounded-full w-fit mx-auto">
                    <CheckCircle className="w-8 h-8 mx-auto text-emerald-600" />
                  </div>
                  <h3 className="font-sans font-extrabold text-xl text-slate-900">
                    Consultation Registration Confirmed!
                  </h3>
                  <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed max-w-sm mx-auto">
                    Your physical audit visit reference ticket has been successfully allocated into the supreme patient directory.
                  </p>
                </div>

                {/* Printable digital ticket visual receipt styling layout */}
                <div className="bg-slate-900 text-slate-250 p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-slate-850 space-y-6">
                  
                  {/* Decorative digital cutouts to look like a actual thermal ticket */}
                  <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full translate-y-[-50%]" />
                  <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full translate-y-[-50%]" />
                  
                  {/* Receipt Header info */}
                  <div className="flex justify-between items-center border-b border-dashed border-slate-800 pb-5">
                    <div>
                      <strong className="block text-sm text-white font-sans">SUPREME SPECIALTY</strong>
                      <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">Appointment Ticket Receipt</span>
                    </div>
                    <Ticket className="w-6 h-6 text-emerald-500" />
                  </div>

                  {/* Core ticket grid info details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-slate-300">
                    <div>
                      <span className="text-[9px] text-slate-500 font-mono tracking-wider block uppercase">Registration Code:</span>
                      <strong className="text-sm font-bold text-white font-mono tracking-wider">{wizardCompletedCode}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 font-mono tracking-wider block uppercase">Patient Registree:</span>
                      <strong className="text-slate-150 font-semibold">{patientName}</strong>
                    </div>
                    <div className="pt-2">
                      <span className="text-[9px] text-slate-500 font-mono tracking-wider block uppercase">Specialist Consultant:</span>
                      <strong className="text-slate-150 font-semibold">{getDocNameStr(selectedDocId)}</strong>
                    </div>
                    <div className="pt-2">
                      <span className="text-[9px] text-slate-500 font-mono tracking-wider block uppercase">Division Location:</span>
                      <strong className="text-slate-150 font-semibold">{getDeptNameStr(selectedDeptId)} Dept</strong>
                    </div>
                    <div className="pt-2">
                      <span className="text-[9px] text-slate-500 font-mono tracking-wider block uppercase">Scheduled Date & Day:</span>
                      <strong className="text-slate-150 font-semibold">{selectedDate}</strong>
                    </div>
                    <div className="pt-2">
                      <span className="text-[9px] text-slate-500 font-mono tracking-wider block uppercase">Reserved Hour & Slot:</span>
                      <strong className="text-slate-150 font-semibold">{selectedTimeSlot}</strong>
                    </div>
                  </div>

                  {/* Symptoms & directions reminder footer */}
                  <div className="pt-5 border-t border-dashed border-slate-800 space-y-2">
                    <p className="text-[10px] text-slate-400 leading-normal">
                      <strong>Check-In Directives:</strong> Please arrive on our physical campus exactly 15 minutes prior to your allocated slot. Carry your past clinical diagnostics maps and valid insurance policy e-cards to the main reception under the designated division.
                    </p>
                  </div>

                  {/* Barcode Mock segment */}
                  <div className="pt-2 flex flex-col items-center">
                    <div className="h-10 w-full bg-slate-800 rounded opacity-60 flex items-center justify-around overflow-hidden px-8 select-none">
                      {Array.from({ length: 44 }).map((_, i) => (
                        <div key={i} className="bg-slate-300 h-full shrink-0" style={{ width: `${(i % 3 === 0 ? 3 : (i % 2 === 0 ? 1 : 2))}px` }} />
                      ))}
                    </div>
                    <span className="text-[8px] text-slate-500 font-mono uppercase tracking-widest mt-1.5">*SSH-REGISTRATION-CODE-OK*</span>
                  </div>

                </div>

                {/* Action button options */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex items-center text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    <Printer className="w-4.5 h-4.5 mr-2" />
                    <span>Print Ticket Receipt</span>
                  </button>
                  <button
                    onClick={handleResetWizard}
                    className="flex items-center text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    <span>Schedule Another Appointment</span>
                  </button>
                </div>

              </div>
            )}
            </>)}

          </div>

          {/* Active Appointments Tracker List */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-sans font-bold text-xs tracking-wider uppercase text-slate-950">
                Patient Account Desk
              </h3>
              <span className="text-[10px] font-mono font-bold text-indigo-800 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                {appointments.length} Consults Scheduled
              </span>
            </div>
            
            <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
              Review saved clinical consultation reservations compiled on this secure account.
            </p>

            <div className="space-y-4 pt-2">
              {!user ? (
                <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 text-slate-400 space-y-20 flex flex-col items-center py-12">
                  <ShieldAlert className="w-7 h-7 text-slate-300" />
                  <p className="text-[10.5px] leading-relaxed font-sans px-2">
                    Identity authentication required. Sign in or register in the Secure Patient Portal to retrieve and review your active scheduled clinical consultations.
                  </p>
                </div>
              ) : dbLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-2">
                  <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                  <span className="text-[10px] text-slate-400 font-mono">Syncing database ledger...</span>
                </div>
              ) : appointments.length > 0 ? (
                appointments.map((app) => (
                  <div 
                    key={app.id} 
                    className={`p-4 rounded-xl border text-xs space-y-3 transition-all relative ${
                      app.status === 'Cancelled'
                        ? 'bg-slate-50/50 border-slate-100 opacity-60'
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    
                    {/* Header info strip */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-0.5 max-w-[80%]">
                        <strong className="block font-bold font-mono tracking-wider text-slate-900">{app.id}</strong>
                        <span className="block text-[10px] text-slate-400 font-sans">Reserved: {app.patientName}</span>
                      </div>
                      
                      {app.status === 'Scheduled' ? (
                        <span className="text-[9px] font-mono font-semibold text-emerald-850 bg-emerald-100/50 px-2 py-0.5 rounded border border-emerald-200 uppercase shrink-0">
                          Active
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono font-semibold text-red-800 bg-red-50/50 px-2 py-0.5 rounded border border-red-100 uppercase shrink-0">
                          Cancelled
                        </span>
                      )}
                    </div>

                    {/* Meta clinical doctor and schedules links */}
                    <div className="space-y-1 font-sans text-slate-600 border-t border-slate-100/70 pt-2 text-[11px]">
                      <div>Doctor: <strong className="text-slate-900">{getDocNameStr(app.doctorId)}</strong></div>
                      <div>Specialty: <span>{getDeptNameStr(app.departmentId)}</span></div>
                      <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono mt-1">
                        <Calendar className="w-3 h-3 text-emerald-600" />
                        <span>{app.date}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>{app.timeSlot}</span>
                      </div>
                    </div>

                    {/* Actions box to Cancel */}
                    {app.status === 'Scheduled' && (
                      <div className="flex justify-end pt-1 border-t border-slate-100/40">
                        <button
                          onClick={() => handleCancelAppointment(app.id)}
                          className="flex items-center text-red-650 hover:text-red-750 font-semibold text-[9px] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" />
                          <span>Cancel Consult</span>
                        </button>
                      </div>
                    )}

                  </div>
                ))
              ) : (
                <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 text-slate-400 space-y-2">
                  <Ticket className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-[10px] leading-normal">
                    No active digital appointments registered. Use our standard Wizard panel to finalize your consultation.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
