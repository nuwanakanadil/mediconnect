import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Review {
  id?: string;
  doctorId: string;
  patientId: string;
  rating: number;
  comment: string;
  createdAt?: string;
  // Patient info for display purposes
  patientName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiBaseUrl}/reviews`;

  constructor(private http: HttpClient) {}

  addReview(payload: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, payload);
  }

  getReviewsByDoctorId(doctorId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }
}
