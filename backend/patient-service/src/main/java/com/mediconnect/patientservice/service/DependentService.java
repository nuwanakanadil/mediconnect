package com.mediconnect.patientservice.service;

import com.mediconnect.patientservice.dto.DependentDto;
import com.mediconnect.patientservice.entity.Dependent;
import com.mediconnect.patientservice.mapper.DependentMapper;
import com.mediconnect.patientservice.repository.DependentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DependentService {

    private final DependentRepository dependentRepository;
    private final DependentMapper dependentMapper;

    public List<DependentDto> getAllByPatientId(String patientId) {
        return dependentRepository.findByPatientId(patientId).stream()
                .map(dependentMapper::toDto)
                .collect(Collectors.toList());
    }

    public DependentDto createDependent(DependentDto dto) {
        Dependent dependent = dependentMapper.toEntity(dto);
        return dependentMapper.toDto(dependentRepository.save(dependent));
    }

    public DependentDto updateDependent(String id, DependentDto dto) {
        Dependent dependent = dependentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dependent not found"));
        dependentMapper.updateEntityFromDto(dto, dependent);
        return dependentMapper.toDto(dependentRepository.save(dependent));
    }

    public void deleteDependent(String id) {
        dependentRepository.deleteById(id);
    }
}
