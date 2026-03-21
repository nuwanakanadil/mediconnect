import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BrainIcon,
  ChevronRightIcon,
  SearchIcon,
  SparklesIcon,
  StethoscopeIcon,
  TriangleAlertIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-symptom-checker',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './symptom-checker.html',
  styleUrl: './symptom-checker.css',
})
export class SymptomCheckerComponent {
  readonly BrainIcon = BrainIcon;
  readonly SearchIcon = SearchIcon;
  readonly SparklesIcon = SparklesIcon;
  readonly StethoscopeIcon = StethoscopeIcon;
  readonly TriangleAlertIcon = TriangleAlertIcon;
  readonly ChevronRightIcon = ChevronRightIcon;

  symptoms = [
    'Headache',
    'Fever',
    'Chest Pain',
    'Cough',
    'Shortness of Breath',
    'Skin Rash',
    'Stomach Pain',
    'Dizziness',
  ];

  selectedSymptoms: string[] = ['Headache', 'Fever'];

  recommendations = [
    {
      title: 'General Medicine',
      desc: 'Suitable for common fever, headache, fatigue, and general illness symptoms.',
      doctors: '200+ doctors available',
    },
    {
      title: 'Neurology',
      desc: 'Recommended if symptoms involve recurring headaches, dizziness, or nerve-related concerns.',
      doctors: '60+ doctors available',
    },
  ];

  toggleSymptom(symptom: string) {
    if (this.selectedSymptoms.includes(symptom)) {
      this.selectedSymptoms = this.selectedSymptoms.filter((s) => s !== symptom);
    } else {
      this.selectedSymptoms = [...this.selectedSymptoms, symptom];
    }
  }

  isSelected(symptom: string) {
    return this.selectedSymptoms.includes(symptom);
  }
}