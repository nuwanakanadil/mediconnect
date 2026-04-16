package com.mediconnect.patientservice.service;

import com.mediconnect.patientservice.dto.*;
import com.mediconnect.patientservice.entity.*;
import com.mediconnect.patientservice.mapper.PatientMapper;
import com.mediconnect.patientservice.repository.*;
import com.mediconnect.patientservice.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthResponse login(LoginRequest loginRequest) {
        System.out.println("Finding patient by email: " + loginRequest.getEmail());
        Patient patient = patientRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> {
                    System.out.println("Patient not found: " + loginRequest.getEmail());
                    return new RuntimeException("Invalid email or password");
                });

        System.out.println("Patient found, checking password...");
        if (!passwordEncoder.matches(loginRequest.getPassword(), patient.getPassword())) {
            System.out.println("Password mismatch for email: " + loginRequest.getEmail());
            throw new RuntimeException("Invalid email or password");
        }
        System.out.println("Login successful for email: " + loginRequest.getEmail());

        String token = jwtUtils.generateJwtToken(patient.getEmail());

        return AuthResponse.builder()
                .token(token)
                .email(patient.getEmail())
                .role("PATIENT")
                .fullName(patient.getFullName())
                .build();
    }

    public boolean existsByEmail(String email) {
        return patientRepository.existsByEmail(email);
    }

    public PatientDto register(RegisterRequest registerRequest) {
        System.out.println("Registering patient in service: " + registerRequest.getEmail());
        if (patientRepository.existsByEmail(registerRequest.getEmail())) {
            System.out.println("Email already exists: " + registerRequest.getEmail());
            throw new RuntimeException("Email already in use");
        }
        try {
            Patient patient = patientMapper.toEntity(registerRequest);
            patient.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            System.out.println("Saving patient to repository...");
            Patient savedPatient = patientRepository.save(patient);
            System.out.println("Patient saved successfully with ID: " + savedPatient.getId());
            return patientMapper.toDto(savedPatient);
        } catch (Exception e) {
            System.out.println("Error saving patient: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error during registration: " + e.getMessage());
        }
    }

    public PatientDto getProfile(String email) {
        System.out.println("Service: Retrieving profile for email: " + email);
        Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        return patientMapper.toDto(patient);
    }

    public PatientDto updateProfile(String email, PatientDto dto) {
        Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        patientMapper.updateEntityFromDto(dto, patient);
        
        System.out.println("Updating profile for patient ID: " + patient.getId());
        Patient updatedPatient = patientRepository.save(patient);
        System.out.println("Profile updated successfully for ID: " + updatedPatient.getId());
        
        return patientMapper.toDto(updatedPatient);
    }
}
