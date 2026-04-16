import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, Appointment } from '../../core/models/patient.model';

export interface Doctor {
  id: string;
  fullName: string;
  email: string;
  specialization: string;
  hospital: string;
  status: string;
  rating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8081/api/admin';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }

  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/patients/${id}`);
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/doctors`);
  }

  verifyDoctor(id: string, status: string): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/doctors/${id}/verify?status=${status}`, {});
  }
}
