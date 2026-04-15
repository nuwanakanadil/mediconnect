import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { DoctorService, Doctor } from '../../../core/services/doctor.service';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css',
})
export class BookAppointmentComponent implements OnInit {
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

  doctors: Doctor[] = [];
  preselectedDoctorId = '';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.preselectedDoctorId = this.route.snapshot.queryParamMap.get('doctorId') ?? '';

    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        // Keep booking list aligned with public listing behavior.
        this.doctors = data.filter((d) => d.active !== false);

        if (this.preselectedDoctorId) {
          const matchedDoctor = this.doctors.find((d) => d.id === this.preselectedDoctorId);
          if (matchedDoctor) {
            this.selectedDoctor = matchedDoctor;
            this.selectedSpecialty = matchedDoctor.specialization;
            this.step = 3;
          }
        }
      },
      error: (err) => console.error('Failed to load doctors', err)
    });
  }

  get filteredDoctors() {
    if (!this.selectedSpecialty) return this.doctors;
    return this.doctors.filter(d => d.specialization === this.selectedSpecialty);
  }

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
    // Ideally this creates a pending AppointmentRequest in the backend
    this.router.navigate(['/payment/checkout']);
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