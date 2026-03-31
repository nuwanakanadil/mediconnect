package com.mediconnect.patientservice.mapper;

import com.mediconnect.patientservice.dto.MedicalReportDto;
import com.mediconnect.patientservice.entity.MedicalReport;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-01T01:13:22+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class MedicalReportMapperImpl implements MedicalReportMapper {

    @Override
    public MedicalReportDto toDto(MedicalReport medicalReport) {
        if ( medicalReport == null ) {
            return null;
        }

        MedicalReportDto.MedicalReportDtoBuilder medicalReportDto = MedicalReportDto.builder();

        medicalReportDto.id( medicalReport.getId() );
        medicalReportDto.patientId( medicalReport.getPatientId() );
        medicalReportDto.fileName( medicalReport.getFileName() );
        medicalReportDto.originalFileName( medicalReport.getOriginalFileName() );
        medicalReportDto.fileType( medicalReport.getFileType() );
        medicalReportDto.description( medicalReport.getDescription() );
        medicalReportDto.uploadedAt( medicalReport.getUploadedAt() );

        return medicalReportDto.build();
    }

    @Override
    public MedicalReport toEntity(MedicalReportDto medicalReportDto) {
        if ( medicalReportDto == null ) {
            return null;
        }

        MedicalReport.MedicalReportBuilder medicalReport = MedicalReport.builder();

        medicalReport.id( medicalReportDto.getId() );
        medicalReport.patientId( medicalReportDto.getPatientId() );
        medicalReport.fileName( medicalReportDto.getFileName() );
        medicalReport.originalFileName( medicalReportDto.getOriginalFileName() );
        medicalReport.fileType( medicalReportDto.getFileType() );
        medicalReport.description( medicalReportDto.getDescription() );

        return medicalReport.build();
    }
}
