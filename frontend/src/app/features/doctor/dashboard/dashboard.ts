import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
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

  stats = [
    { title: "Today's Appointments", value: '8', icon: CalendarIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Pending Follow-ups', value: '5', icon: ClockIcon, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Total Patients', value: '1,240', icon: UsersIcon, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Earnings (Month)', value: '$4,200', icon: DollarSignIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  schedule = [
    { time: '09:00 AM', patient: 'James Wilson', type: 'In-Person', status: 'completed', desc: 'Routine checkup' },
    { time: '10:00 AM', patient: 'Emily Chen', type: 'Video Consult', status: 'In Progress', desc: 'Follow-up on blood pressure' },
    { time: '11:30 AM', patient: 'Robert Taylor', type: 'In-Person', status: 'pending', desc: 'ECG Review' },
    { time: '02:00 PM', patient: 'Lisa Patel', type: 'Video Consult', status: 'pending', desc: 'Initial consultation' },
  ];

  requests = [
    { name: 'David Miller', date: 'Tomorrow, 03:00 PM', type: 'Video Consult' },
    { name: 'Sarah Connor', date: 'Oct 26, 10:30 AM', type: 'In-Person' },
  ];

  recentPatients = [
    { name: 'James Wilson', issue: 'Chest pain consultation', when: '2 hours ago' },
    { name: 'Emily Chen', issue: 'Blood pressure follow-up', when: 'Today' },
    { name: 'Robert Taylor', issue: 'ECG review', when: 'Yesterday' },
  ];
}