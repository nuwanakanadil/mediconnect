import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  SearchIcon,
  FilterIcon,
  ChevronRightIcon,
  FileTextIcon,
  ActivityIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { AppointmentRequestService, AppointmentRequest } from '../../../core/services/appointment.service';
import { PatientRecordService } from '../../../core/services/patient-record.service';
import { PrescriptionService, Prescription } from '../../../core/services/prescription.service';
import { catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class PatientsComponent implements OnInit {
  readonly SearchIcon = SearchIcon;
  readonly FilterIcon = FilterIcon;
  readonly ChevronRightIcon = ChevronRightIcon;
  readonly FileTextIcon = FileTextIcon;
  readonly ActivityIcon = ActivityIcon;

  patients: any[] = [];
  filteredPatients: any[] = [];
  selectedPatient: any | null = null;
  searchTerm = '';
  doctorId: string | null = null;

  constructor(
    private apptService: AppointmentRequestService,
    private patientRecordService: PatientRecordService,
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit() {
    this.doctorId = localStorage.getItem('doctorId');
    if (this.doctorId) {
      this.apptService.getRequestsByDoctorId(this.doctorId).subscribe({
        next: (data) => this.extractPatients(data),
        error: (err) => console.error('Failed to load appointments for patients', err)
      });
    }
  }

  extractPatients(appointments: AppointmentRequest[]) {
    // Build a patient roster from accepted/completed consultations.
    const map = new Map<string, any>();
    appointments.forEach(apt => {
      if (apt.status === 'ACCEPTED' || apt.status === 'COMPLETED') {
        if (!map.has(apt.patientId)) {
          map.set(apt.patientId, {
            id: apt.patientId,
            name: apt.patientName || 'Patient ' + apt.patientId,
            age: 'N/A', // Patient Service missing here
            gender: 'Unknown',
            lastVisit: apt.appointmentDateTime,
            totalVisits: 1,
            phone: 'N/A',
            bloodType: 'N/A',
            allergies: [],
            currentMedications: [],
            notes: [apt.patientNotes].filter(Boolean)
          });
        } else {
          const p = map.get(apt.patientId);
          p.totalVisits += 1;
          if (new Date(apt.appointmentDateTime).getTime() > new Date(p.lastVisit).getTime()) {
            p.lastVisit = apt.appointmentDateTime;
          }
          if (apt.patientNotes) {
            p.notes.push(apt.patientNotes);
          }
        }
      }
    });

    this.patients = Array.from(map.values()).sort(
      (a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
    );
    this.filteredPatients = [...this.patients];
    this.selectedPatient = this.filteredPatients[0] || null;

    this.enrichPatientsWithProfileAndPrescriptions();
  }

  private enrichPatientsWithProfileAndPrescriptions() {
    if (!this.patients.length) {
      return;
    }

    const selectedPatientId = this.selectedPatient?.id;

    const requests = this.patients.map((patient) => {
      return forkJoin({
        profile: this.patientRecordService.getPatientById(patient.id),
        prescriptions: this.prescriptionService.getPrescriptionsByPatientId(patient.id).pipe(
          catchError(() => of([] as Prescription[]))
        )
      }).pipe(
        map(({ profile, prescriptions }) => {
          const fullName = this.getProfileName(profile);
          const currentMedications = this.buildMedicationSummary(prescriptions);

          return {
            ...patient,
            name: fullName || patient.name,
            age: profile?.age ?? patient.age,
            gender: profile?.gender ?? patient.gender,
            phone: profile?.phone ?? patient.phone,
            bloodType: profile?.bloodType ?? patient.bloodType,
            allergies: profile?.allergies ?? patient.allergies,
            currentMedications: currentMedications.length ? currentMedications : patient.currentMedications,
          };
        })
      );
    });

    forkJoin(requests).subscribe({
      next: (enrichedPatients) => {
        this.patients = enrichedPatients;
        this.filteredPatients = this.applyCurrentSearch(enrichedPatients, this.searchTerm);
        this.selectedPatient = this.filteredPatients.find((p) => p.id === selectedPatientId)
          || this.filteredPatients[0]
          || null;
      },
      error: (err) => console.warn('Patient enrichment failed, using appointment-only data.', err)
    });
  }

  private getProfileName(profile: any): string {
    if (!profile) return '';
    if (profile.fullName) return profile.fullName;

    const first = profile.firstName || '';
    const last = profile.lastName || '';
    const full = `${first} ${last}`.trim();
    return full;
  }

  private buildMedicationSummary(prescriptions: Prescription[]): string[] {
    if (!prescriptions?.length) {
      return [];
    }

    const meds = prescriptions
      .flatMap((rx) => rx.medications || [])
      .map((m) => `${m.name} ${m.dosage}`.trim())
      .filter(Boolean);

    return Array.from(new Set(meds));
  }

  private applyCurrentSearch(patients: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return [...patients];
    }

    const lowered = searchTerm.trim().toLowerCase();
    return patients.filter((p) => {
      const text = `${p.id} ${p.name}`.toLowerCase();
      return text.includes(lowered);
    });
  }

  onSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
    this.filteredPatients = this.applyCurrentSearch(this.patients, this.searchTerm);

    if (!this.selectedPatient && this.filteredPatients.length > 0) {
      this.selectedPatient = this.filteredPatients[0];
    }
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
  }

  initials(name: string) {
    if (!name) return 'PT';
    const parts = name.split(' ');
    return `${parts[0][0]}${parts[1]?.[0] || ''}`.toUpperCase();
  }
}