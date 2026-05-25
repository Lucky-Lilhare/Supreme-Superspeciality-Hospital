/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DoctorSchedule {
  day: string;
  hours: string;
  slots: string[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  schedule: DoctorSchedule[];
  about: string;
  awards: string[];
  education: string[];
  gender: 'male' | 'female';
}

export interface DepartmentStat {
  label: string;
  value: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  iconName: string; // Used to map to Lucide icons
  overview: string;
  services: string[];
  stats: DepartmentStat[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  departmentId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  symptoms: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt: string;
  userId?: string;
  notes?: string;
}
