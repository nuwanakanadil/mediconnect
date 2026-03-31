package com.mediconnect.patientservice.controller;

import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.dto.PrescriptionDto;
import com.mediconnect.patientservice.service.PatientService;
import com.mediconnect.patientservice.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/patients/me/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;
    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PrescriptionDto>> getMyPrescriptions(@AuthenticationPrincipal String email) {
        PatientDto patient = patientService.getProfile(email);
        return ResponseEntity.ok(prescriptionService.getPrescriptionsByPatientId(patient.getId()));
    }
}
