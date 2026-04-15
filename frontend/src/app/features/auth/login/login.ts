import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../core/services/doctor.service';
import { LucideAngularModule, HeartPulseIcon, MailIcon, LockIcon, ArrowRightIcon } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  readonly HeartPulseIcon = HeartPulseIcon;
  readonly MailIcon = MailIcon;
  readonly LockIcon = LockIcon;
  readonly ArrowRightIcon = ArrowRightIcon;

  role: 'patient' | 'doctor' = 'patient';
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  setRole(role: 'patient' | 'doctor') {
    this.role = role;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = String(this.loginForm.value.email || '').trim().toLowerCase();
    this.isSubmitting = true;

    if (this.role === 'doctor') {
      this.doctorService.getAllDoctors().subscribe({
        next: (doctors) => {
          const matchedDoctor = doctors.find((d) => d.email.toLowerCase() === email);

          if (!matchedDoctor || !matchedDoctor.id) {
            this.isSubmitting = false;
            alert('Doctor account not found. Please register first.');
            return;
          }

          if (matchedDoctor.active === false) {
            this.isSubmitting = false;
            alert('This doctor account is deactivated. Please contact admin.');
            return;
          }

          localStorage.setItem('role', 'doctor');
          localStorage.setItem('doctorId', matchedDoctor.id);
          localStorage.setItem('doctorFirstName', matchedDoctor.firstName || '');
          localStorage.setItem('doctorLastName', matchedDoctor.lastName || '');

          this.isSubmitting = false;
          this.router.navigate(['/doctor/dashboard']);
        },
        error: () => {
          this.isSubmitting = false;
          alert('Unable to reach doctor service. Ensure backend is running on port 8083.');
        }
      });

      return;
    }

    localStorage.setItem('role', 'patient');
    localStorage.removeItem('doctorId');
    localStorage.removeItem('doctorFirstName');
    localStorage.removeItem('doctorLastName');
    this.isSubmitting = false;
    this.router.navigate(['/patient/dashboard']);
  }
}