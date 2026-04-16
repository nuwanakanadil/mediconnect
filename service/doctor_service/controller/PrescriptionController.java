package com.mediconnect.doctor_service.controller;

import com.mediconnect.doctor_service.entity.Prescription;
import com.mediconnect.doctor_service.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @PostMapping
    public Prescription createPrescription(@RequestBody Prescription prescription) {
        return prescriptionService.createPrescription(prescription);
    }

    @GetMapping("/{id}")
    public Prescription getPrescriptionById(@PathVariable String id) {
        return prescriptionService.getPrescriptionById(id);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Prescription> getPrescriptionsByDoctorId(@PathVariable String doctorId) {
        return prescriptionService.getPrescriptionsByDoctorId(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Prescription> getPrescriptionsByPatientId(@PathVariable String patientId) {
        return prescriptionService.getPrescriptionsByPatientId(patientId);
    }
}
