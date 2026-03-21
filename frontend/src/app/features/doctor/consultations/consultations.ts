import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  SearchIcon,
  VideoIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './consultations.html',
  styleUrl: './consultations.css',
})
export class ConsultationsComponent {
  readonly SearchIcon = SearchIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly ClockIcon = ClockIcon;
  readonly VideoIcon = VideoIcon;
  readonly FileTextIcon = FileTextIcon;

  consultations = [
    {
      patient: 'James Wilson',
      date: 'Today',
      time: '10:00 AM',
      type: 'Video Consult',
      status: 'completed',
      reason: 'Routine checkup and chest pain follow-up',
    },
    {
      patient: 'Emily Chen',
      date: 'Today',
      time: '02:30 PM',
      type: 'Video Consult',
      status: 'in progress',
      reason: 'Blood pressure review',
    },
    {
      patient: 'Robert Taylor',
      date: 'Oct 24, 2023',
      time: '11:15 AM',
      type: 'In-Person',
      status: 'pending',
      reason: 'ECG discussion',
    },
  ];

  initials(name: string) {
    return `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] || ''}`;
  }
}