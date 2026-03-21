import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DownloadIcon,
  PillIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './prescriptions.html',
  styleUrl: './prescriptions.css',
})
export class PrescriptionsComponent {
  readonly SearchIcon = SearchIcon;
  readonly PlusIcon = PlusIcon;
  readonly UserIcon = UserIcon;
  readonly PillIcon = PillIcon;
  readonly DownloadIcon = DownloadIcon;

  prescriptions = [
    {
      id: 'RX-88492',
      patient: 'James Wilson',
      date: 'Oct 25, 2023',
      status: 'active',
      meds: ['Lisinopril 10mg', 'Atorvastatin 20mg'],
    },
    {
      id: 'RX-77381',
      patient: 'Emily Chen',
      date: 'Oct 22, 2023',
      status: 'completed',
      meds: ['Amoxicillin 500mg', 'Ibuprofen 400mg'],
    },
    {
      id: 'RX-66412',
      patient: 'Robert Taylor',
      date: 'Oct 14, 2023',
      status: 'active',
      meds: ['Aspirin 75mg'],
    },
  ];

  initials(name: string) {
    return `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] || ''}`;
  }
}