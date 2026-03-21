import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadgeComponent {
  @Input() status = '';

  get badgeClasses(): string {
    const value = this.status.toLowerCase();

    if (value === 'confirmed') {
      return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    }

    if (value === 'pending') {
      return 'bg-amber-100 text-amber-700 border border-amber-200';
    }

    if (value === 'cancelled') {
      return 'bg-rose-100 text-rose-700 border border-rose-200';
    }

    if (value === 'completed') {
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    }

    if (value === 'paid') {
      return 'bg-purple-100 text-purple-700 border border-purple-200';
    }

    return 'bg-slate-100 text-slate-700 border border-slate-200';
  }

  get label(): string {
    if (!this.status) return '';
    return this.status.charAt(0).toUpperCase() + this.status.slice(1);
  }
}