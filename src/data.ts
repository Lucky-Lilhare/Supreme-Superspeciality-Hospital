/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Department, Doctor } from './types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology & Cardiothoracic',
    description: 'Comprehensive expert cardiac care utilizing advanced diagnostics, imaging, minimally-invasive surgeries, and rehabilitation.',
    iconName: 'HeartPulse',
    overview: 'Our Cardiology Division is a world-class center of excellence. Equipped with state-of-the-art flat-panel catheterization labs, cardiac MRI, and modular surgical theatres, we deliver immediate care for cardiac emergencies, bypass operations, valve therapies, and structural heart procedures.',
    services: [
      'Coronary Angioreg & Angioplasty (PCI)',
      'Minimally Invasive Coronary Artery Bypass',
      'Structural Heart and TAVR Therapy',
      'Electrophysiology & Pacemaker Implantation',
      '24/7 Acute Coronary Care Unit (CCU)'
    ],
    stats: [
      { label: 'Cardiac Procedures', value: '12,500+' },
      { label: 'Success Ratio', value: '99.2%' },
      { label: 'Dedicated CCU Beds', value: '32' }
    ]
  },
  {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    description: 'Comprehensive diagnosis and treatment for acute stroke, brain tumors, spine pathology, neuropathies, and epilepsy.',
    iconName: 'Brain',
    overview: 'The Neurosciences institute at Supreme provides advanced diagnostic modalities and treatment options for neurological wellness. Featuring high-precision neuro-navigation systems, digital neuro-monitors, and microsurgery setups, we offer comprehensive neurological care.',
    services: [
      'Endovascular Mechanical Thrombectomy',
      'Stereotactic Brain Tumor Resection',
      'Comprehensive Epilepsy Management',
      'Advanced Spine Surgery & Disc Replacements',
      'Neuromuscular Disease Assessment'
    ],
    stats: [
      { label: 'Neuro Surgeries/Yr', value: '1,800+' },
      { label: 'Stroke Sync Time', value: '<35m' },
      { label: 'Neuro ICU Beds', value: '20' }
    ]
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Care',
    description: 'Expertise in robotic joint replacement, clinical sports medicine, arthroscopy, spine rehab, and complex trauma.',
    iconName: 'Bone',
    overview: 'Our Orthopedics team is dedicated to restoring maximum mobility and quality of life. From robotic total hip and knee reconstructions to complex reconstructive and sports trauma surgeries, we utilize modern minimally invasive technologies for rapid recovery.',
    services: [
      'Robotic Assist Total Knee Arthroplasty',
      'Unicondylar and Total Hip Replacement',
      'Arthroscopic ACL & Meniscal Reconstructed repair',
      'Complex Pelvi-Acetabular Trauma Management',
      'Spinal Stabilization and Decompression'
    ],
    stats: [
      { label: 'Joint Replacements', value: '8,400+' },
      { label: 'Rehab Success', value: '97.8%' },
      { label: 'Robotic Suites', value: '2' }
    ]
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatology',
    description: 'Specialized comprehensive physical, developmental, and critical care for newborns, infants, and children.',
    iconName: 'Baby',
    overview: 'The Institute of Child Health at Supreme covers pediatric care across all age brackets. Supported by a state-of-the-art level III Neonatal Intensive Care Unit (NICU) and Pediatric ICU, we address acute and chronic pediatric illness with unparalleled medical experience.',
    services: [
      'Level III Neonatal Intensive Care Unit (NICU)',
      'Pediatric Cardiology and Cardiac Surgeries',
      'Developmental Screening and Intervention',
      'Comprehensive Pediatric Immunology & Allergy Clinic',
      'Pediatric Emergency and Trauma Care'
    ],
    stats: [
      { label: 'NICU Care Beds', value: '24' },
      { label: 'Pediatric Specialists', value: '14' },
      { label: 'Newborn Milestones', value: '10,000+' }
    ]
  },
  {
    id: 'oncology',
    name: 'Oncology & Cancer Care',
    description: 'Multi-disciplinary precise approach targeting tumor eradication through oncology trials, surgery, and immunotherapy.',
    iconName: 'Activity',
    overview: 'The Cancer Care Centre at Supreme offers standard precision medicine. By integrating Medical Oncology, Surgical Oncology, Radiation Oncology, and Bone Marrow Transplant capabilities under one roof, we craft customized healing plans for each patient.',
    services: [
      'Highly Targeted Radiation Therapy (LINAC / IMRT)',
      'Precision Immunotherapy and Chemotherapy',
      'Complex Microvascular Oncological Surgery',
      'Autologous Bone Marrow Transplants (BMT)',
      'Comprehensive Palliative Supportive Oncology Care'
    ],
    stats: [
      { label: 'Cancer Survivors', value: '5,000+' },
      { label: 'Tumor Boards Panels', value: 'Weekly' },
      { label: 'BMT Isolation Rooms', value: '10' }
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr_aris_thorne',
    name: 'Dr. Aris Thorne',
    role: 'Chief & Senior Consultant - Cardiothoracic Surgery',
    departmentId: 'cardiology',
    experience: 23,
    rating: 4.9,
    reviewsCount: 382,
    specialties: ['Minimally Invasive Coronary Bypass (BMS & DES)', 'Aortic Aneurysm Repair', 'Heart Transplant & Ventricular Assist Devices'],
    gender: 'male',
    about: 'Dr. Aris Thorne is a globally recognized Cardiothoracic Surgeon with over two decades of clinical experience. He specializes in low-risk, high-complexity arterial bypass surgeries and valve reconstructions. He is dedicated to patient-centric treatment frameworks.',
    education: [
      'MD - Johns Hopkins School of Medicine',
      'Fellowship in Cardiothoracic Surgery - Mayo Clinic',
      'Board Certified in Thoracic & Cardiovascular Surgery'
    ],
    awards: [
      'Lifetime Achievement in Cardiac Sciences, 2024',
      'Gold Medalist, National Board of Surgeons'
    ],
    schedule: [
      { day: 'Monday', hours: '09:00 AM - 01:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] },
      { day: 'Wednesday', hours: '01:00 PM - 05:00 PM', slots: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] },
      { day: 'Friday', hours: '09:00 AM - 01:00 PM', slots: ['09:30 AM', '10:30 AM', '11:30 AM', '12:30 PM'] }
    ]
  },
  {
    id: 'dr_sarah_jenkins',
    name: 'Dr. Sarah Jenkins',
    role: 'Senior Consultant - Interventional Cardiology',
    departmentId: 'cardiology',
    experience: 16,
    rating: 4.8,
    reviewsCount: 290,
    specialties: ['Complex Angioplasty (CHIP)', 'Arrhythmia Management', 'Transcatheter Aortic Valve Replacement (TAVR)'],
    gender: 'female',
    about: 'Dr. Sarah Jenkins has pioneered numerous multi-arterial interventional breakthroughs. She treats vascular blockages and conducts complex valve replacements, offering quick healing periods through radial artery access interventions.',
    education: [
      'MD - Harvard Medical School',
      'Residency in Internal Medicine - Stanford University Hospital',
      'Fellowship in Cardiovascular Medicine - Cleveland Clinic'
    ],
    awards: [
      'Outstanding Young Cardiologist Innovator, 2022',
      'Leadership Excellence in Clinical Trials'
    ],
    schedule: [
      { day: 'Tuesday', hours: '10:00 AM - 02:00 PM', slots: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'] },
      { day: 'Thursday', hours: '02:00 PM - 06:00 PM', slots: ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'] },
      { day: 'Saturday', hours: '09:00 AM - 12:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM'] }
    ]
  },
  {
    id: 'dr_robert_chen',
    name: 'Dr. Robert Chen',
    role: 'Chief of Division & Director - Neurosurgery',
    departmentId: 'neurology',
    experience: 25,
    rating: 4.95,
    reviewsCount: 412,
    specialties: ['High-Precision Neuro-Oncology', 'Skull Base Micro-Surgeries', 'Minimally Invasive Spine Surgery'],
    gender: 'male',
    about: 'Dr. Robert Chen is a leading neurosurgeon who specializes in removing deep-seated tumors via micro-surgical pathways. He combines deep clinical dexterity with the newest neural modeling algorithms to ensure extreme precise intervention limits.',
    education: [
      'MD - Columbia University College of Physicians & Surgeons',
      'Neurosurgery Residency - University of California, San Francisco (UCSF)',
      'Clinical Spine Fellowship - National Hospital for Neurology, UK'
    ],
    awards: [
      'Distinguished Surgeon of the Decade (Neuroscience)',
      'National Scientific Research Pioneer Award'
    ],
    schedule: [
      { day: 'Monday', hours: '02:00 PM - 06:00 PM', slots: ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'] },
      { day: 'Thursday', hours: '09:00 AM - 01:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] }
    ]
  },
  {
    id: 'dr_elena_rostova',
    name: 'Dr. Eléna Rostova',
    role: 'Senior Consultant - Neurology & Cognitive Health',
    departmentId: 'neurology',
    experience: 14,
    rating: 4.75,
    reviewsCount: 185,
    specialties: ['Acute Ischemic Stroke Care', 'Intractable Epilepsy', 'Neurodegenerative Disease Diagnostics'],
    gender: 'female',
    about: 'Dr. Eléna Rostova specializes in preserving and rebuilding cognitive and cortical health. She leads Supreme’s rapid-response Stroke and Epilepsy evaluation units with high success in long-term functional recoveries.',
    education: [
      'Doctor of Medicine (MD) - Oxford Medical School, UK',
      'Clinical Neurology Residency - Massachusetts General Hospital',
      'Fellowship in Medical Epilepsy - National Institute of Neurological Disorders'
    ],
    awards: [
      'Stroke Awareness Initiative Leader, 2023',
      'European Academy of Neurology Excellence Certificate'
    ],
    schedule: [
      { day: 'Wednesday', hours: '09:00 AM - 01:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] },
      { day: 'Friday', hours: '02:00 PM - 06:00 PM', slots: ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'] }
    ]
  },
  {
    id: 'dr_marcus_vance',
    name: 'Dr. Marcus Vance',
    role: 'Director & Chief Joint Replacement Surgeon',
    departmentId: 'orthopedics',
    experience: 20,
    rating: 4.9,
    reviewsCount: 340,
    specialties: ['Robotic Knee & Hip Reconstructions', 'Revision Arthroplasty', 'Cartilage Restoration Therapies'],
    gender: 'male',
    about: 'Dr. Marcus Vance is a master of orthopedics, recognized for performing over 5,000 successful robotic-assisted joint replacements. His rapid-recovery protocols allow his standard joint replacement patients to walk with support within hours of surgery.',
    education: [
      'MD - University of Michigan Medical School',
      'Orthopedic Surgery Residency - Hospital for Special Surgery, New York',
      'Adult Reconstruction Fellowship - Rush University Medical Center'
    ],
    awards: [
      'Outstanding Contribution in Robotic Orthopedics',
      'Innovation in Arthroplasty Research Gold Medal'
    ],
    schedule: [
      { day: 'Tuesday', hours: '09:00 AM - 01:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] },
      { day: 'Friday', hours: '09:00 AM - 01:00 PM', slots: ['09:30 AM', '10:30 AM', '11:30 AM', '12:30 PM'] }
    ]
  },
  {
    id: 'dr_priya_nair',
    name: 'Dr. Priya Nair',
    role: 'Senior Consultant - Pediatric Orthopedics & Sports Medicine',
    departmentId: 'orthopedics',
    experience: 15,
    rating: 4.85,
    reviewsCount: 220,
    specialties: ['Pediatric Bone Deformities', 'Minimally Invasive Arthroscopy', 'Sports Injury Rehabilitation'],
    gender: 'female',
    about: 'Dr. Priya Nair treats children, adolescents, and athletes suffering from complex motion disorders or traumatic injuries. She advocates strongly for physical, non-surgical reconditioning before moving to reconstructive plans.',
    education: [
      'MD - All India Institute of Medical Sciences (AIIMS)',
      'Pediatric Orthopedic Fellowship - Boston Children’s Hospital',
      'Sports Medicine Specialization Residency - Hospital for Joint Diseases, NY'
    ],
    awards: [
      'National Youth Sports Medicine Patron, 2024',
      'Excellence in Pediatric Orthopedics Research'
    ],
    schedule: [
      { day: 'Wednesday', hours: '02:00 PM - 06:00 PM', slots: ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'] },
      { day: 'Saturday', hours: '09:00 AM - 01:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] }
    ]
  },
  {
    id: 'dr_linda_reynolds',
    name: 'Dr. Linda Reynolds',
    role: 'Principal Consultant - General & Adolescent Pediatrics',
    departmentId: 'pediatrics',
    experience: 19,
    rating: 4.88,
    reviewsCount: 310,
    specialties: ['Pediatric Immunological Disorders', 'Growth and Neuro-Development', 'Childhood Nutrition and Lifestyle'],
    gender: 'female',
    about: 'Dr. Linda Reynolds has spent nearly 20 years caring for the healthy growth and cognitive markers of children. With her warm and welcoming nature, she helps kids and parents navigate acute childhood illnesses with calm confidence.',
    education: [
      'MD - Yale School of Medicine',
      'Residency in General Pediatrics - Children’s Hospital of Philadelphia (CHOP)',
      'Developmental-Behavioral Pediatrics Board Certification'
    ],
    awards: [
      'Best Pediatric Practitioner Award, 2023',
      'Community Child Welfare Outstanding Leader'
    ],
    schedule: [
      { day: 'Monday', hours: '09:00 AM - 01:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] },
      { day: 'Wednesday', hours: '09:00 AM - 01:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] },
      { day: 'Friday', hours: '09:00 AM - 01:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] }
    ]
  },
  {
    id: 'dr_kabir_mehta',
    name: 'Dr. Kabir Mehta',
    role: 'Chief - Neonatology & Pediatric Critical Care',
    departmentId: 'pediatrics',
    experience: 17,
    rating: 4.92,
    reviewsCount: 265,
    specialties: ['Extreme Low Birth Weight Care', 'Neonatal Respiratory Ventilator Support', 'Congenital Malformations Care'],
    gender: 'male',
    about: 'Dr. Kabir Mehta is highly specialized in preserving newborn lives. He directs the Level III Neonatal Intensive Care Unit, offering 24/7 dedicated surveillance to premature infants and critical newborns born with systemic complications.',
    education: [
      'MD - Northwestern University Feinberg School',
      'Neonatal-Perinatal Fellowship - Texas Children’s Hospital',
      'Critical Care Pediatrics Specialization'
    ],
    awards: [
      'Pioneer in Neonatal Critical Care Award',
      'Global Pediatric Health Ambassador, 2021'
    ],
    schedule: [
      { day: 'Tuesday', hours: '02:00 PM - 06:00 PM', slots: ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'] },
      { day: 'Thursday', hours: '02:00 PM - 06:00 PM', slots: ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'] }
    ]
  },
  {
    id: 'dr_jonathan_ross',
    name: 'Dr. Jonathan Ross',
    role: 'Director & Chief Medical Surgical Oncologist',
    departmentId: 'oncology',
    experience: 22,
    rating: 4.96,
    reviewsCount: 395,
    specialties: ['Surgical Resection of Gastrointestinal Cancers', 'Thoracic Oncology Solutions', 'Robotic Gastro-Oncology'],
    gender: 'male',
    about: 'Dr. Jonathan Ross offers exceptional hope to tumor patients. He focuses on comprehensive multi-disciplinary cancer management, performing high-success surgical tumor removals with state-of-the-art robotic assistance.',
    education: [
      'MD - Vanderbilt University School of Medicine',
      'General Surgery Residency - Duke University Hospital',
      'Surgical Oncology Fellowship - MD Anderson Cancer Center'
    ],
    awards: [
      'Oncological Excellence Fellowship, 2023',
      'Distinguished Researcher in Clinical Oncology'
    ],
    schedule: [
      { day: 'Monday', hours: '09:00 AM - 01:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] },
      { day: 'Thursday', hours: '02:00 PM - 06:00 PM', slots: ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'] }
    ]
  },
  {
    id: 'dr_claire_dubois',
    name: 'Dr. Claire Dubois',
    role: 'Senior Consultant - Radiation & Molecular Oncology',
    departmentId: 'oncology',
    experience: 13,
    rating: 4.82,
    reviewsCount: 154,
    specialties: ['Stereotactic Radiosurgery (SRS/SBRT)', 'Targeted Immunotherapy Interventions', 'Breast & Prostate Brachytherapy'],
    gender: 'female',
    about: 'Dr. Claire Dubois employs radiation technologies to shrink and kill difficult cancers. She matches cellular genetics with custom dose planning to target tumors directly while safeguarding near-lying organic health metrics.',
    education: [
      'MD - Sorbonne Université, France',
      'Radiation Oncology Practice Residency - Memorial Sloan Kettering Cancer Center',
      'Therapeutic Genetics Scholar Certificate'
    ],
    awards: [
      'Young Researcher Innovation Award (Cancer Care)',
      'Leadership Panelist, International Cancer Studies Group'
    ],
    schedule: [
      { day: 'Tuesday', hours: '09:00 AM - 01:00 PM', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] },
      { day: 'Wednesday', hours: '02:00 PM - 06:00 PM', slots: ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'] }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: 'William Harrison',
    text: "The robotic-assisted knee replacement with Dr. Vance was life-changing. I walked pain-free within weeks. Supreme Superspeciality's staff was exceptionally warm and professional.",
    procedure: 'Robotic Total Knee Replacement',
    rating: 5,
    date: 'April 2026'
  },
  {
    name: 'Sophia Lindqvist',
    text: "Dr. Thorne and the structural heart program carried out my mother's valve procedure with utmost precision. Their 24/7 cardiac emergency unit is remarkably state-of-the-art.",
    procedure: 'TAVR Valve Therapy',
    rating: 5,
    date: 'May 2026'
  },
  {
    name: 'Carlos Mendez',
    text: "Under Dr. Ross and the oncology tumor board, my treatment map was incredibly tailored and clear. Today I am in complete remission. Thank you, Supreme Hospital!",
    procedure: 'Medical Oncology & Resection',
    rating: 5,
    date: 'January 2026'
  }
];

export const FAQS = [
  {
    q: 'How can I schedule an appointment with a specialist?',
    a: 'You can book an appointment directly through our website using the modern online Appointment Wizard. Alternatively, call our 24/7 Central Patient Desk at +91 7507716433, +91 7378738884, or +91 8624920084.'
  },
  {
    q: 'Do you offer emergency care and trauma facilities?',
    a: 'Yes. Supreme Superspeciality Hospital runs a fully equipped, level-1 Trauma, Cardiac, and Stroke emergency response department accessible round-the-clock, with a fleet of high-care cardiac ambulances.'
  },
  {
    q: 'What should I bring on the day of my clinical admission?',
    a: 'Please carry folders of your past medical records, prescriptions, valid government-issued photographic identification, insurance policy e-cards, and standard personal toiletries. We will coordinate all hospital admission details.'
  },
  {
    q: 'Does Supreme support international insurance providers?',
    a: 'Yes, our International Desk coordinates with global travel assistants and major international health insurance providers to manage seamless cashless treatment certifications.'
  }
];
