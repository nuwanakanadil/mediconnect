import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DownloadIcon,
  EyeIcon,
  FileIcon,
  FileTextIcon,
  FilterIcon,
  SearchIcon,
  Trash2Icon,
  UploadCloudIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-medical-reports',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './medical-reports.html',
  styleUrl: './medical-reports.css',
})
export class MedicalReportsComponent {
  readonly FileTextIcon = FileTextIcon;
  readonly UploadCloudIcon = UploadCloudIcon;
  readonly SearchIcon = SearchIcon;
  readonly FilterIcon = FilterIcon;
  readonly DownloadIcon = DownloadIcon;
  readonly EyeIcon = EyeIcon;
  readonly Trash2Icon = Trash2Icon;
  readonly FileIcon = FileIcon;

  reports = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC).pdf',
      type: 'Lab Result',
      date: 'Oct 10, 2023',
      doctor: 'Dr. Sarah Smith',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Chest X-Ray Scan.jpg',
      type: 'Imaging',
      date: 'Sep 15, 2023',
      doctor: 'Dr. Robert Taylor',
      size: '5.1 MB',
    },
    {
      id: 3,
      name: 'Lipid Panel Results.pdf',
      type: 'Lab Result',
      date: 'Aug 02, 2023',
      doctor: 'Dr. Sarah Smith',
      size: '1.8 MB',
    },
    {
      id: 4,
      name: 'Annual Physical Summary.pdf',
      type: 'Clinical Note',
      date: 'Jul 20, 2023',
      doctor: 'Dr. Robert Taylor',
      size: '3.2 MB',
    },
  ];

  isPdf(name: string): boolean {
    return name.endsWith('.pdf');
  }
}