import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  CreditCardIcon,
  LockIcon,
  ShieldCheckIcon,
  VideoIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutComponent {
  readonly CalendarIcon = CalendarIcon;
  readonly ClockIcon = ClockIcon;
  readonly CreditCardIcon = CreditCardIcon;
  readonly LockIcon = LockIcon;
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly VideoIcon = VideoIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;

  paymentMethod: 'card' | 'paypal' = 'card';

  constructor(private router: Router) {}

  setMethod(method: 'card' | 'paypal') {
    this.paymentMethod = method;
  }

  payNow() {
    this.router.navigate(['/payment-success']);
  }
}