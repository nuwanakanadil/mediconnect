import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule, HeartPulseIcon, MenuIcon, XIcon } from 'lucide-angular';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, RouterLinkActive, RouterOutlet, LucideAngularModule],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayoutComponent {
  readonly HeartPulseIcon = HeartPulseIcon;
  readonly MenuIcon = MenuIcon;
  readonly XIcon = XIcon;

  isMobileMenuOpen = false;

  navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Doctors', path: '/find-doctors' },
    { name: 'Symptom Checker', path: '/symptom-checker' },
  ];

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}