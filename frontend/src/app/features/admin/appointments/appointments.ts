import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CalendarIcon,
  FilterIcon,
  SearchIcon,
  VideoIcon,
  MapPinIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class AppointmentsComponent {
  readonly CalendarIcon = CalendarIcon;
  readonly SearchIcon = SearchIcon;
  readonly FilterIcon = FilterIcon;
  readonly VideoIcon = VideoIcon;
  readonly MapPinIcon = MapPinIcon;

  appointments = [
    {
      id: 'APT-2001',
      patient: 'Alex Johnson',
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      date: 'Oct 25, 2023',
      time: '10:00 AM',
      type: 'Video Consult',
      status: 'confirmed',
    },
    {
      id: 'APT-2002',
      patient: 'Emily Chen',
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurology',
      date: 'Oct 25, 2023',
      time: '02:30 PM',
      type: 'In-Person',
      status: 'pending',
    },
    {
      id: 'APT-2003',
      patient: 'Robert Taylor',
      doctor: 'Dr. Lisa Patel',
      specialty: 'Dermatology',
      date: 'Oct 26, 2023',
      time: '11:15 AM',
      type: 'Video Consult',
      status: 'completed',
    },
    {
      id: 'APT-2004',
      patient: 'James Wilson',
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      date: 'Oct 24, 2023',
      time: '09:00 AM',
      type: 'In-Person',
      status: 'cancelled',
    },
  ];
}