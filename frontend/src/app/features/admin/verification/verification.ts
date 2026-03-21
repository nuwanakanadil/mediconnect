import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CheckCircle2Icon,
  EyeIcon,
  ShieldCheckIcon,
  XCircleIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './verification.html',
  styleUrl: './verification.css',
})
export class VerificationComponent {
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;
  readonly XCircleIcon = XCircleIcon;
  readonly EyeIcon = EyeIcon;

  queue = [
    { name: 'Dr. Alan Moore', specialty: 'Neurology', submitted: 'Today', doc: 'license.pdf' },
    { name: 'Dr. Priya Nair', specialty: 'Dermatology', submitted: 'Yesterday', doc: 'credentials.pdf' },
    { name: 'Dr. Sam Patel', specialty: 'Pediatrics', submitted: 'Oct 24, 2023', doc: 'registration.pdf' },
  ];
}