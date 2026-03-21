import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CalendarIcon,
  CheckCircle2Icon,
  DownloadIcon,
  PillIcon,
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
  readonly PillIcon = PillIcon;
  readonly DownloadIcon = DownloadIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly UserIcon = UserIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;

  prescriptions = [
    {
      id: 'RX-88492',
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      date: 'Oct 25, 2023',
      status: 'active',
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: '1 tablet daily',
          duration: '30 days',
        },
        {
          name: 'Atorvastatin',
          dosage: '20mg',
          frequency: '1 tablet at bedtime',
          duration: '30 days',
        },
      ],
      notes: 'Take with food. Monitor blood pressure weekly.',
    },
    {
      id: 'RX-77381',
      doctor: 'Dr. Robert Taylor',
      specialty: 'General Medicine',
      date: 'Sep 15, 2023',
      status: 'completed',
      medications: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: '1 capsule every 8 hours',
          duration: '7 days',
        },
        {
          name: 'Ibuprofen',
          dosage: '400mg',
          frequency: '1 tablet every 6 hours as needed for pain',
          duration: '5 days',
        },
      ],
      notes: 'Complete the full course of antibiotics even if feeling better.',
    },
  ];
}