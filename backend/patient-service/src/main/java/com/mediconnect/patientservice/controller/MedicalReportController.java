package com.mediconnect.patientservice.controller;

import com.mediconnect.patientservice.dto.MedicalReportDto;
import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.service.MedicalReportService;
import com.mediconnect.patientservice.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/patients/me/reports")
@RequiredArgsConstructor
public class MedicalReportController {

    private final MedicalReportService medicalReportService;
    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<MedicalReportDto>> getMyReports(@AuthenticationPrincipal String email) {
        PatientDto patient = patientService.getProfile(email);
        return ResponseEntity.ok(medicalReportService.getReportsByPatientId(patient.getId()));
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<MedicalReportDto> uploadReport(
            @AuthenticationPrincipal String email,
            @RequestParam("file") MultipartFile file,
            @RequestParam("description") String description) throws IOException {
        PatientDto patient = patientService.getProfile(email);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(medicalReportService.uploadReport(patient.getId(), file, description));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalReportDto> getReport(@PathVariable String id) {
        return ResponseEntity.ok(medicalReportService.getReportById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable String id) {
        medicalReportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }
}
