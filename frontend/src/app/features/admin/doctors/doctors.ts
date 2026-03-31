import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  SearchIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  AlertTriangleIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { AdminService, Doctor } from '../../../core/services/admin.service';

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
  readonly AlertTriangleIcon = AlertTriangleIcon;

  doctors: Doctor[] = [];
  loading = true;
  errorMessage = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.adminService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load doctors.';
        this.loading = false;
      }
    });
  }

  verifyDoctor(id: string, status: string): void {
    this.adminService.verifyDoctor(id, status).subscribe({
      next: (updatedDoctor) => {
        this.doctors = this.doctors.map(d => d.id === id ? updatedDoctor : d);
      },
      error: (err) => {
        this.errorMessage = 'Verification failed.';
      }
    });
  }
}