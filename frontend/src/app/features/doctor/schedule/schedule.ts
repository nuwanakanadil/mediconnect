import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  PlusIcon,
  Trash2Icon,
  CalendarIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class ScheduleComponent {
  readonly PlusIcon = PlusIcon;
  readonly Trash2Icon = Trash2Icon;
  readonly CalendarIcon = CalendarIcon;

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDay = 'Monday';

  timeSlots = [
    '09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM',
    '01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM',
  ];

  schedule: Record<string, { active: boolean; slots: string[] }> = {
    Monday: { active: true, slots: ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','02:00 PM','02:30 PM','03:00 PM'] },
    Tuesday: { active: true, slots: ['09:00 AM','09:30 AM','10:00 AM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM'] },
    Wednesday: { active: true, slots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'] },
    Thursday: { active: true, slots: ['09:00 AM', '09:30 AM', '10:00 AM', '02:00 PM', '02:30 PM'] },
    Friday: { active: true, slots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'] },
    Saturday: { active: false, slots: [] },
    Sunday: { active: false, slots: [] },
  };

  slotSelected(time: string) {
    return this.schedule[this.selectedDay].slots.includes(time);
  }
}