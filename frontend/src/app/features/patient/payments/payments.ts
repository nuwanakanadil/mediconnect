import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CreditCardIcon,
  DownloadIcon,
  SearchIcon,
  LucideAngularModule,
} from 'lucide-angular';

import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';
import { PatientService } from '../../../core/services/patient.service';
import { Payment } from '../../../core/models/patient.model';
import { finalize } from 'rxjs';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class PaymentsComponent implements OnInit {
  readonly CreditCardIcon = CreditCardIcon;
  readonly DownloadIcon = DownloadIcon;
  readonly SearchIcon = SearchIcon;
  readonly ArrowUpRightIcon = ArrowUpRightIcon;
  readonly ArrowDownLeftIcon = ArrowDownLeftIcon;

  transactions: Payment[] = [];
  loading = false;
  error = '';

  constructor(
    private patientService: PatientService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.error = '';

    this.patientService
      .getPayments()
      .pipe(
        finalize(() => {
          this.ngZone.run(() => {
            this.loading = false;
            this.cdr.detectChanges();
          });
        })
      )
      .subscribe({
        next: (data: Payment[]) => {
          this.ngZone.run(() => {
            this.transactions = data || [];
            this.cdr.detectChanges();
          });
        },
        error: (err: any) => {
          console.error('Failed to load payments', err);

          this.ngZone.run(() => {
            this.error = 'Failed to load transaction history.';
            this.transactions = [];
            this.cdr.detectChanges();
          });
        },
      });
  }

  downloadReceipt(txn: Payment): void {
    const doc = new jsPDF();
    
    // Add Branding / Header
    doc.setFontSize(22);
    doc.setTextColor(33, 105, 232); // Medical Blue
    doc.text('MediConnect Receipt', 105, 20, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 30, 190, 30);
    
    // Body Content
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    
    const startY = 50;
    const lineHeight = 10;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Transaction ID:', 20, startY);
    doc.setFont('helvetica', 'normal');
    doc.text(txn.id, 70, startY);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Date:', 20, startY + lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date(txn.date).toLocaleDateString(), 70, startY + lineHeight);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Status:', 20, startY + lineHeight * 2);
    doc.setFont('helvetica', 'normal');
    doc.text(txn.status.toUpperCase(), 70, startY + lineHeight * 2);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Service:', 20, startY + lineHeight * 3);
    doc.setFont('helvetica', 'normal');
    doc.text(txn.description, 70, startY + lineHeight * 3);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Doctor:', 20, startY + lineHeight * 4);
    doc.setFont('helvetica', 'normal');
    doc.text(txn.doctorName || 'N/A', 70, startY + lineHeight * 4);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount:', 20, startY + lineHeight * 6);
    doc.setFontSize(16);
    doc.setTextColor(33, 105, 232);
    doc.text(`$${txn.amount.toFixed(2)}`, 70, startY + lineHeight * 6);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.line(20, 270, 190, 270);
    doc.text('Thank you for choosing MediConnect. Stay healthy!', 105, 280, { align: 'center' });
    
    // Save the PDF
    doc.save(`Receipt-${txn.id}.pdf`);
  }
}