import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AppointmentRequest {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;
  appointmentDateTime: string;
  patientNotes: string;
  status: string; // PENDING, ACCEPTED, REJECTED, COMPLETED
  requestedAt: string;
  // Patient mock properties for frontend convenience
  patientName?: string; 
  reason?: string;
  patientReportUrls?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentRequestService {
  private apiUrl = `${environment.apiBaseUrl}/appointments/requests`;

  constructor(private http: HttpClient) {}

  createRequest(payload: any): Observable<AppointmentRequest> {
    return this.http.post<AppointmentRequest>(this.apiUrl, payload);
  }

  getRequestById(id: string): Observable<AppointmentRequest> {
    return this.http.get<AppointmentRequest>(`${this.apiUrl}/${id}`);
  }

  getRequestsByDoctorId(doctorId: string): Observable<AppointmentRequest[]> {
    return this.http.get<AppointmentRequest[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  getRequestsByDoctorIdAndStatus(doctorId: string, status: string): Observable<AppointmentRequest[]> {
    const encodedStatus = encodeURIComponent(status);
    return this.http.get<AppointmentRequest[]>(`${this.apiUrl}/doctor/${doctorId}/status?status=${encodedStatus}`);
  }

  updateRequestStatus(id: string, status: string): Observable<AppointmentRequest> {
    const encodedStatus = encodeURIComponent(status);
    return this.http.put<AppointmentRequest>(`${this.apiUrl}/${id}/status?status=${encodedStatus}`, null);
  }
}
