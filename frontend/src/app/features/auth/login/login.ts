import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, HeartPulseIcon, MailIcon, LockIcon, ArrowRightIcon } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  readonly HeartPulseIcon = HeartPulseIcon;
  readonly MailIcon = MailIcon;
  readonly LockIcon = LockIcon;
  readonly ArrowRightIcon = ArrowRightIcon;
}