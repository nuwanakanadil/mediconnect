import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CreditCardIcon,
  DownloadIcon,
  SearchIcon,
  TrendingUpIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class PaymentsComponent {
  readonly CreditCardIcon = CreditCardIcon;
  readonly DownloadIcon = DownloadIcon;
  readonly SearchIcon = SearchIcon;
  readonly TrendingUpIcon = TrendingUpIcon;

  payments = [
    {
      id: 'PAY-1001',
      user: 'Alex Johnson',
      description: 'Consultation - Dr. Sarah Smith',
      amount: '$155.00',
      date: 'Oct 25, 2023',
      status: 'paid',
    },
    {
      id: 'PAY-1002',
      user: 'Emily Chen',
      description: 'Consultation - Dr. Michael Chen',
      amount: '$205.00',
      date: 'Oct 24, 2023',
      status: 'pending',
    },
    {
      id: 'PAY-1003',
      user: 'James Wilson',
      description: 'Refund - Cancelled Appointment',
      amount: '$120.00',
      date: 'Oct 22, 2023',
      status: 'completed',
    },
  ];
}