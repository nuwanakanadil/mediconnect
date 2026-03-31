package com.mediconnect.patientservice.service;

import com.mediconnect.patientservice.dto.MedicalHistoryDto;
import com.mediconnect.patientservice.entity.MedicalHistory;
import com.mediconnect.patientservice.mapper.MedicalHistoryMapper;
import com.mediconnect.patientservice.repository.MedicalHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalHistoryService {

    private final MedicalHistoryRepository medicalHistoryRepository;
    private final MedicalHistoryMapper medicalHistoryMapper;

    public List<MedicalHistoryDto> getHistoryByPatientId(String patientId) {
        return medicalHistoryRepository.findByPatientId(patientId).stream()
                .map(medicalHistoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public MedicalHistoryDto addHistory(MedicalHistoryDto historyDto) {
        MedicalHistory history = medicalHistoryMapper.toEntity(historyDto);
        return medicalHistoryMapper.toDto(medicalHistoryRepository.save(history));
    }

    @Transactional
    public MedicalHistoryDto updateHistory(String id, MedicalHistoryDto historyDto) {
        MedicalHistory history = medicalHistoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("History not found"));
        
        history.setConditionName(historyDto.getConditionName());
        history.setDiagnosisDate(historyDto.getDiagnosisDate());
        history.setNotes(historyDto.getNotes());
        history.setStatus(historyDto.getStatus());
        
        return medicalHistoryMapper.toDto(medicalHistoryRepository.save(history));
    }

    @Transactional
    public void deleteHistory(String id) {
        medicalHistoryRepository.deleteById(id);
    }
}
