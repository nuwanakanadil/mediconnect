import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoctorService, Doctor } from '../../../core/services/doctor.service';
import {
  LucideAngularModule,
  SearchIcon,
  MapPinIcon,
  StarIcon,
  CalendarIcon,
  VideoIcon,
  FilterIcon,
  ChevronDownIcon,
  CheckCircle2Icon,
} from 'lucide-angular';

@Component({
  selector: 'app-find-doctors',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './find-doctors.html',
  styleUrl: './find-doctors.css',
})
export class FindDoctorsComponent implements OnInit {
  readonly SearchIcon = SearchIcon;
  readonly MapPinIcon = MapPinIcon;
  readonly StarIcon = StarIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly VideoIcon = VideoIcon;
  readonly FilterIcon = FilterIcon;
  readonly ChevronDownIcon = ChevronDownIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;

  isMobileFiltersOpen = false;

  specialties = [
    'All Specialties',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'General Medicine',
  ];

  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        // Keep doctors visible when legacy records don't have an explicit active flag.
        // Only hide doctors that are explicitly deactivated.
        this.doctors = data.filter((d) => d.active !== false);
      },
      error: (err) => {
        console.error('Failed to load doctors from backend', err);
      }
    });
  }

  toggleMobileFilters() {
    this.isMobileFiltersOpen = !this.isMobileFiltersOpen;
  }
}