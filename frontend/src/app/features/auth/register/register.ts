import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  imports: [CommonModule, RouterLink, LucideAngularModule],
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

  setRole(role: 'patient' | 'doctor') {
    this.role = role;
  }
}