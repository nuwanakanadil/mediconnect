package com.mediconnect.patientservice.mapper;

import com.mediconnect.patientservice.dto.MedicalHistoryDto;
import com.mediconnect.patientservice.entity.MedicalHistory;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-05T18:47:15+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class MedicalHistoryMapperImpl implements MedicalHistoryMapper {

    @Override
    public MedicalHistoryDto toDto(MedicalHistory medicalHistory) {
        if ( medicalHistory == null ) {
            return null;
        }

        MedicalHistoryDto.MedicalHistoryDtoBuilder medicalHistoryDto = MedicalHistoryDto.builder();

        medicalHistoryDto.id( medicalHistory.getId() );
        medicalHistoryDto.patientId( medicalHistory.getPatientId() );
        medicalHistoryDto.conditionName( medicalHistory.getConditionName() );
        medicalHistoryDto.diagnosisDate( medicalHistory.getDiagnosisDate() );
        medicalHistoryDto.treatment( medicalHistory.getTreatment() );
        medicalHistoryDto.notes( medicalHistory.getNotes() );
        medicalHistoryDto.status( medicalHistory.getStatus() );

        return medicalHistoryDto.build();
    }

    @Override
    public MedicalHistory toEntity(MedicalHistoryDto medicalHistoryDto) {
        if ( medicalHistoryDto == null ) {
            return null;
        }

        MedicalHistory.MedicalHistoryBuilder medicalHistory = MedicalHistory.builder();

        medicalHistory.id( medicalHistoryDto.getId() );
        medicalHistory.patientId( medicalHistoryDto.getPatientId() );
        medicalHistory.conditionName( medicalHistoryDto.getConditionName() );
        medicalHistory.diagnosisDate( medicalHistoryDto.getDiagnosisDate() );
        medicalHistory.treatment( medicalHistoryDto.getTreatment() );
        medicalHistory.notes( medicalHistoryDto.getNotes() );
        medicalHistory.status( medicalHistoryDto.getStatus() );

        return medicalHistory.build();
    }
}
