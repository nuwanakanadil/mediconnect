import { Routes } from '@angular/router';

import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout';
import { DashboardLayoutComponent } from './core/layouts/dashboard-layout/dashboard-layout';

import { LandingComponent } from './features/public/landing/landing';
import { FindDoctorsComponent } from './features/public/find-doctors/find-doctors';

import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password';

import { DashboardComponent as PatientDashboardComponent } from './features/patient/dashboard/dashboard';
import { AppointmentsComponent as PatientAppointmentsComponent } from './features/patient/appointments/appointments';
import { BookAppointmentComponent } from './features/patient/book-appointment/book-appointment';
import { MedicalReportsComponent } from './features/patient/medical-reports/medical-reports';
import { PrescriptionsComponent as PatientPrescriptionsComponent } from './features/patient/prescriptions/prescriptions';
import { PaymentsComponent as PatientPaymentsComponent } from './features/patient/payments/payments';
import { ProfileComponent as PatientProfileComponent } from './features/patient/profile/profile';
import { NotificationsComponent as PatientNotificationsComponent } from './features/patient/notifications/notifications';
import { DependentsComponent } from './features/patient/dependents/dependents';

import { DashboardComponent as DoctorDashboardComponent } from './features/doctor/dashboard/dashboard';
import { ScheduleComponent as DoctorScheduleComponent } from './features/doctor/schedule/schedule';
import { AppointmentsComponent as DoctorAppointmentsComponent } from './features/doctor/appointments/appointments';
import { PatientsComponent as DoctorPatientsComponent } from './features/doctor/patients/patients';
import { ConsultationsComponent as DoctorConsultationsComponent } from './features/doctor/consultations/consultations';
import { PrescriptionsComponent as DoctorPrescriptionsComponent } from './features/doctor/prescriptions/prescriptions';
import { ReviewsComponent as DoctorReviewsComponent } from './features/doctor/reviews/reviews';
import { ProfileComponent as DoctorProfileComponent } from './features/doctor/profile/profile';

import { DashboardComponent as AdminDashboardComponent } from './features/admin/dashboard/dashboard';
import { UsersComponent } from './features/admin/users/users';
import { DoctorsComponent } from './features/admin/doctors/doctors';
import { VerificationComponent } from './features/admin/verification/verification';
import { AppointmentsComponent as AdminAppointmentsComponent } from './features/admin/appointments/appointments';
import { PaymentsComponent as AdminPaymentsComponent } from './features/admin/payments/payments';
import { AnalyticsComponent } from './features/admin/analytics/analytics';
import { SettingsComponent } from './features/admin/settings/settings';

import { VideoConsultationComponent } from './features/telemedicine/video-consultation/video-consultation';
import { CheckoutComponent } from './features/payment/checkout/checkout';
import { PaymentSuccessComponent } from './features/payment/payment-success/payment-success';
import { PaymentFailedComponent } from './features/payment/payment-failed/payment-failed';
import { UnauthorizedComponent } from './features/system/unauthorized/unauthorized';
import { ErrorComponent } from './features/system/error/error';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'find-doctors', component: FindDoctorsComponent },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  {
    path: 'patient',
    component: DashboardLayoutComponent,
    data: { role: 'patient' },
    children: [
      { path: 'dashboard', component: PatientDashboardComponent },
      { path: 'appointments', component: PatientAppointmentsComponent },
      { path: 'book-appointment', component: BookAppointmentComponent },
      { path: 'medical-reports', component: MedicalReportsComponent },
      { path: 'prescriptions', component: PatientPrescriptionsComponent },
      { path: 'payments', component: PatientPaymentsComponent },
      { path: 'notifications', component: PatientNotificationsComponent },
      { path: 'profile', component: PatientProfileComponent },
      { path: 'dependents', component: DependentsComponent },
    ],
  },

  {
    path: 'doctor',
    component: DashboardLayoutComponent,
    data: { role: 'doctor' },
    children: [
      { path: 'dashboard', component: DoctorDashboardComponent },
      { path: 'schedule', component: DoctorScheduleComponent },
      { path: 'appointments', component: DoctorAppointmentsComponent },
      { path: 'patients', component: DoctorPatientsComponent },
      { path: 'consultations', component: DoctorConsultationsComponent },
      { path: 'prescriptions', component: DoctorPrescriptionsComponent },
      { path: 'reviews', component: DoctorReviewsComponent },
      { path: 'profile', component: DoctorProfileComponent },
    ],
  },

  {
    path: 'admin',
    component: DashboardLayoutComponent,
    data: { role: 'admin' },
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'verification', component: VerificationComponent },
      { path: 'appointments', component: AdminAppointmentsComponent },
      { path: 'payments', component: AdminPaymentsComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },

  { path: 'telemedicine', component: VideoConsultationComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-failed', component: PaymentFailedComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' },
];