import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentRequestService, AppointmentRequest } from '../../../core/services/appointment.service';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';
import {
  SearchIcon,
  FilterIcon,
  VideoIcon,
  MapPinIcon,
  CheckIcon,
  XIcon,
  LucideAngularModule,
} from 'lucide-angular';

type TabType = 'today' | 'upcoming' | 'requests';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class AppointmentsComponent implements OnInit {
  readonly SearchIcon = SearchIcon;
  readonly FilterIcon = FilterIcon;
  readonly VideoIcon = VideoIcon;
  readonly MapPinIcon = MapPinIcon;
  readonly CheckIcon = CheckIcon;
  readonly XIcon = XIcon;

  activeTab: TabType = 'requests'; // Default to requests so the doctor sees pending

  doctorId: string | null = null;
  appointments: AppointmentRequest[] = [];
  searchTerm = '';

  constructor(private apptService: AppointmentRequestService) {}

  ngOnInit() {
    this.doctorId = localStorage.getItem('doctorId');
    if (this.doctorId) {
      this.loadAppointments();
    }
  }

  loadAppointments() {
    this.apptService.getRequestsByDoctorId(this.doctorId!).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        console.warn('Backend not available or no appointments.', err);
      }
    });
  }

  updateStatus(id: string, newStatus: string) {
    this.apptService.updateRequestStatus(id, newStatus).subscribe({
      next: (res) => {
        // Update local list
        const index = this.appointments.findIndex(a => a.id === id);
        if (index !== -1) {
          this.appointments[index].status = res.status;
        }
      },
      error: (err) => alert('Failed to update status')
    });
  }

  setActiveTab(tab: TabType) {
    this.activeTab = tab;
  }

  onSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
  }

  private isToday(dateTime: string): boolean {
    const target = new Date(dateTime);
    const now = new Date();
    return target.getFullYear() === now.getFullYear()
      && target.getMonth() === now.getMonth()
      && target.getDate() === now.getDate();
  }

  private isUpcoming(dateTime: string): boolean {
    const target = new Date(dateTime);
    return target.getTime() > Date.now();
  }

  get filteredAppointments() {
    return this.appointments.filter((apt) => {
      if (this.activeTab === 'today' && !(apt.status === 'ACCEPTED' && this.isToday(apt.appointmentDateTime))) {
        return false;
      }

      if (this.activeTab === 'upcoming' && !(apt.status === 'ACCEPTED' && this.isUpcoming(apt.appointmentDateTime))) {
        return false;
      }

      if (this.activeTab === 'requests' && apt.status !== 'PENDING') {
        return false;
      }

      if (!this.searchTerm) {
        return true;
      }

      const haystack = `${apt.patientId} ${apt.appointmentId} ${apt.patientNotes || ''}`.toLowerCase();
      return haystack.includes(this.searchTerm);
    });
  }

  get pendingCount() {
    return this.appointments.filter(a => a.status === 'PENDING').length;
  }

  initials(name?: string) {
    if (!name) return 'PT';
    return `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] || ''}`.toUpperCase();
  }
}