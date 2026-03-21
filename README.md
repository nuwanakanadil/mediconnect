# Doctor Channeling & Telemedicine System

A microservices-based healthcare platform for doctor channeling, telemedicine, payments, notifications, and digital medical records.

## Team Members
- Member 1 – Appointment Service, Telemedicine Service, Payment Service
- Member 2 – Patient Management Service
- Member 3 – Doctor Management Service
- Member 4 – Admin, Notification, Security/Auth, AI Enhancement

## Tech Stack

### Frontend
- Angular
- Tailwind CSS
- Lucide Angular

### Backend
- Microservices architecture
- REST APIs
- Docker
- Kubernetes

### Suggested Backend Stack
- Spring Boot

### Database
- MySQL or PostgreSQL

### Authentication
- JWT
- Role-based access control (Patient / Doctor / Admin)

## Main Modules
- Authentication
- Patient Management
- Doctor Management
- Appointment Service
- Telemedicine
- Payment Service
- Notification Service
- Admin Dashboard
- AI Symptom Checker

## Project Structure

doctor-channeling-system/
frontend/
services/
auth-service/
patient-service/
doctor-service/
appointment-service/
telemedicine-service/
payment-service/
notification-service/
admin-service/
ai-service/
docs/
docker/
README.md

## Frontend Routes
### Public
- `/`
- `/find-doctors`
- `/symptom-checker`

### Auth
- `/login`
- `/register`
- `/forgot-password`

### Patient
- `/patient/dashboard`
- `/patient/appointments`
- `/patient/book-appointment`
- `/patient/medical-reports`
- `/patient/prescriptions`
- `/patient/payments`
- `/patient/profile`
- `/patient/dependents`

### Doctor
- `/doctor/dashboard`
- `/doctor/schedule`
- `/doctor/appointments`
- `/doctor/patients`
- `/doctor/consultations`
- `/doctor/prescriptions`
- `/doctor/profile`
- `/doctor/reviews`

### Admin
- `/admin/dashboard`
- `/admin/users`
- `/admin/doctors`
- `/admin/verification`
- `/admin/appointments`
- `/admin/payments`
- `/admin/analytics`
- `/admin/settings`

## Setup Instructions

### Frontend
```bash
cd frontend
npm install
ng serve