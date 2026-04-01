package com.mediconnect.patientservice.mapper;

import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.dto.RegisterRequest;
import com.mediconnect.patientservice.entity.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PatientMapper {
    PatientDto toDto(Patient patient);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "dateOfBirth", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "bloodGroup", ignore = true)
    @Mapping(target = "emergencyContactName", ignore = true)
    @Mapping(target = "emergencyContactPhone", ignore = true)
    @Mapping(target = "profileImageUrl", ignore = true)
    Patient toEntity(RegisterRequest registerRequest);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromDto(PatientDto dto, @MappingTarget Patient patient);
}
