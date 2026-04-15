import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../core/services/doctor.service';
import {
  LucideAngularModule,
  HeartPulseIcon,
  UserIcon,
  MailIcon,
  LockIcon,
  PhoneIcon,
  ArrowRightIcon,
  CheckIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  readonly HeartPulseIcon = HeartPulseIcon;
  readonly UserIcon = UserIcon;
  readonly MailIcon = MailIcon;
  readonly LockIcon = LockIcon;
  readonly PhoneIcon = PhoneIcon;
  readonly ArrowRightIcon = ArrowRightIcon;
  readonly CheckIcon = CheckIcon;

  role: 'patient' | 'doctor' = 'patient';
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  setRole(role: 'patient' | 'doctor') {
    this.role = role;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.registerForm.value;

    if (this.role === 'doctor') {
      const newDoctor = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        // Backend requires these, so provide defaults for registration
        specialization: 'General Practice',
        qualification: 'Medical Degree',
        experienceYears: 0,
        hospitalName: 'To be updated',
        consultationFee: 0,
        location: 'To be updated',
        bio: '',
        verificationDocuments: [],
        availability: []
      };

      this.doctorService.createDoctor(newDoctor).subscribe({
        next: (res) => {
          if (!res.id) {
            this.isSubmitting = false;
            alert('Doctor account was created without an ID. Please try again.');
            return;
          }

          localStorage.setItem('doctorId', res.id);
          localStorage.setItem('doctorFirstName', formValue.firstName ?? '');
          localStorage.setItem('doctorLastName', formValue.lastName ?? '');
          localStorage.setItem('role', 'doctor');
          this.isSubmitting = false;
          this.router.navigate(['/doctor/dashboard']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Registration failed', err);
          alert('Registration failed. Please check the console for details.');
        }
      });
    } else {
      // Patient registration logic (mocked for now as we don't have patient service)
      setTimeout(() => {
        this.isSubmitting = false;
        this.router.navigate(['/patient/dashboard']);
      }, 500);
    }
  }
}