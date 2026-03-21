import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  SearchIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class DoctorsComponent {
  readonly SearchIcon = SearchIcon;
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly StethoscopeIcon = StethoscopeIcon;

  doctors = [
    { name: 'Dr. Sarah Smith', specialty: 'Cardiology', hospital: 'Metro General Hospital', status: 'verified' },
    { name: 'Dr. Michael Chen', specialty: 'Neurology', hospital: 'City Medical Center', status: 'verified' },
    { name: 'Dr. Lisa Patel', specialty: 'Dermatology', hospital: 'Skin Health Institute', status: 'pending' },
  ];
}