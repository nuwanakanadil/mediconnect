import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface PatientRecord {
  id?: string;
  patientId?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  age?: number;
  gender?: string;
  phone?: string;
  bloodType?: string;
  allergies?: string[];
  currentMedications?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PatientRecordService {
  private apiUrl = `${environment.apiBaseUrl}/patients`;

  constructor(private http: HttpClient) {}

  // Optional integration point: returns null when patient-service endpoint is unavailable.
  getPatientById(patientId: string): Observable<PatientRecord | null> {
    return this.http.get<PatientRecord>(`${this.apiUrl}/${patientId}`).pipe(
      catchError(() => of(null))
    );
  }
}
