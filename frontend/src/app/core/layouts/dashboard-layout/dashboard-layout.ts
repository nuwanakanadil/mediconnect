import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  ActivityIcon,
  BarChart3Icon,
  BellIcon,
  CalendarIcon,
  CreditCardIcon,
  FileTextIcon,
  HeartPulseIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  PillIcon,
  SearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
  VideoIcon,
  XIcon,
  LucideAngularModule,
} from 'lucide-angular';

type Role = 'patient' | 'doctor' | 'admin';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, LucideAngularModule],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayoutComponent {
  readonly HeartPulseIcon = HeartPulseIcon;
  readonly LayoutDashboardIcon = LayoutDashboardIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly FileTextIcon = FileTextIcon;
  readonly PillIcon = PillIcon;
  readonly CreditCardIcon = CreditCardIcon;
  readonly BellIcon = BellIcon;
  readonly UserIcon = UserIcon;
  readonly UsersIcon = UsersIcon;
  readonly SearchIcon = SearchIcon;
  readonly LogOutIcon = LogOutIcon;
  readonly SettingsIcon = SettingsIcon;
  readonly ActivityIcon = ActivityIcon;
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly VideoIcon = VideoIcon;
  readonly BarChart3Icon = BarChart3Icon;
  readonly MenuIcon = MenuIcon;
  readonly XIcon = XIcon;

  role: Role = 'patient';
  isMobileSidebarOpen = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.route.data.subscribe((data) => {
      this.role = (data['role'] ?? 'patient') as Role;
    });
  }

  get navItems() {
    const navigationConfig = {
      patient: [
        { name: 'Dashboard', path: '/patient/dashboard', icon: this.LayoutDashboardIcon },
        { name: 'Appointments', path: '/patient/appointments', icon: this.CalendarIcon },
        { name: 'Medical Reports', path: '/patient/medical-reports', icon: this.FileTextIcon },
        { name: 'Prescriptions', path: '/patient/prescriptions', icon: this.PillIcon },
        { name: 'Payments', path: '/patient/payments', icon: this.CreditCardIcon },
        { name: 'Dependents', path: '/patient/dependents', icon: this.UsersIcon },
        { name: 'Profile', path: '/patient/profile', icon: this.UserIcon },
      ],
      doctor: [
        { name: 'Dashboard', path: '/doctor/dashboard', icon: this.LayoutDashboardIcon },
        { name: 'Schedule', path: '/doctor/schedule', icon: this.CalendarIcon },
        { name: 'Appointments', path: '/doctor/appointments', icon: this.ActivityIcon },
        { name: 'Patients', path: '/doctor/patients', icon: this.UsersIcon },
        { name: 'Consultations', path: '/doctor/consultations', icon: this.VideoIcon },
        { name: 'Prescriptions', path: '/doctor/prescriptions', icon: this.PillIcon },
        { name: 'Reviews', path: '/doctor/reviews', icon: this.SearchIcon },
        { name: 'Profile', path: '/doctor/profile', icon: this.UserIcon },
      ],
      admin: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: this.LayoutDashboardIcon },
        { name: 'Users', path: '/admin/users', icon: this.UsersIcon },
        { name: 'Doctors', path: '/admin/doctors', icon: this.UserIcon },
        { name: 'Verification', path: '/admin/verification', icon: this.ShieldCheckIcon },
        { name: 'Appointments', path: '/admin/appointments', icon: this.CalendarIcon },
        { name: 'Payments', path: '/admin/payments', icon: this.CreditCardIcon },
        { name: 'Analytics', path: '/admin/analytics', icon: this.BarChart3Icon },
        { name: 'Settings', path: '/admin/settings', icon: this.SettingsIcon },
      ],
    };

    return navigationConfig[this.role] ?? [];
  }

  isActive(path: string) {
    return this.router.url.startsWith(path);
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }

  openMobileSidebar() {
    this.isMobileSidebarOpen = true;
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('doctorId');
    localStorage.removeItem('doctorFirstName');
    localStorage.removeItem('doctorLastName');
    this.router.navigate(['/login']);
  }

  get displayName() {
    if (this.role === 'patient') return 'Alex Johnson';
    if (this.role === 'doctor') {
      const firstName = (localStorage.getItem('doctorFirstName') || '').trim();
      const lastName = (localStorage.getItem('doctorLastName') || '').trim();

      if (firstName || lastName) {
        return `Dr. ${firstName} ${lastName}`.trim();
      }

      return 'Doctor';
    }
    return 'Admin User';
  }

  get initials() {
    if (this.role === 'patient') return 'AJ';
    if (this.role === 'doctor') {
      const firstName = (localStorage.getItem('doctorFirstName') || '').trim();
      const lastName = (localStorage.getItem('doctorLastName') || '').trim();

      const first = firstName ? firstName.charAt(0).toUpperCase() : 'D';
      const second = lastName ? lastName.charAt(0).toUpperCase() : 'R';
      return `${first}${second}`;
    }
    return 'AU';
  }
}