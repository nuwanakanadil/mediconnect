import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReviewService, Review } from '../../../core/services/review.service';
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
export class ReviewsComponent implements OnInit {
  readonly StarIcon = StarIcon;
  readonly MessageSquareIcon = MessageSquareIcon;
  readonly TrendingUpIcon = TrendingUpIcon;

  reviews: Review[] = [];
  doctorId: string | null = null;
  averageRating = 0;

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.doctorId = localStorage.getItem('doctorId');
    if (this.doctorId) {
      this.reviewService.getReviewsByDoctorId(this.doctorId).subscribe({
        next: (data) => {
          this.reviews = data;
          this.calculateStats();
        },
        error: (err) => console.log('Backend not available or no reviews yet.', err)
      });
    }
  }

  calculateStats() {
    if (this.reviews.length === 0) {
      this.averageRating = 0;
      return;
    }
    const sum = this.reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    this.averageRating = sum / this.reviews.length;
  }

  stars(count: number) {
    return Array.from({ length: count });
  }
}