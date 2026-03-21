import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  SearchIcon,
  MapPinIcon,
  StarIcon,
  CalendarIcon,
  VideoIcon,
  FilterIcon,
  ChevronDownIcon,
  CheckCircle2Icon,
} from 'lucide-angular';

@Component({
  selector: 'app-find-doctors',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './find-doctors.html',
  styleUrl: './find-doctors.css',
})
export class FindDoctorsComponent {
  readonly SearchIcon = SearchIcon;
  readonly MapPinIcon = MapPinIcon;
  readonly StarIcon = StarIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly VideoIcon = VideoIcon;
  readonly FilterIcon = FilterIcon;
  readonly ChevronDownIcon = ChevronDownIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;

  isMobileFiltersOpen = false;

  specialties = [
    'All Specialties',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'General Medicine',
  ];

  doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      hospital: 'Metro General Hospital',
      rating: 4.9,
      reviews: 128,
      fee: 150,
      experience: '15 Years',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      availableToday: true,
      videoConsult: true,
      nextSlot: 'Today, 2:30 PM',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      hospital: 'City Medical Center',
      rating: 4.8,
      reviews: 95,
      fee: 200,
      experience: '12 Years',
      image:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      availableToday: false,
      videoConsult: true,
      nextSlot: 'Tomorrow, 10:00 AM',
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialty: 'Pediatrics',
      hospital: 'Childrens Care Clinic',
      rating: 5.0,
      reviews: 210,
      fee: 120,
      experience: '8 Years',
      image:
        'https://images.unsplash.com/photo-1594824432258-f9a11b228122?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      availableToday: true,
      videoConsult: false,
      nextSlot: 'Today, 4:15 PM',
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      hospital: 'Bone & Joint Center',
      rating: 4.7,
      reviews: 156,
      fee: 180,
      experience: '20 Years',
      image:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      availableToday: true,
      videoConsult: true,
      nextSlot: 'Today, 1:00 PM',
    },
    {
      id: 5,
      name: 'Dr. Lisa Patel',
      specialty: 'Dermatology',
      hospital: 'Skin Health Institute',
      rating: 4.9,
      reviews: 342,
      fee: 160,
      experience: '10 Years',
      image:
        'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      availableToday: false,
      videoConsult: true,
      nextSlot: 'Wed, 9:30 AM',
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      specialty: 'General Medicine',
      hospital: 'Family Health Clinic',
      rating: 4.6,
      reviews: 89,
      fee: 100,
      experience: '25 Years',
      image:
        'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      availableToday: true,
      videoConsult: false,
      nextSlot: 'Today, 11:45 AM',
    },
  ];

  toggleMobileFilters() {
    this.isMobileFiltersOpen = !this.isMobileFiltersOpen;
  }
}