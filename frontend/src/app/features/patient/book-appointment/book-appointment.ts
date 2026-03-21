import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  SearchIcon,
  MapPinIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  LucideAngularModule,
} from 'lucide-angular';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  fee: number;
  image: string;
}

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css',
})
export class BookAppointmentComponent {
  readonly SearchIcon = SearchIcon;
  readonly MapPinIcon = MapPinIcon;
  readonly StarIcon = StarIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly ClockIcon = ClockIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;
  readonly ChevronRightIcon = ChevronRightIcon;
  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly CreditCardIcon = CreditCardIcon;

  step = 1;
  selectedSpecialty = '';
  selectedDoctor: Doctor | null = null;
  selectedDate = '2023-10-25';
  selectedTime = '';
  consultType: 'video' | 'in-person' = 'video';

  specialties = [
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'General Medicine',
    'Dentistry',
    'Ophthalmology',
  ];

  doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      hospital: 'Metro General Hospital',
      rating: 4.9,
      fee: 150,
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      hospital: 'City Medical Center',
      rating: 4.8,
      fee: 200,
      image:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  ];

  timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
  ];

  steps = [
    { num: 1, label: 'Specialty' },
    { num: 2, label: 'Doctor' },
    { num: 3, label: 'Date & Time' },
    { num: 4, label: 'Confirm' },
  ];

  constructor(private router: Router) {}

  handleNext() {
    this.step = Math.min(this.step + 1, 4);
  }

  handlePrev() {
    this.step = Math.max(this.step - 1, 1);
  }

  selectSpecialty(spec: string) {
    this.selectedSpecialty = spec;
    this.handleNext();
  }

  selectDoctor(doc: Doctor) {
    this.selectedDoctor = doc;
    this.handleNext();
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  handleConfirm() {
    this.router.navigate(['/checkout']);
  }

  progressWidth(): string {
    return `${((this.step - 1) / 3) * 100}%`;
  }

  isPastDay(day: number): boolean {
    return day < 24;
  }

  isSelectedDay(day: number): boolean {
    return day === 25;
  }
}