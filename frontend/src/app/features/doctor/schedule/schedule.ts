import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../../core/services/doctor.service';
import {
  PlusIcon,
  Trash2Icon,
  CalendarIcon,
  SaveIcon,
  LucideAngularModule,
} from 'lucide-angular';

interface Schedule {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  maxAppointments: number;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class ScheduleComponent implements OnInit {
  readonly PlusIcon = PlusIcon;
  readonly Trash2Icon = Trash2Icon;
  readonly CalendarIcon = CalendarIcon;
  readonly SaveIcon = SaveIcon;

  days = [
    { display: 'Monday', value: 'MONDAY' },
    { display: 'Tuesday', value: 'TUESDAY' },
    { display: 'Wednesday', value: 'WEDNESDAY' },
    { display: 'Thursday', value: 'THURSDAY' },
    { display: 'Friday', value: 'FRIDAY' },
    { display: 'Saturday', value: 'SATURDAY' },
    { display: 'Sunday', value: 'SUNDAY' }
  ];
  selectedDay = 'MONDAY';

  doctorId: string | null = null;
  schedules: Schedule[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorId = localStorage.getItem('doctorId');
    if (!this.doctorId) {
      alert('Please create a profile first to set your schedule!');
      return;
    }

    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (doc) => {
        if(doc && doc.availability) {
          this.schedules = doc.availability;
        }
      },
      error: () => console.log('Could not load schedules.')
    });
  }

  get schedulesForDay() {
    return this.schedules.filter(s => s.dayOfWeek === this.selectedDay);
  }

  addTimeSlot() {
    this.schedules.push({
      dayOfWeek: this.selectedDay,
      startTime: '09:00:00',
      endTime: '17:00:00',
      maxAppointments: 10
    });
  }

  removeTimeSlot(schedule: Schedule) {
    this.schedules = this.schedules.filter(s => s !== schedule);
  }

  saveSchedule() {
    if(!this.doctorId) return;
    this.doctorService.updateDoctorSchedule(this.doctorId, this.schedules).subscribe({
      next: () => alert('Schedule saved to database!'),
      error: () => alert('Failed to save schedule.')
    });
  }
}