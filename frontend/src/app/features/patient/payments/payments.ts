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
    const primaryColor = [33, 105, 232]; // Medical blue
    const accentColor = [51, 65, 85]; // Dark slate
    const lightGray = [241, 245, 249];
    
    // Page Settings
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // 1. Header with Branding Bar
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('MediConnect', margin, 25);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Healthcare & Management Services', margin, 32);
    
    doc.setFontSize(10);
    doc.text('Official Transaction Receipt', pageWidth - margin, 25, { align: 'right' });
    doc.text(`Ref: ${txn.id.substring(0, 12).toUpperCase()}`, pageWidth - margin, 32, { align: 'right' });

    // 2. Receipt Info Section
    let currentY = 55;
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('RECEIPT', margin, currentY);
    
    currentY += 15;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Date of Payment:', margin, currentY);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(new Date(txn.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }), margin + 35, currentY);
    
    doc.setTextColor(100, 116, 139);
    doc.text('Payment Status:', pageWidth / 2, currentY);
    doc.setTextColor(16, 185, 129); // Green for PAID
    doc.setFont('helvetica', 'bold');
    doc.text(txn.status.toUpperCase(), (pageWidth / 2) + 35, currentY);

    // 3. Billing Table
    currentY += 15;
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.rect(margin, currentY, contentWidth, 10, 'F');
    
    doc.setFontSize(9);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('DESCRIPTION', margin + 5, currentY + 7);
    doc.text('DOCTOR', margin + 80, currentY + 7);
    doc.text('AMOUNT', pageWidth - margin - 5, currentY + 7, { align: 'right' });

    currentY += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(txn.description, margin + 5, currentY);
    doc.text(txn.doctorName || 'General Staff', margin + 80, currentY);
    doc.text(`$${txn.amount.toFixed(2)}`, pageWidth - margin - 5, currentY, { align: 'right' });
    
    currentY += 8;
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, currentY, pageWidth - margin, currentY);

    // 4. Totals
    currentY += 15;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Grand Total:', pageWidth - margin - 50, currentY, { align: 'right' });
    doc.setFontSize(16);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`$${txn.amount.toFixed(2)}`, pageWidth - margin - 5, currentY, { align: 'right' });

    // 5. Stylized "PAID" Watermark/Stamp
    doc.saveGraphicsState();
    doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
    doc.setFontSize(80);
    doc.setTextColor(16, 185, 129);
    doc.text('PAID', pageWidth / 2, currentY + 40, { align: 'center', angle: 25 });
    doc.restoreGraphicsState();

    // 6. Footer Information
    currentY = 250;
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(1);
    doc.line(margin, currentY, margin + 20, currentY);
    
    currentY += 10;
    doc.setFontSize(9);
    doc.setTextColor( accentColor[0], accentColor[1], accentColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('MediConnect General Hospital', margin, currentY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    currentY += 5;
    doc.text('123 Healthcare Plaza, Medical District', margin, currentY);
    doc.text('Support: +1 (555) 000-1234 | support@mediconnect.com', margin, currentY + 4);
    
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(148, 163, 184);
    doc.text('This is a computer-generated document. No signature is required.', pageWidth / 2, 280, { align: 'center' });

    // Save the PDF
    doc.save(`MediConnect_Receipt_${txn.id.substring(0, 8)}.pdf`);
  }
}