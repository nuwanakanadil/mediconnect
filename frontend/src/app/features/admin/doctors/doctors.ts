import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService, Doctor } from '../../../core/services/doctor.service';
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
export class DoctorsComponent implements OnInit {
  readonly SearchIcon = SearchIcon;
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly StethoscopeIcon = StethoscopeIcon;

  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (err) => {
        console.error('Failed to load doctors in admin panel', err);
      }
    });
  }
}