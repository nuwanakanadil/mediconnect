package com.mediconnect.patientservice.service;

import com.mediconnect.patientservice.dto.DoctorDto;
import com.mediconnect.patientservice.entity.Doctor;
import com.mediconnect.patientservice.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public List<DoctorDto> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecializationAndStatus(specialization, "VERIFIED").stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
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
