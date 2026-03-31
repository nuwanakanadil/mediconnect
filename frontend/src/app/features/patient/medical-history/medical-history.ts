import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivityIcon,
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  LucideAngularModule,
  PlusIcon,
} from 'lucide-angular';
import { PatientService } from '../../../core/services/patient.service';
import { MedicalHistory } from '../../../core/models/patient.model';

@Component({
  selector: 'app-medical-history',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './medical-history.html',
  styleUrl: './medical-history.css',
})
export class MedicalHistoryComponent implements OnInit {
  readonly ActivityIcon = ActivityIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly ClockIcon = ClockIcon;
  readonly FileTextIcon = FileTextIcon;
  readonly PlusIcon = PlusIcon;

  history: MedicalHistory[] = [];
  loading = true;
  errorMessage = '';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.loading = true;
    this.patientService.getHistory().subscribe({
      next: (data: MedicalHistory[]) => {
        this.history = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load medical history.';
        this.loading = false;
      }
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString();
  }
}
