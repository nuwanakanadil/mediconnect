import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  SearchIcon,
  UserIcon,
  UsersIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent {
  readonly SearchIcon = SearchIcon;
  readonly UserIcon = UserIcon;
  readonly UsersIcon = UsersIcon;

  users = [
    { name: 'Alex Johnson', role: 'patient', joined: 'Oct 2023', status: 'active' },
    { name: 'Dr. Sarah Smith', role: 'doctor', joined: 'Sep 2023', status: 'active' },
    { name: 'Admin User', role: 'admin', joined: 'Jan 2023', status: 'active' },
    { name: 'Lisa Patel', role: 'patient', joined: 'Aug 2023', status: 'inactive' },
  ];
}