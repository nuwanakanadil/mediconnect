import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService, Doctor } from '../../../core/services/doctor.service';
import {
  BriefcaseIcon,
  MailIcon,
  PhoneIcon,
  SaveIcon,
  StethoscopeIcon,
  UserIcon,
  UploadIcon,
  FileTextIcon,
  CheckCircleIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent implements OnInit {
  readonly UserIcon = UserIcon;
  readonly MailIcon = MailIcon;
  readonly PhoneIcon = PhoneIcon;
  readonly SaveIcon = SaveIcon;
  readonly StethoscopeIcon = StethoscopeIcon;
  readonly BriefcaseIcon = BriefcaseIcon;
  readonly UploadIcon = UploadIcon;
  readonly FileTextIcon = FileTextIcon;
  readonly CheckCircleIcon = CheckCircleIcon;

  doctorId: string | null = null; 
  errorMessage = '';

  doctor: Doctor = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    qualification: '',
    experienceYears: 0,
    hospitalName: '',
    consultationFee: 0,
    bio: '',
    location: '',
    verificationDocuments: [],
    verified: false,
    active: true,
    availability: []
  };

  loading = true;
  private readonly loadTimeoutMs = 8000;

  constructor(
    private doctorService: DoctorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.doctorId = localStorage.getItem('doctorId');
    this.errorMessage = '';
    
    if (this.doctorId) {
      this.doctorService.getDoctorById(this.doctorId).subscribe({
        next: (data) => {
          if(data) {
            this.doctor = data;
            this.syncDoctorIdentityCache(data.firstName, data.lastName);
          }
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.warn('Stored doctor not found in DB. You can start fresh.', err);
          this.errorMessage = this.buildLoadErrorMessage(err);
          localStorage.removeItem('doctorId');
          this.doctorId = null;
          this.loading = false;
          this.cdr.detectChanges();
        }
      });

      // Fail-safe for network stalls to avoid infinite loading screen.
      setTimeout(() => {
        if (this.loading) {
          this.errorMessage = 'The doctor profile request is taking too long. Please check that the doctor-service backend is running on port 8083 and try again.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      }, this.loadTimeoutMs);
    } else {
      // New form completely empty to allow typing their own data
      this.errorMessage = 'No doctor account is linked to this session yet. Create or register a doctor profile first.';
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  retryLoadProfile() {
    this.loading = true;
    this.ngOnInit();
  }

  saveProfile() {
    if (this.doctorId) {
      // Update
      this.doctorService.updateDoctor(this.doctorId, this.doctor).subscribe({
        next: (updatedDoctor) => {
          alert('Profile formally updated in MongoDB!');
          this.doctor = updatedDoctor;
          this.syncDoctorIdentityCache(updatedDoctor.firstName, updatedDoctor.lastName);
        },
        error: (err) => {
          alert('Failed to update profile.');
        }
      });
    } else {
      // Create new doctor
      this.doctorService.createDoctor(this.doctor).subscribe({
        next: (newDoc) => {
          this.doctor = newDoc;
          this.syncDoctorIdentityCache(newDoc.firstName, newDoc.lastName);
          if (newDoc.id) {
            this.doctorId = newDoc.id;
            localStorage.setItem('doctorId', newDoc.id);
            alert('New Doctor Profile securely created in Database!');
          }
        },
        error: (err) => {
          alert('Failed to create profile. Is the backend running?');
        }
      });
    }
  }

  verifyProfile() {
    if(this.doctorId) {
      this.doctorService.verifyDoctor(this.doctorId).subscribe({
        next: (res) => {
          this.doctor.verified = true;
          alert('Doctor profile verified successfully.');
        },
        error: (err) => alert('Failed to verify profile.')
      });
    }
  }

  deactivateProfile() {
    if(this.doctorId) {
      this.doctorService.deactivateDoctor(this.doctorId).subscribe({
        next: (res) => {
          this.doctor.active = false;
          alert('Doctor profile deactivated.');
        },
        error: (err) => alert('Failed to deactivate profile.')
      });
    }
  }

  handleDocumentUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      if(!this.doctor.verificationDocuments) {
        this.doctor.verificationDocuments = [];
      }
      this.doctor.verificationDocuments.push(file.name);
    }
  }

  private syncDoctorIdentityCache(firstName?: string, lastName?: string) {
    localStorage.setItem('doctorFirstName', firstName ?? '');
    localStorage.setItem('doctorLastName', lastName ?? '');
  }

  private buildLoadErrorMessage(err: any): string {
    if (err?.status === 404) {
      return 'Your saved doctor profile was not found in the backend. Please save the profile again to create a fresh record.';
    }

    if (err?.status === 0) {
      return 'Cannot reach the doctor-service backend. Make sure it is running on http://localhost:8083 and that MongoDB is available.';
    }

    if (err?.error?.error) {
      return err.error.error;
    }

    return 'Failed to load the doctor profile. Please try again after checking the backend logs.';
  }
}