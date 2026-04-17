import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideAngularModule, HeartPulseIcon, MailIcon, LockIcon, ArrowRightIcon } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';
import { DoctorService } from '../../../core/services/doctor.service';

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

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  loginMode: 'patient' | 'doctor' = 'patient';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const role = this.route.snapshot.queryParamMap.get('role');
    this.loginMode = role === 'doctor' ? 'doctor' : 'patient';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      if (this.loginMode === 'doctor') {
        const payload = {
          email: String(this.loginForm.value.email || '').trim(),
          password: String(this.loginForm.value.password || '')
        };

        this.doctorService.loginDoctor(payload).subscribe({
          next: (response) => {
            localStorage.setItem('role', 'doctor');
            localStorage.setItem('doctorId', response.doctorId);
            localStorage.setItem('doctorFirstName', response.firstName || '');
            localStorage.setItem('doctorLastName', response.lastName || '');
            localStorage.setItem(
              'user',
              JSON.stringify({
                email: response.email,
                role: response.role,
                fullName: response.fullName
              })
            );

            this.loading = false;
            this.router.navigate(['/doctor/dashboard']);
          },
          error: (err) => {
            this.loading = false;
            if (err.error && typeof err.error === 'object' && err.error.error) {
              this.errorMessage = err.error.error;
            } else {
              this.errorMessage = 'Doctor sign-in failed. Please check credentials.';
            }
          }
        });

        return;
      }

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          const role = (response?.role || 'PATIENT').toUpperCase();
          const route = role === 'ADMIN' ? '/admin/dashboard' : '/patient/dashboard';
          this.router.navigate([route]);
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
            this.errorMessage = 'Invalid email or password';
          }
        }
      });
    }
  }

  setLoginMode(mode: 'patient' | 'doctor'): void {
    this.loginMode = mode;
    this.errorMessage = '';
  }
}