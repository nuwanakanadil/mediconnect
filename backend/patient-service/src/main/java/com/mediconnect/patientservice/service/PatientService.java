package com.mediconnect.patientservice.service;

import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.dto.RegisterRequest;
import com.mediconnect.patientservice.entity.Patient;
import com.mediconnect.patientservice.mapper.PatientMapper;
import com.mediconnect.patientservice.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;
    private final PasswordEncoder passwordEncoder;

    public boolean existsByEmail(String email) {
        return patientRepository.existsByEmail(email);
    }

    @Transactional
    public PatientDto register(RegisterRequest registerRequest) {
        if (patientRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        Patient patient = patientMapper.toEntity(registerRequest);
        patient.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        return patientMapper.toDto(patientRepository.save(patient));
    }

    public PatientDto getProfile(String email) {
        return patientRepository.findByEmail(email)
                .map(patientMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    @Transactional
    public PatientDto updateProfile(String email, PatientDto patientDto) {
        Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        patient.setFullName(patientDto.getFullName());
        patient.setPhone(patientDto.getPhone());
        patient.setDateOfBirth(patientDto.getDateOfBirth());
        patient.setGender(patientDto.getGender());
        patient.setAddress(patientDto.getAddress());
        patient.setBloodGroup(patientDto.getBloodGroup());
        patient.setEmergencyContactName(patientDto.getEmergencyContactName());
        patient.setEmergencyContactPhone(patientDto.getEmergencyContactPhone());
        
        return patientMapper.toDto(patientRepository.save(patient));
    }
}
