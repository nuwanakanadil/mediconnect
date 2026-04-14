package com.mediconnect.doctor_service.service;

import com.mediconnect.doctor_service.entity.Prescription;
import java.util.List;

public interface PrescriptionService {
    Prescription createPrescription(Prescription prescription);
    Prescription getPrescriptionById(String id);
    List<Prescription> getPrescriptionsByDoctorId(String doctorId);
    List<Prescription> getPrescriptionsByPatientId(String patientId);
    List<Prescription> getPrescriptionsByAppointmentId(String appointmentId);
}
