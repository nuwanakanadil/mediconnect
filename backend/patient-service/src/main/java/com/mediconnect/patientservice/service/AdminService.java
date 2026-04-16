package com.mediconnect.patientservice.service;

import com.mediconnect.patientservice.dto.DoctorDto;
import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.entity.Doctor;
import com.mediconnect.patientservice.mapper.PatientMapper;
import com.mediconnect.patientservice.repository.DoctorRepository;
import com.mediconnect.patientservice.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final PatientMapper patientMapper;

    // Patient Management
    public List<PatientDto> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(patientMapper::toDto)
                .collect(Collectors.toList());
    }

    public void deletePatient(String id) {
        patientRepository.deleteById(id);
    }

    // Doctor Management
    public List<DoctorDto> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public DoctorDto verifyDoctor(String id, String status) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        doctor.setStatus(status);
        return mapToDto(doctorRepository.save(doctor));
    }

    private DoctorDto mapToDto(Doctor entity) {
        return DoctorDto.builder()
                .id(entity.getId())
                .fullName(entity.getFullName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .specialization(entity.getSpecialization())
                .hospital(entity.getHospital())
                .licenseNumber(entity.getLicenseNumber())
                .bio(entity.getBio())
                .status(entity.getStatus())
                .rating(entity.getRating())
                .consultingFee(entity.getConsultingFee())
                .availableSlots(entity.getAvailableSlots())
                .build();
    }
}
