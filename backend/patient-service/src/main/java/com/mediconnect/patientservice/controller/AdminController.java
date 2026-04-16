package com.mediconnect.patientservice.controller;

import com.mediconnect.patientservice.dto.DoctorDto;
import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/patients")
    public ResponseEntity<List<PatientDto>> getAllPatients() {
        return ResponseEntity.ok(adminService.getAllPatients());
    }

    @DeleteMapping("/patients/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable String id) {
        adminService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<DoctorDto>> getAllDoctors() {
        return ResponseEntity.ok(adminService.getAllDoctors());
    }

    @PutMapping("/doctors/{id}/verify")
    public ResponseEntity<DoctorDto> verifyDoctor(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(adminService.verifyDoctor(id, status));
    }
}
