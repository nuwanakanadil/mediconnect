import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CalendarIcon,
  HeartIcon,
  PlusIcon,
  ShieldIcon,
  Trash2Icon,
  UserIcon,
  LucideAngularModule,
  XIcon,
} from 'lucide-angular';
import { finalize } from 'rxjs';

import { PatientService } from '../../../core/services/patient.service';
import { Dependent } from '../../../core/models/patient.model';

@Component({
  selector: 'app-dependents',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './dependents.html',
  styleUrl: './dependents.css',
})
export class DependentsComponent implements OnInit {
  readonly UserIcon = UserIcon;
  readonly PlusIcon = PlusIcon;
  readonly Trash2Icon = Trash2Icon;
  readonly CalendarIcon = CalendarIcon;
  readonly HeartIcon = HeartIcon;
  readonly ShieldIcon = ShieldIcon;
  readonly XIcon = XIcon;

  dependents: Dependent[] = [];
  loading = false;
  error = '';

  showModal = false;
  submitting = false;
  editMode = false;
  currentId: string | null = null;
  dependentForm: FormGroup;

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.dependentForm = this.fb.group({
      name: ['', [Validators.required]],
      relationship: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      bloodType: ['', [Validators.required]],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.loadDependents();
  }

  loadDependents(): void {
    this.loading = true;
    this.error = '';

    this.patientService
      .getDependents()
      .pipe(
        finalize(() => {
          this.ngZone.run(() => {
            this.loading = false;
            this.cdr.detectChanges();
          });
        })
      )
      .subscribe({
        next: (data: Dependent[]) => {
          this.ngZone.run(() => {
            this.dependents = data || [];
            this.cdr.detectChanges();
          });
        },
        error: (err: any) => {
          console.error('Failed to load dependents:', err);

          this.ngZone.run(() => {
            this.error = 'Failed to load dependents.';
            this.dependents = [];
            this.cdr.detectChanges();
          });
        },
      });
  }

  openAddModal(): void {
    this.editMode = false;
    this.currentId = null;
    this.dependentForm.reset();

    this.ngZone.run(() => {
      this.showModal = true;
      this.cdr.detectChanges();
    });
  }

  openEditModal(dependent: Dependent): void {
    this.editMode = true;
    this.currentId = dependent.id || null;

    this.dependentForm.patchValue({
      name: dependent.name,
      relationship: dependent.relationship,
      dateOfBirth: dependent.dateOfBirth,
      gender: dependent.gender,
      bloodType: dependent.bloodType,
      notes: dependent.notes,
    });

    this.ngZone.run(() => {
      this.showModal = true;
      this.cdr.detectChanges();
    });
  }

  closeModal(): void {
    this.ngZone.run(() => {
      this.showModal = false;
      this.cdr.detectChanges();
    });
  }

  onSubmit(): void {
    if (this.dependentForm.invalid || this.submitting) {
      this.dependentForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = '';

    const dependentData = this.dependentForm.getRawValue();

    if (this.editMode && this.currentId) {
      this.patientService
        .updateDependent(this.currentId, dependentData)
        .pipe(
          finalize(() => {
            this.ngZone.run(() => {
              this.submitting = false;
              this.cdr.detectChanges();
            });
          })
        )
        .subscribe({
          next: (updatedDependent: Dependent) => {
            this.ngZone.run(() => {
              this.dependents = this.dependents.map((dependent) =>
                dependent.id === this.currentId ? updatedDependent : dependent
              );
              this.closeModal();
              this.cdr.detectChanges();
            });
          },
          error: (err: any) => {
            console.error('Failed to update dependent:', err);

            this.ngZone.run(() => {
              this.error = 'Failed to update dependent.';
              this.cdr.detectChanges();
            });
          },
        });
    } else {
      this.patientService
        .addDependent(dependentData)
        .pipe(
          finalize(() => {
            this.ngZone.run(() => {
              this.submitting = false;
              this.cdr.detectChanges();
            });
          })
        )
        .subscribe({
          next: (newDependent: Dependent) => {
            this.ngZone.run(() => {
              this.dependents = [newDependent, ...this.dependents];
              this.closeModal();
              this.dependentForm.reset();
              this.cdr.detectChanges();
            });
          },
          error: (err: any) => {
            console.error('Failed to add dependent:', err);

            this.ngZone.run(() => {
              this.error = 'Failed to add dependent.';
              this.cdr.detectChanges();
            });
          },
        });
    }
  }

  deleteDependent(id: string | undefined): void {
    if (!id) return;
    if (!confirm('Are you sure you want to remove this dependent?')) return;

    this.error = '';

    this.patientService.deleteDependent(id).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.dependents = this.dependents.filter((dependent) => dependent.id !== id);
          this.cdr.detectChanges();
        });
      },
      error: (err: any) => {
        console.error('Failed to delete dependent:', err);

        this.ngZone.run(() => {
          this.error = 'Failed to delete dependent.';
          this.cdr.detectChanges();
        });
      },
    });
  }

  calculateAge(dob: string): number {
    if (!dob) return 0;

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}