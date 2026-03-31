import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CalendarIcon,
  FilterIcon,
  MapPinIcon,
  MoreVerticalIcon,
  SearchIcon,
  VideoIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';
import { PatientService } from '../../../core/services/patient.service';
import { Appointment } from '../../../core/models/patient.model';

type TabType = 'upcoming' | 'past' | 'cancelled';


@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class AppointmentsComponent implements OnInit {
  readonly CalendarIcon = CalendarIcon;
  readonly SearchIcon = SearchIcon;
  readonly FilterIcon = FilterIcon;
  readonly VideoIcon = VideoIcon;
  readonly MapPinIcon = MapPinIcon;
  readonly MoreVerticalIcon = MoreVerticalIcon;

  activeTab: TabType = 'upcoming';
  appointments: Appointment[] = [];
  loading = true;
  errorMessage = '';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.patientService.getAppointments().subscribe({
      next: (data: Appointment[]) => {
        this.appointments = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load appointments.';
        this.loading = false;
      }
    });
  }

  setActiveTab(tab: TabType) {
    this.activeTab = tab;
  }

  get filteredAppointments(): Appointment[] {
    return this.appointments.filter((apt) => {
      const status = apt.status?.toLowerCase();
      if (this.activeTab === 'upcoming') {
        return status === 'confirmed' || status === 'pending';
      }
      if (this.activeTab === 'past') {
        return status === 'completed';
      }
      if (this.activeTab === 'cancelled') {
        return status === 'cancelled';
      }
      return true;
    });
  }

  getDoctorInitials(doctor: string): string {
    if (!doctor) return '??';
    const parts = doctor.split(' ');
    if (parts.length < 2) return doctor.substring(0, 2).toUpperCase();
    return `${parts[1]?.[0] ?? ''}${parts[2]?.[0] ?? ''}`;
  }

  formatDate(dateTimeStr: string): string {
    if (!dateTimeStr) return 'TBD';
    return new Date(dateTimeStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatTime(dateTimeStr: string): string {
    if (!dateTimeStr) return 'TBD';
    return new Date(dateTimeStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}