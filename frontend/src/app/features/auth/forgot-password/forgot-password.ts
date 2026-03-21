import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  HeartPulseIcon,
  MailIcon,
  ArrowLeftIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPasswordComponent {
  readonly HeartPulseIcon = HeartPulseIcon;
  readonly MailIcon = MailIcon;
  readonly ArrowLeftIcon = ArrowLeftIcon;
}