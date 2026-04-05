import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, MedicalReport, MedicalHistory, Prescription, Appointment, Payment, Dependent } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8081/api/patients';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/register`, data);
  }

  getProfile(): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/me`);
  }

  updateProfile(data: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/me`, data);
  }

  getReports(): Observable<MedicalReport[]> {
    return this.http.get<MedicalReport[]>(`${this.apiUrl}/me/reports`);
  }

  uploadReport(file: File, description: string): Observable<MedicalReport> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    return this.http.post<MedicalReport>(`${this.apiUrl}/me/reports`, formData);
  }

  saveReportMetadata(metadata: any): Observable<MedicalReport> {
    return this.http.post<MedicalReport>(`${this.apiUrl}/me/reports/metadata`, metadata);
  }

  deleteReport(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me/reports/${id}`);
  }

  getHistory(): Observable<MedicalHistory[]> {
    return this.http.get<MedicalHistory[]>(`${this.apiUrl}/me/history`);
  }

  addHistory(data: MedicalHistory): Observable<MedicalHistory> {
    return this.http.post<MedicalHistory>(`${this.apiUrl}/me/history`, data);
  }

  updateHistory(id: string, data: MedicalHistory): Observable<MedicalHistory> {
    return this.http.put<MedicalHistory>(`${this.apiUrl}/me/history/${id}`, data);
  }

  deleteHistory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me/history/${id}`);
  }

  getPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/me/prescriptions`);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/me/appointments`);
  }

  bookAppointment(data: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/me/appointments/book`, data);
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/me/payments`);
  }

  getDependents(): Observable<Dependent[]> {
    return this.http.get<Dependent[]>(`${this.apiUrl}/me/dependents`);
  }

  addDependent(dependent: Dependent): Observable<Dependent> {
    return this.http.post<Dependent>(`${this.apiUrl}/me/dependents`, dependent);
  }

  updateDependent(id: string, dependent: Dependent): Observable<Dependent> {
    return this.http.put<Dependent>(`${this.apiUrl}/me/dependents/${id}`, dependent);
  }

  deleteDependent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me/dependents/${id}`);
  }

  getDoctorsBySpecialty(specialty: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/api/doctors/search?specialization=${specialty}`);
  }
}
