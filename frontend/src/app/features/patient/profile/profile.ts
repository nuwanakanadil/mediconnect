import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MailIcon,
  PhoneIcon,
  SaveIcon,
  UserIcon,
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
  readonly UserIcon = UserIcon;
  readonly MailIcon = MailIcon;
  readonly PhoneIcon = PhoneIcon;
  readonly SaveIcon = SaveIcon;

  profileForm: FormGroup;
  patient?: Patient;
  loading = true;
  saving = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
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
    this.loading = true;
    this.patientService.getProfile().subscribe({
      next: (data) => {
        this.patient = data;
        this.profileForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile. Please try again.';
        this.loading = false;
      }
    });
  }

  saveProfile(): void {
    if (this.profileForm.valid && !this.saving) {
      this.saving = true;
      this.successMessage = '';
      this.errorMessage = '';
      
      this.patientService.updateProfile(this.profileForm.getRawValue()).subscribe({
        next: (updated) => {
          this.patient = updated;
          this.saving = false;
          this.successMessage = 'Profile updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to update profile. Please try again.';
          this.saving = false;
        }
      });
    }
  }

  getInitials(): string {
    if (!this.patient?.fullName) return 'SJ';
    return this.patient.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
}