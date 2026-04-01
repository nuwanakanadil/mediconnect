import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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
import { finalize } from 'rxjs';

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
  displayedAppointments: Appointment[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private patientService: PatientService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.errorMessage = '';

    this.patientService
      .getAppointments()
      .pipe(
        finalize(() => {
          console.log('Appointments request finalized.');

          this.ngZone.run(() => {
            this.loading = false;
            this.cdr.detectChanges();
          });
        })
      )
      .subscribe({
        next: (data: Appointment[]) => {
          this.ngZone.run(() => {
            console.log('Appointments received:', data);
            this.appointments = data || [];
            this.updateFilteredAppointments();
            this.cdr.detectChanges();
          });
        },
        error: (err: any) => {
          this.ngZone.run(() => {
            console.error('Failed to load appointments:', err);
            this.errorMessage = 'Failed to load appointments.';
            this.appointments = [];
            this.displayedAppointments = [];
            this.cdr.detectChanges();
          });
        },
      });
  }

  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
    this.updateFilteredAppointments();
    this.cdr.detectChanges();
  }

  updateFilteredAppointments(): void {
    this.displayedAppointments = this.appointments.filter((apt) => {
      const status = apt.status?.toLowerCase();

      if (this.activeTab === 'upcoming') {
        return status === 'confirmed' || status === 'pending' || status === 'approved';
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

    const cleanDoctor = doctor.trim();
    const parts = cleanDoctor.split(/\s+/);

    if (parts.length === 1) {
      return cleanDoctor.substring(0, 2).toUpperCase();
    }

    return parts
      .slice(0, 2)
      .map((part) => part[0] || '')
      .join('')
      .toUpperCase();
  }

  formatDate(dateTimeStr: string): string {
    if (!dateTimeStr) return 'TBD';

    return new Date(dateTimeStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  formatTime(dateTimeStr: string): string {
    if (!dateTimeStr) return 'TBD';

    return new Date(dateTimeStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}