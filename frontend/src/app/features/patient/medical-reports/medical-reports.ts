import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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
import { finalize } from 'rxjs';

import { PatientService } from '../../../core/services/patient.service';
import { SupabaseService } from '../../../core/services/supabase.service';
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

  constructor(
    private patientService: PatientService,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.errorMessage = '';

    this.patientService
      .getReports()
      .pipe(
        finalize(() => {
          this.ngZone.run(() => {
            this.loading = false;
            this.cdr.detectChanges();
          });
        })
      )
      .subscribe({
        next: (data: MedicalReport[]) => {
          this.ngZone.run(() => {
            this.reports = data || [];
            this.cdr.detectChanges();
          });
        },
        error: (err: any) => {
          console.error('Failed to load reports:', err);

          this.ngZone.run(() => {
            this.errorMessage = 'Failed to load reports.';
            this.reports = [];
            this.cdr.detectChanges();
          });
        },
      });
  }

  async handleFileUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.ngZone.run(() => {
      this.uploading = true;
      this.errorMessage = '';
      this.cdr.detectChanges();
    });

    try {
      console.log('Uploading file to Supabase...');
      const publicUrl = await this.supabaseService.uploadFile(file);
      console.log('File uploaded to Supabase:', publicUrl);

      const metadata = {
        fileName: file.name,
        originalFileName: file.name,
        fileType: file.type,
        fileUrl: publicUrl,
        description: 'Uploaded via MediConnect',
      };

      this.patientService
        .saveReportMetadata(metadata)
        .pipe(
          finalize(() => {
            this.ngZone.run(() => {
              this.uploading = false;
              this.cdr.detectChanges();
            });
          })
        )
        .subscribe({
          next: (report: MedicalReport) => {
            console.log('Metadata saved to backend:', report);

            this.ngZone.run(() => {
              this.reports = [report, ...this.reports];
              input.value = '';
              this.cdr.detectChanges();
            });
          },
          error: (err: any) => {
            console.error('Failed to save metadata:', err);

            this.ngZone.run(() => {
              this.errorMessage = 'Failed to record report in system.';
              this.cdr.detectChanges();
            });
          },
        });
    } catch (error: any) {
      console.error('Supabase upload error:', error);

      this.ngZone.run(() => {
        this.errorMessage = 'Failed to upload file to storage.';
        this.uploading = false;
        this.cdr.detectChanges();
      });
    }
  }

  deleteReport(id: string): void {
    if (!confirm('Are you sure you want to delete this report?')) return;

    this.errorMessage = '';

    this.patientService.deleteReport(id).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.reports = this.reports.filter(
            (report) => report.id.toString() !== id.toString()
          );
          this.cdr.detectChanges();
        });
      },
      error: (err: any) => {
        console.error('Delete failed:', err);

        this.ngZone.run(() => {
          this.errorMessage = 'Delete failed.';
          this.cdr.detectChanges();
        });
      },
    });
  }

  isPdf(name: string): boolean {
    return name.toLowerCase().endsWith('.pdf');
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString();
  }
}