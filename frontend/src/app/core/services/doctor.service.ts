import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Doctor {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  hospitalName: string;
  consultationFee: number;
  bio: string;
  location: string;
  verificationDocuments: string[];
  verified?: boolean;
  active?: boolean;
  availability: any[];
}

export interface DoctorPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  hospitalName: string;
  consultationFee: number;
  bio: string;
  location: string;
  verificationDocuments: string[];
  availability: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = `${environment.apiBaseUrl}/doctors`;

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  createDoctor(payload: any): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, this.toDoctorPayload(payload));
  }

  updateDoctor(id: string, payload: any): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, this.toDoctorPayload(payload));
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchDoctorsBySpecialization(specialization: string): Observable<Doctor[]> {
    const encoded = encodeURIComponent(specialization);
    return this.http.get<Doctor[]>(`${this.apiUrl}/search/specialization?specialization=${encoded}`);
  }

  searchDoctorsByLocation(location: string): Observable<Doctor[]> {
    const encoded = encodeURIComponent(location);
    return this.http.get<Doctor[]>(`${this.apiUrl}/search/location?location=${encoded}`);
  }

  updateDoctorSchedule(id: string, availability: any[]): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}/schedule`, availability);
  }

  verifyDoctor(id: string): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}/verify`, {});
  }

  deactivateDoctor(id: string): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}/deactivate`, {});
  }

  private toDoctorPayload(payload: Partial<Doctor>): DoctorPayload {
    return {
      firstName: payload.firstName ?? '',
      lastName: payload.lastName ?? '',
      email: payload.email ?? '',
      phone: payload.phone ?? '',
      specialization: payload.specialization ?? '',
      qualification: payload.qualification ?? '',
      experienceYears: Number(payload.experienceYears ?? 0),
      hospitalName: payload.hospitalName ?? '',
      consultationFee: Number(payload.consultationFee ?? 0),
      bio: payload.bio ?? '',
      location: payload.location ?? '',
      verificationDocuments: payload.verificationDocuments ?? [],
      availability: payload.availability ?? []
    };
  }
}
