import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CreditCardIcon,
  DownloadIcon,
  SearchIcon,
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
  readonly ArrowUpRightIcon = ArrowUpRightIcon;
  readonly ArrowDownLeftIcon = ArrowDownLeftIcon;

  transactions = [
    {
      id: 'TXN-99283',
      desc: 'Consultation - Dr. Sarah Smith',
      date: 'Oct 25, 2023',
      amount: 150.0,
      status: 'paid',
      type: 'payment',
    },
    {
      id: 'TXN-99102',
      desc: 'Consultation - Dr. Michael Chen',
      date: 'Oct 20, 2023',
      amount: 200.0,
      status: 'pending',
      type: 'payment',
    },
    {
      id: 'TXN-98944',
      desc: 'Refund - Cancelled Appointment',
      date: 'Oct 12, 2023',
      amount: 120.0,
      status: 'completed',
      type: 'refund',
    },
    {
      id: 'TXN-98721',
      desc: 'Consultation - Dr. Robert Taylor',
      date: 'Sep 15, 2023',
      amount: 100.0,
      status: 'paid',
      type: 'payment',
    },
  ];
}