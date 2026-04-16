import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  UsersIcon,
  CalendarIcon,
  VideoIcon,
  DollarSignIcon,
  ClockIcon,
  ChevronRightIcon,
  ActivityIcon,
  CheckCircle2Icon,
  LucideAngularModule,
} from 'lucide-angular';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';
import { AppointmentRequestService, AppointmentRequest } from '../../../core/services/appointment.service';
import { DoctorService, Doctor } from '../../../core/services/doctor.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  readonly UsersIcon = UsersIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly VideoIcon = VideoIcon;
  readonly DollarSignIcon = DollarSignIcon;
  readonly ClockIcon = ClockIcon;
  readonly ChevronRightIcon = ChevronRightIcon;
  readonly ActivityIcon = ActivityIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;

  todayText = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  doctorId: string | null = null;
  doctor: Doctor | null = null;
  appointments: AppointmentRequest[] = [];

  stats = [
    { title: "Today's Appointments", value: '0', icon: CalendarIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Pending Follow-ups', value: '0', icon: ClockIcon, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Total Patients', value: '0', icon: UsersIcon, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Earnings (Month)', value: '$0', icon: DollarSignIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  requests: AppointmentRequest[] = [];
  schedule: AppointmentRequest[] = [];
  recentPatients: any[] = [];

  constructor(
    private apptService: AppointmentRequestService,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.doctorId = localStorage.getItem('doctorId');
    if (this.doctorId) {
      this.loadDoctorProfile();
      this.apptService.getRequestsByDoctorId(this.doctorId).subscribe({
        next: (data) => {
          this.appointments = data;
          this.calculateStats();
        },
        error: (err) => console.error('Error fetching dashboard data', err)
      });
    }
  }

  loadDoctorProfile() {
    this.doctorService.getDoctorById(this.doctorId!).subscribe({
      next: (doctor) => this.doctor = doctor,
      error: () => this.doctor = null
    });
  }

  updateRequestStatus(id: string, status: string) {
    this.apptService.updateRequestStatus(id, status).subscribe({
      next: () => {
        this.appointments = this.appointments.map((a) => a.id === id ? { ...a, status } : a);
        this.calculateStats();
      },
      error: (err) => console.error('Failed to update request status', err)
    });
  }

  get pendingCount(): number {
    return this.requests.length;
  }

  get displayDoctorName(): string {
    if (!this.doctor) return 'Doctor';
    return `Dr. ${this.doctor.firstName} ${this.doctor.lastName}`;
  }

  calculateStats() {
    this.requests = this.appointments.filter(a => a.status === 'PENDING').slice(0, 5);
    this.schedule = this.appointments.filter(a => a.status === 'ACCEPTED').slice(0, 5);
    
    // Quick calculations for display
    this.stats[0].value = this.schedule.length.toString(); // Today's rough count
    this.stats[1].value = this.requests.length.toString(); // Pending requests
    
    // Extract unique patients from accepted appointments
    const uniquePatients = new Set(
      this.appointments
        .filter(a => a.status === 'ACCEPTED' || a.status === 'COMPLETED')
        .map(a => a.patientId)
    );
    this.stats[2].value = uniquePatients.size.toString();

    this.recentPatients = this.appointments
      .filter(a => a.status === 'ACCEPTED' || a.status === 'COMPLETED')
      .sort((a, b) => new Date(b.appointmentDateTime).getTime() - new Date(a.appointmentDateTime).getTime())
      .slice(0, 5);
  }
}