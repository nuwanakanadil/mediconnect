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
import { PatientService } from '../../../core/services/patient.service';
import { Appointment } from '../../../core/models/patient.model';

interface Doctor {
  id: string;
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
      id: 'doc-1',
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      hospital: 'Metro General Hospital',
      rating: 4.9,
      fee: 150,
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: 'doc-2',
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

  loading = false;
  errorMessage = '';

  constructor(private router: Router, private patientService: PatientService) {}

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
    if (!this.selectedDoctor || !this.selectedTime) return;

    this.loading = true;
    this.errorMessage = '';

    const appointment: Appointment = {
      doctorId: this.selectedDoctor.id,
      doctorName: this.selectedDoctor.name,
      specialization: this.selectedDoctor.specialty,
      dateTime: `${this.selectedDate}T${this.convertTo24Hour(this.selectedTime)}:00`,
      status: 'PENDING',
      type: this.consultType.toUpperCase() === 'VIDEO' ? 'VIDEO' : 'IN_PERSON',
      reason: 'General consultation'
    };

    this.patientService.bookAppointment(appointment).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/patient/appointments']);
      },
      error: (err) => {
        this.errorMessage = 'Failed to book appointment. Please try again.';
        this.loading = false;
      }
    });
  }

  private convertTo24Hour(time12h: string): string {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
    return `${hours.padStart(2, '0')}:${minutes}`;
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