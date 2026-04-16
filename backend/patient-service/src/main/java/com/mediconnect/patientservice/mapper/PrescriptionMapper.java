package com.mediconnect.patientservice.mapper;

import com.mediconnect.patientservice.dto.PrescriptionDto;
import com.mediconnect.patientservice.entity.Prescription;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PrescriptionMapper {
    PrescriptionDto toDto(Prescription prescription);
    Prescription toEntity(PrescriptionDto prescriptionDto);
}
