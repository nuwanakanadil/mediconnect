import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  SearchIcon,
  FilterIcon,
  ChevronRightIcon,
  FileTextIcon,
  ActivityIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class PatientsComponent {
  readonly SearchIcon = SearchIcon;
  readonly FilterIcon = FilterIcon;
  readonly ChevronRightIcon = ChevronRightIcon;
  readonly FileTextIcon = FileTextIcon;
  readonly ActivityIcon = ActivityIcon;

  patients = [
    { id: 'PT-8492', name: 'James Wilson', age: 45, gender: 'Male', lastVisit: 'Oct 25, 2023', totalVisits: 4, phone: '+1 (555) 123-4567' },
    { id: 'PT-8381', name: 'Emily Chen', age: 28, gender: 'Female', lastVisit: 'Oct 10, 2023', totalVisits: 2, phone: '+1 (555) 987-6543' },
    { id: 'PT-8274', name: 'Robert Taylor', age: 62, gender: 'Male', lastVisit: 'Sep 28, 2023', totalVisits: 12, phone: '+1 (555) 456-7890' },
    { id: 'PT-8193', name: 'Lisa Patel', age: 34, gender: 'Female', lastVisit: 'Sep 15, 2023', totalVisits: 1, phone: '+1 (555) 234-5678' },
    { id: 'PT-8055', name: 'David Miller', age: 51, gender: 'Male', lastVisit: 'Aug 05, 2023', totalVisits: 6, phone: '+1 (555) 876-5432' },
  ];
}