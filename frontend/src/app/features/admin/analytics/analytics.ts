import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BarChart3Icon,
  CalendarIcon,
  DollarSignIcon,
  PieChartIcon,
  TrendingUpIcon,
  UsersIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class AnalyticsComponent {
  readonly BarChart3Icon = BarChart3Icon;
  readonly CalendarIcon = CalendarIcon;
  readonly DollarSignIcon = DollarSignIcon;
  readonly PieChartIcon = PieChartIcon;
  readonly TrendingUpIcon = TrendingUpIcon;
  readonly UsersIcon = UsersIcon;

  specialties = [
    { name: 'General Medicine', count: 420 },
    { name: 'Cardiology', count: 285 },
    { name: 'Pediatrics', count: 260 },
    { name: 'Dermatology', count: 210 },
  ];
}