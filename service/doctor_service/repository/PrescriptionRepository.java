package com.mediconnect.doctor_service.repository;

import com.mediconnect.doctor_service.entity.Prescription;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PrescriptionRepository extends MongoRepository<Prescription, String> {
    List<Prescription> findByDoctorId(String doctorId);
    List<Prescription> findByPatientId(String patientId);
    List<Prescription> findByAppointmentId(String appointmentId);
}
