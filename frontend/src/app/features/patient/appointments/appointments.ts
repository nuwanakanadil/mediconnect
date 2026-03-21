import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

type TabType = 'upcoming' | 'past' | 'cancelled';

interface AppointmentItem {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  status: string;
  fee: string;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class AppointmentsComponent {
  readonly CalendarIcon = CalendarIcon;
  readonly SearchIcon = SearchIcon;
  readonly FilterIcon = FilterIcon;
  readonly VideoIcon = VideoIcon;
  readonly MapPinIcon = MapPinIcon;
  readonly MoreVerticalIcon = MoreVerticalIcon;

  activeTab: TabType = 'upcoming';

  appointments: AppointmentItem[] = [
    {
      id: 'APT-1001',
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      date: 'Oct 25, 2023',
      time: '10:00 AM',
      type: 'Video Consult',
      status: 'confirmed',
      fee: '$150',
    },
    {
      id: 'APT-1002',
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurology',
      date: 'Oct 28, 2023',
      time: '02:30 PM',
      type: 'In-Person',
      status: 'pending',
      fee: '$200',
    },
    {
      id: 'APT-1003',
      doctor: 'Dr. Emily Johnson',
      specialty: 'Pediatrics',
      date: 'Nov 02, 2023',
      time: '11:15 AM',
      type: 'In-Person',
      status: 'confirmed',
      fee: '$120',
    },
    {
      id: 'APT-0998',
      doctor: 'Dr. Robert Taylor',
      specialty: 'General Medicine',
      date: 'Oct 15, 2023',
      time: '09:00 AM',
      type: 'In-Person',
      status: 'completed',
      fee: '$100',
    },
    {
      id: 'APT-0985',
      doctor: 'Dr. Lisa Patel',
      specialty: 'Dermatology',
      date: 'Sep 28, 2023',
      time: '04:00 PM',
      type: 'Video Consult',
      status: 'completed',
      fee: '$160',
    },
    {
      id: 'APT-0970',
      doctor: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      date: 'Sep 10, 2023',
      time: '01:30 PM',
      type: 'In-Person',
      status: 'cancelled',
      fee: '$180',
    },
  ];

  setActiveTab(tab: TabType) {
    this.activeTab = tab;
  }

  get filteredAppointments(): AppointmentItem[] {
    return this.appointments.filter((apt) => {
      if (this.activeTab === 'upcoming') {
        return apt.status === 'confirmed' || apt.status === 'pending';
      }
      if (this.activeTab === 'past') {
        return apt.status === 'completed';
      }
      if (this.activeTab === 'cancelled') {
        return apt.status === 'cancelled';
      }
      return true;
    });
  }

  getDoctorInitials(doctor: string): string {
    const parts = doctor.split(' ');
    return `${parts[1]?.[0] ?? ''}${parts[2]?.[0] ?? ''}`;
  }
}