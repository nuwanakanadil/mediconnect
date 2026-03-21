import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  SearchIcon,
  CalendarIcon,
  VideoIcon,
  FileTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  HeartIcon,
  ActivityIcon,
  StethoscopeIcon,
  BrainIcon,
  BabyIcon,
  EyeIcon,
  BoneIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
} from 'lucide-angular';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgFor, RouterLink, LucideAngularModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingComponent {
  readonly SearchIcon = SearchIcon;
  readonly StarIcon = StarIcon;
  readonly ArrowRightIcon = ArrowRightIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;

  patientAvatars = [1, 2, 3, 4];

  features = [
    {
      icon: CalendarIcon,
      title: 'Online Booking',
      desc: 'Book appointments instantly with your preferred doctors without waiting in queues.',
    },
    {
      icon: VideoIcon,
      title: 'Video Consultations',
      desc: 'Consult with top specialists from the comfort of your home via secure video calls.',
    },
    {
      icon: FileTextIcon,
      title: 'Digital Prescriptions',
      desc: 'Receive and manage your prescriptions digitally. Never lose a paper prescription again.',
    },
    {
      icon: HeartIcon,
      title: 'Medical Records',
      desc: 'Store and access your medical history, test reports, and scans securely in one place.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Payments',
      desc: 'Pay for consultations safely using our encrypted payment gateway.',
    },
    {
      icon: ClockIcon,
      title: '24/7 Support',
      desc: 'Get assistance anytime with our round-the-clock customer support team.',
    },
  ];

  steps = [
    {
      step: '01',
      title: 'Search Doctor',
      desc: 'Find the right specialist by specialty, location, or rating.',
    },
    {
      step: '02',
      title: 'Book Slot',
      desc: 'Choose a convenient date and time for your consultation.',
    },
    {
      step: '03',
      title: 'Consult',
      desc: 'Visit the clinic or join a secure video call with the doctor.',
    },
    {
      step: '04',
      title: 'Get Prescription',
      desc: 'Receive your digital prescription and follow-up instructions.',
    },
  ];

  specialties = [
    { icon: HeartIcon, name: 'Cardiology', count: '120+ Doctors' },
    { icon: ActivityIcon, name: 'Dermatology', count: '85+ Doctors' },
    { icon: BrainIcon, name: 'Neurology', count: '60+ Doctors' },
    { icon: BoneIcon, name: 'Orthopedics', count: '95+ Doctors' },
    { icon: BabyIcon, name: 'Pediatrics', count: '110+ Doctors' },
    { icon: EyeIcon, name: 'Ophthalmology', count: '75+ Doctors' },
    { icon: StethoscopeIcon, name: 'General Medicine', count: '200+ Doctors' },
    { icon: ActivityIcon, name: 'Dentistry', count: '90+ Doctors' },
  ];
}