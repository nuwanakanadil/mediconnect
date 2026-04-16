import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  SearchIcon,
  VideoIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';
import { AppointmentRequestService, AppointmentRequest } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './consultations.html',
  styleUrl: './consultations.css',
})
export class ConsultationsComponent implements OnInit {
  readonly SearchIcon = SearchIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly ClockIcon = ClockIcon;
  readonly VideoIcon = VideoIcon;
  readonly FileTextIcon = FileTextIcon;

  doctorId: string | null = null;
  consultations: AppointmentRequest[] = [];
  filteredConsultations: AppointmentRequest[] = [];
  searchTerm = '';

  constructor(
    private apptService: AppointmentRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctorId = localStorage.getItem('doctorId');
    if (!this.doctorId) {
      return;
    }

    this.apptService.getRequestsByDoctorId(this.doctorId).subscribe({
      next: (data) => {
        this.consultations = data
          .filter((c) => c.status === 'ACCEPTED' || c.status === 'COMPLETED')
          .sort((a, b) => new Date(b.appointmentDateTime).getTime() - new Date(a.appointmentDateTime).getTime());
        this.applyFilter();
      },
      error: (err) => console.error('Failed to load consultations', err)
    });
  }

  onSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
    this.applyFilter();
  }

  private applyFilter() {
    if (!this.searchTerm) {
      this.filteredConsultations = [...this.consultations];
      return;
    }

    this.filteredConsultations = this.consultations.filter((c) => {
      const text = `${c.patientId} ${c.patientNotes || ''} ${c.appointmentId}`.toLowerCase();
      return text.includes(this.searchTerm);
    });
  }

  markCompleted(id: string) {
    this.apptService.updateRequestStatus(id, 'COMPLETED').subscribe({
      next: (res) => {
        this.consultations = this.consultations.map((c) => c.id === id ? { ...c, status: res.status } : c);
        this.applyFilter();
      },
      error: (err) => console.error('Failed to mark consultation completed', err)
    });
  }

  openConsultationNotes(c: AppointmentRequest) {
    this.router.navigate(['/doctor/prescriptions'], {
      queryParams: {
        patientId: c.patientId,
        appointmentId: c.appointmentId,
        openCreate: '1',
        mode: 'notes'
      }
    });
  }

  getStatusLabel(status: string): string {
    if (status === 'ACCEPTED') return 'accepted';
    if (status === 'COMPLETED') return 'completed';
    return status.toLowerCase();
  }

  getDisplayDate(dateTime: string): string {
    return new Date(dateTime).toLocaleDateString();
  }

  getDisplayTime(dateTime: string): string {
    return new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  initials(name: string) {
    return `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] || ''}`;
  }
}