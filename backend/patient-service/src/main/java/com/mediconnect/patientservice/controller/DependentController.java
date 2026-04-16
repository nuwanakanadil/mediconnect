package com.mediconnect.patientservice.controller;

import com.mediconnect.patientservice.dto.DependentDto;
import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.service.DependentService;
import com.mediconnect.patientservice.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patients/me/dependents")
@RequiredArgsConstructor
public class DependentController {

    private final DependentService dependentService;
    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<DependentDto>> getMyDependents(@AuthenticationPrincipal String email) {
        PatientDto patient = patientService.getProfile(email);
        return ResponseEntity.ok(dependentService.getAllByPatientId(patient.getId()));
    }

    @PostMapping
    public ResponseEntity<DependentDto> addDependent(@AuthenticationPrincipal String email, @RequestBody DependentDto dto) {
        PatientDto patient = patientService.getProfile(email);
        dto.setPatientId(patient.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(dependentService.createDependent(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DependentDto> updateDependent(@PathVariable String id, @RequestBody DependentDto dto) {
        return ResponseEntity.ok(dependentService.updateDependent(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDependent(@PathVariable String id) {
        dependentService.deleteDependent(id);
        return ResponseEntity.noContent().build();
    }
}
