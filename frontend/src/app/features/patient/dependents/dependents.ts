import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CalendarIcon,
  HeartIcon,
  PlusIcon,
  ShieldIcon,
  Trash2Icon,
  UserIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-dependents',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dependents.html',
  styleUrl: './dependents.css',
})
export class DependentsComponent {
  readonly UserIcon = UserIcon;
  readonly PlusIcon = PlusIcon;
  readonly Trash2Icon = Trash2Icon;
  readonly CalendarIcon = CalendarIcon;
  readonly HeartIcon = HeartIcon;
  readonly ShieldIcon = ShieldIcon;

  dependents = [
    {
      name: 'Emma Johnson',
      relationship: 'Daughter',
      age: 8,
      gender: 'Female',
      bloodType: 'A+',
      notes: 'Peanut allergy',
    },
    {
      name: 'Mary Johnson',
      relationship: 'Mother',
      age: 62,
      gender: 'Female',
      bloodType: 'O+',
      notes: 'Hypertension',
    },
  ];
}