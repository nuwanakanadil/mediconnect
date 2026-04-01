package com.mediconnect.patientservice.controller;

import com.mediconnect.patientservice.dto.*;
import com.mediconnect.patientservice.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping("/register")
    public ResponseEntity<PatientDto> register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Registration attempt for email: " + registerRequest.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login attempt for email: " + loginRequest.getEmail());
        return ResponseEntity.ok(patientService.login(loginRequest));
    }

    @GetMapping("/me")
    public ResponseEntity<PatientDto> getMyProfile(@AuthenticationPrincipal String email) {
        System.out.println("GET /me called for email: " + email);
        return ResponseEntity.ok(patientService.getProfile(email));
    }

    @PutMapping("/me")
    public ResponseEntity<PatientDto> updateMyProfile(@AuthenticationPrincipal String email, @Valid @RequestBody PatientDto patientDto) {
        return ResponseEntity.ok(patientService.updateProfile(email, patientDto));
    }
}
