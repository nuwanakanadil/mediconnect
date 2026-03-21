import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  SearchIcon,
  FilterIcon,
  VideoIcon,
  MapPinIcon,
  CheckIcon,
  XIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';

type TabType = 'today' | 'upcoming' | 'requests';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class AppointmentsComponent {
  readonly SearchIcon = SearchIcon;
  readonly FilterIcon = FilterIcon;
  readonly VideoIcon = VideoIcon;
  readonly MapPinIcon = MapPinIcon;
  readonly CheckIcon = CheckIcon;
  readonly XIcon = XIcon;

  activeTab: TabType = 'today';

  appointments = [
    { id: 'APT-1001', patient: 'James Wilson', age: 45, date: 'Today', time: '10:00 AM', type: 'Video Consult', status: 'confirmed' },
    { id: 'APT-1002', patient: 'Emily Chen', age: 28, date: 'Today', time: '02:30 PM', type: 'In-Person', status: 'pending' },
    { id: 'APT-1003', patient: 'Robert Taylor', age: 62, date: 'Tomorrow', time: '11:15 AM', type: 'In-Person', status: 'confirmed' },
    { id: 'APT-0998', patient: 'Lisa Patel', age: 34, date: 'Oct 26, 2023', time: '09:00 AM', type: 'Video Consult', status: 'pending' },
    { id: 'APT-0985', patient: 'David Miller', age: 51, date: 'Oct 28, 2023', time: '04:00 PM', type: 'Video Consult', status: 'confirmed' },
  ];

  setActiveTab(tab: TabType) {
    this.activeTab = tab;
  }

  get filteredAppointments() {
    return this.appointments.filter((apt) => {
      if (this.activeTab === 'today') return apt.date === 'Today';
      if (this.activeTab === 'upcoming') return apt.date !== 'Today' && apt.status === 'confirmed';
      if (this.activeTab === 'requests') return apt.status === 'pending';
      return true;
    });
  }

  initials(name: string) {
    return `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] || ''}`;
  }
}