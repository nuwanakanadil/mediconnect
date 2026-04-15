package com.mediconnect.doctor_service.service.impl;

import com.mediconnect.doctor_service.entity.Prescription;
import com.mediconnect.doctor_service.exception.ResourceNotFoundException;
import com.mediconnect.doctor_service.repository.PrescriptionRepository;
import com.mediconnect.doctor_service.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    @Override
    public Prescription createPrescription(Prescription prescription) {
        prescription.setIssuedAt(LocalDateTime.now());
        return prescriptionRepository.save(prescription);
    }

    @Override
    public Prescription getPrescriptionById(String id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found with id: " + id));
    }

    @Override
    public List<Prescription> getPrescriptionsByDoctorId(String doctorId) {
        return prescriptionRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<Prescription> getPrescriptionsByPatientId(String patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }

    @Override
    public List<Prescription> getPrescriptionsByAppointmentId(String appointmentId) {
        return prescriptionRepository.findByAppointmentId(appointmentId);
    }
}
