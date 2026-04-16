import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService, Doctor } from '../../../core/services/doctor.service';
import {
  CheckCircle2Icon,
  EyeIcon,
  ShieldCheckIcon,
  XCircleIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './verification.html',
  styleUrl: './verification.css',
})
export class VerificationComponent implements OnInit {
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;
  readonly XCircleIcon = XCircleIcon;
  readonly EyeIcon = EyeIcon;

  queue: Doctor[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.queue = data.filter(d => !d.verified);
      },
      error: (err) => console.error('Failed to load verification queue', err)
    });
  }
}