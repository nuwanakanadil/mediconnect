package com.mediconnect.patientservice.mapper;

import com.mediconnect.patientservice.dto.MedicalHistoryDto;
import com.mediconnect.patientservice.entity.MedicalHistory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MedicalHistoryMapper {
    MedicalHistoryDto toDto(MedicalHistory medicalHistory);
    MedicalHistory toEntity(MedicalHistoryDto medicalHistoryDto);
}
