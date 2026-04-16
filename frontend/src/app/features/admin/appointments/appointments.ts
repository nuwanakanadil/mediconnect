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

  appointments: any[] = []; // Waiting for GET /api/appointments/requests endpoint for admin
}