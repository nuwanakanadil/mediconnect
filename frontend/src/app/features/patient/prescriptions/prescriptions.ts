import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CalendarIcon,
  CheckCircle2Icon,
  DownloadIcon,
  PillIcon,
  UserIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';
import { PatientService } from '../../../core/services/patient.service';
import { Prescription } from '../../../core/models/patient.model';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './prescriptions.html',
  styleUrl: './prescriptions.css',
})
export class PrescriptionsComponent implements OnInit {
  readonly PillIcon = PillIcon;
  readonly DownloadIcon = DownloadIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly UserIcon = UserIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;

  prescriptions: Prescription[] = [];
  loading = true;
  errorMessage = '';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {
    this.loading = true;
    this.patientService.getPrescriptions().subscribe({
      next: (data: Prescription[]) => {
        this.prescriptions = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load prescriptions.';
        this.loading = false;
      }
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString();
  }
}