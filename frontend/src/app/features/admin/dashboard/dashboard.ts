import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivityIcon,
  AlertTriangleIcon,
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  UsersIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  readonly UsersIcon = UsersIcon;
  readonly StethoscopeIcon = StethoscopeIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly DollarSignIcon = DollarSignIcon;
  readonly AlertTriangleIcon = AlertTriangleIcon;
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly CreditCardIcon = CreditCardIcon;
  readonly ActivityIcon = ActivityIcon;

  stats = [
    { title: 'Total Patients', value: '50,482', icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Doctors', value: '684', icon: StethoscopeIcon, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Appointments', value: '12,948', icon: CalendarIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Revenue', value: '$84,220', icon: DollarSignIcon, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  activities = [
    { title: 'New doctor registration submitted', meta: 'Dr. Alan Moore • 10 mins ago', level: 'info' },
    { title: 'Payment gateway issue detected', meta: 'Checkout service • 25 mins ago', level: 'warning' },
    { title: 'Doctor verification approved', meta: 'Dr. Sarah Smith • 1 hour ago', level: 'success' },
    { title: 'High cancellation rate alert', meta: 'Orthopedics • Today', level: 'warning' },
  ];

  transactions = [
    { id: 'TXN-1001', type: 'Consultation', amount: '$155.00', status: 'paid' },
    { id: 'TXN-1002', type: 'Refund', amount: '$120.00', status: 'completed' },
    { id: 'TXN-1003', type: 'Consultation', amount: '$205.00', status: 'pending' },
  ];
}