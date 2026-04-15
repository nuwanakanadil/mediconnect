import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Doctor, DoctorService } from '../../../core/services/doctor.service';
import {
  CalendarIcon,
  CheckCircle2Icon,
  MapPinIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  UserIcon,
  VideoIcon,
  XCircleIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-doctor-public-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './doctor-public-profile.html',
  styleUrl: './doctor-public-profile.css',
})
export class DoctorPublicProfileComponent implements OnInit {
  readonly UserIcon = UserIcon;
  readonly StethoscopeIcon = StethoscopeIcon;
  readonly MapPinIcon = MapPinIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly VideoIcon = VideoIcon;
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;
  readonly XCircleIcon = XCircleIcon;

  loading = true;
  errorMessage = '';
  doctor: Doctor | null = null;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    const doctorId = this.route.snapshot.paramMap.get('id');

    if (!doctorId) {
      this.loading = false;
      this.errorMessage = 'Doctor id is missing from the URL.';
      return;
    }

    this.doctorService.getDoctorById(doctorId).subscribe({
      next: (data) => {
        this.doctor = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err?.status === 404) {
          this.errorMessage = 'Doctor profile not found.';
          return;
        }
        if (err?.status === 0) {
          this.errorMessage = 'Cannot reach backend. Ensure doctor-service is running on port 8083.';
          return;
        }
        this.errorMessage = 'Failed to load doctor profile.';
      },
    });
  }

  get fullName(): string {
    if (!this.doctor) {
      return 'Doctor';
    }
    return `Dr. ${this.doctor.firstName} ${this.doctor.lastName}`;
  }

  get hasAvailability(): boolean {
    return Array.isArray(this.doctor?.availability) && this.doctor!.availability.length > 0;
  }
}
