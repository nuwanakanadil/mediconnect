package com.mediconnect.patientservice.service;

import com.mediconnect.patientservice.dto.PrescriptionDto;
import com.mediconnect.patientservice.mapper.PrescriptionMapper;
import com.mediconnect.patientservice.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PrescriptionMapper prescriptionMapper;

    public List<PrescriptionDto> getPrescriptionsByPatientId(String patientId) {
        return prescriptionRepository.findByPatientId(patientId).stream()
                .map(prescriptionMapper::toDto)
                .collect(Collectors.toList());
    }
}
