import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ActivityIcon,
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  CreditCardIcon,
  FileTextIcon,
  PillIcon,
  UploadIcon,
  VideoIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  readonly CalendarIcon = CalendarIcon;
  readonly FileTextIcon = FileTextIcon;
  readonly PillIcon = PillIcon;
  readonly CreditCardIcon = CreditCardIcon;
  readonly VideoIcon = VideoIcon;
  readonly UploadIcon = UploadIcon;
  readonly ChevronRightIcon = ChevronRightIcon;
  readonly ClockIcon = ClockIcon;
  readonly ActivityIcon = ActivityIcon;

  todayText = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  stats = [
    {
      title: 'Upcoming Appointments',
      value: '3',
      icon: this.CalendarIcon,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Active Prescriptions',
      value: '2',
      icon: this.PillIcon,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
    },
    {
      title: 'Medical Reports',
      value: '8',
      icon: this.FileTextIcon,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      title: 'Total Spent',
      value: '$1,240',
      icon: this.CreditCardIcon,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
  ];

  appointments: any[] = []; // Waiting for GET /api/appointments/requests/patient/{patientId} endpoint

  notifications = [
    {
      title: 'Appointment Confirmed',
      desc: 'Your appointment with Dr. Sarah Smith is confirmed for tomorrow at 10:00 AM.',
      time: '2 hours ago',
      unread: true,
    },
    {
      title: 'New Prescription Added',
      desc: 'Dr. Robert Taylor has uploaded a new prescription for your recent visit.',
      time: 'Yesterday',
      unread: false,
    },
    {
      title: 'Payment Successful',
      desc: 'Receipt #INV-2023-8472 for $150.00 has been generated.',
      time: '2 days ago',
      unread: false,
    },
  ];

  prescriptions = [
    {
      med: 'Amoxicillin 500mg',
      doctor: 'Dr. Robert Taylor',
      date: 'Oct 15, 2023',
    },
    {
      med: 'Lisinopril 10mg',
      doctor: 'Dr. Sarah Smith',
      date: 'Sep 28, 2023',
    },
  ];

  reports = [
    {
      name: 'Blood Test Results.pdf',
      date: 'Oct 10, 2023',
      size: '2.4 MB',
    },
    {
      name: 'Chest X-Ray Scan.jpg',
      date: 'Sep 15, 2023',
      size: '5.1 MB',
    },
  ];

  getDoctorInitials(doctor: string): string {
    const parts = doctor.split(' ');
    return `${parts[1]?.[0] ?? ''}${parts[2]?.[0] ?? ''}`;
  }
}