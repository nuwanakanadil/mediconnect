package com.mediconnect.patientservice.mapper;

import com.mediconnect.patientservice.dto.MedicalReportDto;
import com.mediconnect.patientservice.entity.MedicalReport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MedicalReportMapper {
    MedicalReportDto toDto(MedicalReport medicalReport);

    @Mapping(target = "uploadedAt", ignore = true)
    @Mapping(target = "filePath", ignore = true)
    MedicalReport toEntity(MedicalReportDto medicalReportDto);
}
