import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  SearchIcon,
  FilterIcon,
  ChevronRightIcon,
  FileTextIcon,
  ActivityIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { AppointmentRequestService, AppointmentRequest } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class PatientsComponent implements OnInit {
  readonly SearchIcon = SearchIcon;
  readonly FilterIcon = FilterIcon;
  readonly ChevronRightIcon = ChevronRightIcon;
  readonly FileTextIcon = FileTextIcon;
  readonly ActivityIcon = ActivityIcon;

  patients: any[] = [];
  filteredPatients: any[] = [];
  selectedPatient: any | null = null;
  searchTerm = '';
  doctorId: string | null = null;

  constructor(private apptService: AppointmentRequestService) {}

  ngOnInit() {
    this.doctorId = localStorage.getItem('doctorId');
    if (this.doctorId) {
      this.apptService.getRequestsByDoctorId(this.doctorId).subscribe({
        next: (data) => this.extractPatients(data),
        error: (err) => console.error('Failed to load appointments for patients', err)
      });
    }
  }

  extractPatients(appointments: AppointmentRequest[]) {
    // Build a patient roster from accepted/completed consultations.
    const map = new Map<string, any>();
    appointments.forEach(apt => {
      if (apt.status === 'ACCEPTED' || apt.status === 'COMPLETED') {
        if (!map.has(apt.patientId)) {
          map.set(apt.patientId, {
            id: apt.patientId,
            name: apt.patientName || 'Patient ' + apt.patientId,
            age: 'N/A', // Patient Service missing here
            gender: 'Unknown',
            lastVisit: apt.appointmentDateTime,
            totalVisits: 1,
            phone: 'N/A',
            notes: [apt.patientNotes].filter(Boolean)
          });
        } else {
          const p = map.get(apt.patientId);
          p.totalVisits += 1;
          if (new Date(apt.appointmentDateTime).getTime() > new Date(p.lastVisit).getTime()) {
            p.lastVisit = apt.appointmentDateTime;
          }
          if (apt.patientNotes) {
            p.notes.push(apt.patientNotes);
          }
        }
      }
    });

    this.patients = Array.from(map.values()).sort(
      (a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
    );
    this.filteredPatients = [...this.patients];
    this.selectedPatient = this.filteredPatients[0] || null;
  }

  onSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
    if (!this.searchTerm) {
      this.filteredPatients = [...this.patients];
    } else {
      this.filteredPatients = this.patients.filter((p) => {
        const text = `${p.id} ${p.name}`.toLowerCase();
        return text.includes(this.searchTerm);
      });
    }

    if (!this.selectedPatient && this.filteredPatients.length > 0) {
      this.selectedPatient = this.filteredPatients[0];
    }
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
  }

  initials(name: string) {
    if (!name) return 'PT';
    const parts = name.split(' ');
    return `${parts[0][0]}${parts[1]?.[0] || ''}`.toUpperCase();
  }
}