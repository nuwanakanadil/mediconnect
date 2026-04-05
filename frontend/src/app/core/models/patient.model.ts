export interface Patient {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  fileName: string;
  originalFileName: string;
  fileType: string;
  fileUrl?: string;
  description: string;
  uploadedAt: string;
}

export interface MedicalHistory {
  id?: string;
  patientId?: string;
  conditionName: string;
  diagnosisDate: string;
  treatment?: string;
  notes: string;
  status: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  medicationDetails: string;
  issuedDate: string;
  notes: string;
  status: string;
}

export interface Appointment {
  id?: string;
  patientId?: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  dateTime: string;
  status: string;
  type: string;
  reason: string;
}

export interface Payment {
  id: string;
  patientId: string;
  appointmentId: string;
  doctorName: string;
  amount: number;
  date: string;
  status: string;
  description: string;
  type: string;
}
