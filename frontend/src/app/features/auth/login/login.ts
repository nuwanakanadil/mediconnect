import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, HeartPulseIcon, MailIcon, LockIcon, ArrowRightIcon } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          const route = response.role === 'ADMIN' ? '/admin/dashboard' : '/patient/dashboard';
          this.router.navigate([route]);
        },
        error: (err) => {
          this.loading = false;
          if (err.error && typeof err.error === 'object') {
            if (err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              // Map-based validation errors
              this.errorMessage = Object.values(err.error).join(', ');
            }
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        }
      });
    }
  }
}