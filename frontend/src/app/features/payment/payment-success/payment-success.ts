import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CalendarIcon,
  CheckCircle2Icon,
  DownloadIcon,
  HomeIcon,
  VideoIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css',
})
export class PaymentSuccessComponent {
  readonly CheckCircle2Icon = CheckCircle2Icon;
  readonly CalendarIcon = CalendarIcon;
  readonly DownloadIcon = DownloadIcon;
  readonly HomeIcon = HomeIcon;
  readonly VideoIcon = VideoIcon;
}