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
  fullName: string;
  specialization: string;
  hospital: string;
  hospitalName?: string;
  rating: number;
  consultingFee: number;
  bio: string;
  image?: string;
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
  selectedDate = new Date().toISOString().split('T')[0];
  selectedTime = '';
  consultType: 'video' | 'in-person' = 'video';
  
  // Calendar-specific properties
  viewDate = new Date();
  calendarDays: (number | null)[] = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  specialties = [
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'General Medicine',
    'Dentistry',
    'Ophthalmology',
    'Psychiatry',
    'Gastroenterology'
  ];

  doctors: Doctor[] = [];
  dummyDoctors: Doctor[] = [
    {
      id: 'd1',
      fullName: 'Dr. Aris Thorne',
      specialization: 'Cardiology',
      hospital: 'City Heart Institute',
      rating: 4.9,
      consultingFee: 150,
      bio: 'Board-certified cardiologist with over 15 years of experience in interventional cardiology.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'd2',
      fullName: 'Dr. Sarah Wilson',
      specialization: 'Dermatology',
      hospital: 'Skin & Beauty Clinic',
      rating: 4.8,
      consultingFee: 120,
      bio: 'Expert in medical and cosmetic dermatology, specializing in advanced laser treatments.',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'd3',
      fullName: 'Dr. Michael Chen',
      specialization: 'Neurology',
      hospital: 'Neurological Sciences Center',
      rating: 4.7,
      consultingFee: 200,
      bio: 'Specialist in neurological disorders with a focus on neurodegenerative diseases.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'd4',
      fullName: 'Dr. Emily Brown',
      specialization: 'Pediatrics',
      hospital: 'Children\'s Medical Center',
      rating: 4.9,
      consultingFee: 100,
      bio: 'Compassionate pediatrician dedicated to providing excellent care for children of all ages.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'd5',
      fullName: 'Dr. David Miller',
      specialization: 'Orthopedics',
      hospital: 'Joint & Spine Hospital',
      rating: 4.6,
      consultingFee: 180,
      bio: 'Orthopedic surgeon specializing in sports medicine and joint replacement surgeries.',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'd6',
      fullName: 'Dr. Lisa Ray',
      specialization: 'General Medicine',
      hospital: 'Community Health Center',
      rating: 4.5,
      consultingFee: 80,
      bio: 'General practitioner with a focus on holistic health and preventive medicine.',
      image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
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
  loadingDoctors = false;
  errorMessage = '';

  constructor(private router: Router, private patientService: PatientService) {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    
    // Fill leading empty days
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Fill days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    this.calendarDays = days;
  }

  prevMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  selectDate(day: number | null) {
    if (!day || this.isPastDay(day)) return;
    
    const year = this.viewDate.getFullYear();
    const month = String(this.viewDate.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    this.selectedDate = `${year}-${month}-${d}`;
  }

  handleNext() {
    if (this.step === 1 && this.selectedSpecialty) {
      this.step = 2;
    } else if (this.step === 2 && this.selectedDoctor) {
      this.step = 3;
    } else if (this.step === 3 && this.selectedDate && this.selectedTime) {
      this.step = 4;
    }
  }

  handlePrev() {
    if (this.step > 1) {
      this.step--;
    }
  }

  selectSpecialty(spec: string) {
    this.selectedSpecialty = spec;
    this.selectedDoctor = null; // Reset doctor selection when changing specialty
    this.loadingDoctors = true;
    this.errorMessage = '';
    this.doctors = [];

    this.patientService.getDoctorsBySpecialty(spec).subscribe({
      next: (data) => {
        // Filter dummy doctors by specialty if selected
        const filteredDummy = this.dummyDoctors.filter(d => d.specialization === spec);
        
        // Combine backend data with dummy data, ensuring dummy data is always present as requested
        this.doctors = [...data, ...filteredDummy].map(doc => ({
          ...doc,
          image: doc.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        }));

        // If even after combining we have no doctors, show all dummy doctors temporarily for demo purposes
        if (this.doctors.length === 0) {
          this.doctors = this.dummyDoctors.slice(0, 3);
        }
        this.loadingDoctors = false;
        this.step = 2;
      },
      error: (err) => {
        // Fallback to dummy data even on error to keep the flow moving
        this.doctors = this.dummyDoctors.filter(d => d.specialization === spec);
        if (this.doctors.length === 0) {
          this.doctors = this.dummyDoctors.slice(0, 3);
        }
        this.loadingDoctors = false;
        this.step = 2;
      }
    });
  }

  selectDoctor(doc: Doctor) {
    this.selectedDoctor = doc;
    this.selectedTime = ''; // Reset time selection when changing doctor
    this.step = 3; // Ensure we go to step 3
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
      doctorName: this.selectedDoctor.fullName,
      specialization: this.selectedDoctor.specialization,
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
        // Even if the backend fails, for this "finish flow" request, we might want to pretend it worked or show a better error
        console.error('Booking failed', err);
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), day);
    return dateToCheck < today;
  }

  isSelectedDay(day: number): boolean {
    if (!day) return false;
    const year = this.viewDate.getFullYear();
    const month = String(this.viewDate.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return this.selectedDate === `${year}-${month}-${d}`;
  }
}