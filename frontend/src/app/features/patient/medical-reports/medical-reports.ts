import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  DownloadIcon,
  EyeIcon,
  FileIcon,
  FileTextIcon,
  FilterIcon,
  SearchIcon,
  Trash2Icon,
  UploadCloudIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { PatientService } from '../../../core/services/patient.service';
import { MedicalReport } from '../../../core/models/patient.model';

@Component({
  selector: 'app-medical-reports',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './medical-reports.html',
  styleUrl: './medical-reports.css',
})
export class MedicalReportsComponent implements OnInit {
  readonly FileTextIcon = FileTextIcon;
  readonly UploadCloudIcon = UploadCloudIcon;
  readonly SearchIcon = SearchIcon;
  readonly FilterIcon = FilterIcon;
  readonly DownloadIcon = DownloadIcon;
  readonly EyeIcon = EyeIcon;
  readonly Trash2Icon = Trash2Icon;
  readonly FileIcon = FileIcon;

  reports: MedicalReport[] = [];
  loading = true;
  uploading = false;
  errorMessage = '';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.patientService.getReports().subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load reports.';
        this.loading = false;
      }
    });
  }

  handleFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploading = true;
      const description = 'Uploaded by patient';
      this.patientService.uploadReport(file, description).subscribe({
        next: (report) => {
          this.reports.unshift(report);
          this.uploading = false;
        },
        error: (err) => {
          this.errorMessage = 'Upload failed. Please try again.';
          this.uploading = false;
        }
      });
    }
  }

  deleteReport(id: number): void {
    if (confirm('Are you sure you want to delete this report?')) {
      this.patientService.deleteReport(id).subscribe({
        next: () => {
          this.reports = this.reports.filter(r => r.id !== id);
        },
        error: (err) => {
          this.errorMessage = 'Delete failed.';
        }
      });
    }
  }

  isPdf(name: string): boolean {
    return name.toLowerCase().endsWith('.pdf');
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString();
  }
}