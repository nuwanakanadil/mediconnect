import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import {
  MailIcon,
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  SaveIcon,
  AlertCircleIcon,
  CameraIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent implements OnInit {
  readonly MailIcon = MailIcon;
  readonly PhoneIcon = PhoneIcon;
  readonly UserIcon = UserIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly MapPinIcon = MapPinIcon;
  readonly SaveIcon = SaveIcon;
  readonly AlertCircleIcon = AlertCircleIcon;
  readonly CameraIcon = CameraIcon;
  readonly ChevronDownIcon = ChevronDownIcon;
  readonly CheckCircleIcon = CheckCircleIcon;

  profileForm: FormGroup;
  patient?: Patient;
  loading = true;
  saving = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: [''],
      gender: [''],
      address: [''],
      bloodGroup: [''],
      emergencyContactName: [''],
      emergencyContactPhone: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    console.log('Starting profile load...');
    this.loading = true;

    this.patientService.getProfile()
      .pipe(
        finalize(() => {
          console.log('Profile request finalized.');
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Profile data received:', data);

          this.ngZone.run(() => {
            this.patient = data;
            if (data) {
              this.profileForm.patchValue(data);
            }
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          console.error('Failed to load profile:', err);

          this.ngZone.run(() => {
            this.errorMessage = 'Failed to load profile. Please try again.';
            this.cdr.detectChanges();
          });
        }
      });
  }

  onSubmit(): void {
    if (this.profileForm.valid && !this.saving) {
      this.saving = true;
      this.successMessage = '';
      this.errorMessage = '';

      const formValue = this.profileForm.getRawValue();
      console.log('Updating profile with data:', formValue);

      this.patientService.updateProfile(formValue).subscribe({
        next: (updated) => {
          this.ngZone.run(() => {
            console.log('Profile updated successfully:', updated);
            this.patient = updated;
            this.profileForm.patchValue(updated);
            this.saving = false;
            this.successMessage = 'Profile updated successfully!';
            this.cdr.detectChanges();

            setTimeout(() => {
              this.successMessage = '';
              this.cdr.detectChanges();
            }, 3000);
          });
        },
        error: (err) => {
          this.ngZone.run(() => {
            console.error('Failed to update profile:', err);
            this.errorMessage = 'Failed to update profile. Please try again.';
            this.saving = false;
            this.cdr.detectChanges();
          });
        },
      });
    }
  }

  getInitials(): string {
    if (!this.patient?.fullName) return 'PT';
    return this.patient.fullName
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}