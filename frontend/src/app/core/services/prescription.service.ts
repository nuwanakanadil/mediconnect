import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  durationDays: number;
}

export interface Prescription {
  id?: string;
  doctorId: string;
  patientId: string;
  appointmentId: string;
  medications: Medication[];
  diagnosis: string;
  additionalNotes: string; // Used for "Consultation notes" feature
  issuedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = `${environment.apiBaseUrl}/prescriptions`;

  constructor(private http: HttpClient) {}

  createPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.apiUrl, prescription);
  }

  getPrescriptionById(id: string): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.apiUrl}/${id}`);
  }

  getPrescriptionsByDoctorId(doctorId: string): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  getPrescriptionsByPatientId(patientId: string): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/patient/${patientId}`);
  }
}
