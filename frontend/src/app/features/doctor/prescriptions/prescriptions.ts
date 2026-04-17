import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PrescriptionService, Prescription } from '../../../core/services/prescription.service';
import {
  DownloadIcon,
  PillIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  FileTextIcon,
  XIcon,
  EyeIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './prescriptions.html',
  styleUrl: './prescriptions.css',
})
export class PrescriptionsComponent implements OnInit {
  readonly SearchIcon = SearchIcon;
  readonly PlusIcon = PlusIcon;
  readonly UserIcon = UserIcon;
  readonly PillIcon = PillIcon;
  readonly DownloadIcon = DownloadIcon;
  readonly FileTextIcon = FileTextIcon;
  readonly XIcon = XIcon;
  readonly EyeIcon = EyeIcon;

  doctorId: string | null = null;
  prescriptions: Prescription[] = [];
  filteredPrescriptions: Prescription[] = [];
  searchTerm = '';
  
  // UI State
  showCreateModal = false;
  viewingPatientReports = false; // Toggle to view mocked patient reports
  isNotesOnlyContext = false;

  // New Prescription Model
  newPrescription: Prescription = {
    doctorId: '',
    patientId: '',
    appointmentId: '',
    medications: [],
    diagnosis: '',
    additionalNotes: ''
  };

  currentMedication = { name: '', dosage: '', frequency: '', durationDays: 0 };
  private notesContextFromRoute = false;

  constructor(
    private rxService: PrescriptionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const patientId = this.route.snapshot.queryParamMap.get('patientId') ?? '';
    const appointmentId = this.route.snapshot.queryParamMap.get('appointmentId') ?? '';
    const openCreateModal = this.route.snapshot.queryParamMap.get('openCreate') === '1';
    this.isNotesOnlyContext = this.route.snapshot.queryParamMap.get('mode') === 'notes';
    this.notesContextFromRoute = this.isNotesOnlyContext;

    if (patientId) {
      this.newPrescription.patientId = patientId;
    }

    if (appointmentId) {
      this.newPrescription.appointmentId = appointmentId;
    }

    if (openCreateModal) {
      this.showCreateModal = true;
    }

    this.doctorId = localStorage.getItem('doctorId');
    if(this.doctorId) {
      this.newPrescription.doctorId = this.doctorId;
      this.loadPrescriptions();
    }
  }

  loadPrescriptions() {
    this.rxService.getPrescriptionsByDoctorId(this.doctorId!).subscribe({
      next: (data) => {
        this.prescriptions = data;
        this.applySearch();
      },
      error: (err) => console.log('Backend not available or no prescriptions yet.', err)
    });
  }

  onSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
    this.applySearch();
  }

  private applySearch() {
    if (!this.searchTerm) {
      this.filteredPrescriptions = [...this.prescriptions];
      return;
    }

    this.filteredPrescriptions = this.prescriptions.filter((rx) => {
      const meds = (rx.medications || []).map((m) => `${m.name} ${m.dosage}`).join(' ');
      const text = `${rx.patientId} ${rx.appointmentId} ${rx.diagnosis} ${rx.additionalNotes} ${meds}`.toLowerCase();
      return text.includes(this.searchTerm);
    });
  }

  addMedication() {
    if (this.currentMedication.name) {
      if(!this.newPrescription.medications) {
        this.newPrescription.medications = [];
      }
      this.newPrescription.medications.push({...this.currentMedication});
      this.currentMedication = { name: '', dosage: '', frequency: '', durationDays: 0 };
    }
  }

  removeMedication(index: number) {
    this.newPrescription.medications.splice(index, 1);
  }

  openCreateModalForPrescription() {
    this.showCreateModal = true;
    this.isNotesOnlyContext = false;
    this.newPrescription.patientId = '';
    this.newPrescription.appointmentId = '';
    this.newPrescription.diagnosis = '';
    this.newPrescription.additionalNotes = '';
    this.newPrescription.medications = [];
    this.currentMedication = { name: '', dosage: '', frequency: '', durationDays: 0 };
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.currentMedication = { name: '', dosage: '', frequency: '', durationDays: 0 };

    if (this.notesContextFromRoute) {
      this.newPrescription.patientId = this.route.snapshot.queryParamMap.get('patientId') ?? '';
      this.newPrescription.appointmentId = this.route.snapshot.queryParamMap.get('appointmentId') ?? '';
      this.isNotesOnlyContext = true;
      return;
    }

    this.isNotesOnlyContext = false;
  }

  savePrescription() {
    if (!this.doctorId) {
      alert('Doctor session not found. Please log in again.');
      return;
    }

    if (!this.newPrescription.patientId.trim() || !this.newPrescription.appointmentId.trim()) {
      alert('Patient ID and Appointment ID are required.');
      return;
    }

    if (!this.newPrescription.diagnosis.trim()) {
      alert('Diagnosis is required before issuing a prescription.');
      return;
    }

    if (!this.newPrescription.medications || this.newPrescription.medications.length === 0) {
      alert('Add at least one medication.');
      return;
    }
    
    this.rxService.createPrescription(this.newPrescription).subscribe({
      next: (res) => {
        this.prescriptions = [res, ...this.prescriptions];
        this.applySearch();
        this.showCreateModal = false;
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to save prescription. Ensure database is running.');
      }
    });
  }

  saveConsultationNotes() {
    if (!this.doctorId) {
      alert('Doctor session not found. Please log in again.');
      return;
    }

    if (!this.newPrescription.patientId.trim() || !this.newPrescription.appointmentId.trim()) {
      alert('Patient ID and Appointment ID are required.');
      return;
    }

    if (!this.newPrescription.additionalNotes.trim()) {
      alert('Please enter consultation notes before saving.');
      return;
    }

    const payload: Prescription = {
      ...this.newPrescription,
      diagnosis: this.newPrescription.diagnosis?.trim() || 'Consultation Follow-up',
      medications: this.newPrescription.medications || []
    };

    this.rxService.createPrescription(payload).subscribe({
      next: (res) => {
        this.prescriptions = [res, ...this.prescriptions];
        this.applySearch();
        this.showCreateModal = false;
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to save consultation notes. Ensure database is running.');
      }
    });
  }

  resetForm() {
    this.newPrescription = {
      doctorId: this.doctorId ? this.doctorId : '', patientId: '', appointmentId: '', medications: [], diagnosis: '', additionalNotes: ''
    };
    this.viewingPatientReports = false;
    this.isNotesOnlyContext = false;
  }

  initials(name?: string) {
    if (!name) return 'PT';
    return `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] || ''}`.toUpperCase();
  }
}