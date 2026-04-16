package com.mediconnect.patientservice.controller;

import com.mediconnect.patientservice.dto.MedicalHistoryDto;
import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.service.MedicalHistoryService;
import com.mediconnect.patientservice.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients/me/history")
@RequiredArgsConstructor
public class MedicalHistoryController {

    private final MedicalHistoryService medicalHistoryService;
    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<MedicalHistoryDto>> getMyHistory(@AuthenticationPrincipal String email) {
        PatientDto patient = patientService.getProfile(email);
        return ResponseEntity.ok(medicalHistoryService.getHistoryByPatientId(patient.getId()));
    }

    @PostMapping
    public ResponseEntity<MedicalHistoryDto> addHistory(@AuthenticationPrincipal String email, @Valid @RequestBody MedicalHistoryDto historyDto) {
        PatientDto patient = patientService.getProfile(email);
        historyDto.setPatientId(patient.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(medicalHistoryService.addHistory(historyDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalHistoryDto> updateHistory(@PathVariable String id, @Valid @RequestBody MedicalHistoryDto historyDto) {
        return ResponseEntity.ok(medicalHistoryService.updateHistory(id, historyDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHistory(@PathVariable String id) {
        medicalHistoryService.deleteHistory(id);
        return ResponseEntity.noContent().build();
    }
}
