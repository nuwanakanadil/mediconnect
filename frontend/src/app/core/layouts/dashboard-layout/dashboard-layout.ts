import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
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
  imports: [CommonModule, RouterLink, RouterOutlet, LucideAngularModule],
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

  userData: any;
  currentNavItems: any[] = [];
  cachedInitials: string = '';
  cachedDisplayName: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.route.data.subscribe((data) => {
      const newRole = (data['role'] ?? 'patient') as Role;
      if (this.role !== newRole || this.currentNavItems.length === 0) {
        this.role = newRole;
        this.updateNavItems();
      }
    });
    this.loadUserData();
  }

  updateNavItems() {
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
    this.currentNavItems = navigationConfig[this.role] ?? [];
  }

  loadUserData() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userData = JSON.parse(user);
      this.updateCachedProfileInfo();
    }
  }

  updateCachedProfileInfo() {
    if (this.userData?.fullName) {
      this.cachedDisplayName = this.userData.fullName;
      this.cachedInitials = this.userData.fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    } else {
      const defaultInfo = {
        patient: { name: 'Patient User', init: 'PT' },
        doctor: { name: 'Doctor User', init: 'DR' },
        admin: { name: 'Admin User', init: 'AD' }
      };
      const info = defaultInfo[this.role] || defaultInfo.patient;
      this.cachedDisplayName = info.name;
      this.cachedInitials = info.init;
    }
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
    this.router.navigate(['/login']);
  }

  get displayName() {
    return this.cachedDisplayName;
  }

  get initials() {
    return this.cachedInitials;
  }
}