import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { PatientService } from '../../../core/services/patient.service';

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

  registerForm: FormGroup;
  loading = false;
  success = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]],
      role: ['PATIENT']
    });
  }

  get role(): string {
    return this.registerForm.get('role')?.value;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const formValue = this.registerForm.value;
      const registrationData = {
        fullName: `${formValue.firstName} ${formValue.lastName}`,
        email: formValue.email,
        password: formValue.password,
        phone: formValue.phone
      };

      this.patientService.register(registrationData).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.loading = false;
          if (err.error && typeof err.error === 'object') {
            if (err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = Object.values(err.error).join(', ');
            }
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        }
      });
    }
  }
}