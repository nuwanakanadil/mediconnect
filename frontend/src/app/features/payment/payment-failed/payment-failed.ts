import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AlertCircleIcon,
  CreditCardIcon,
  RotateCcwIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-payment-failed',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './payment-failed.html',
  styleUrl: './payment-failed.css',
})
export class PaymentFailedComponent {
  readonly AlertCircleIcon = AlertCircleIcon;
  readonly CreditCardIcon = CreditCardIcon;
  readonly RotateCcwIcon = RotateCcwIcon;
}