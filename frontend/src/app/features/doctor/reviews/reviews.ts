import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  MessageSquareIcon,
  StarIcon,
  TrendingUpIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class ReviewsComponent {
  readonly StarIcon = StarIcon;
  readonly MessageSquareIcon = MessageSquareIcon;
  readonly TrendingUpIcon = TrendingUpIcon;

  reviews = [
    {
      patient: 'James Wilson',
      rating: 5,
      date: 'Oct 25, 2023',
      comment: 'Very professional and explained everything clearly. The video consultation was smooth and helpful.',
    },
    {
      patient: 'Emily Chen',
      rating: 4,
      date: 'Oct 20, 2023',
      comment: 'Great consultation experience. The doctor was patient and answered all my questions.',
    },
    {
      patient: 'Robert Taylor',
      rating: 5,
      date: 'Oct 14, 2023',
      comment: 'Excellent care and clear follow-up plan. Highly recommended.',
    },
  ];

  stars(count: number) {
    return Array.from({ length: count });
  }
}