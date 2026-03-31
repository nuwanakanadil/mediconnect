package com.mediconnect.patientservice.mapper;

import com.mediconnect.patientservice.dto.PrescriptionDto;
import com.mediconnect.patientservice.entity.Prescription;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T18:28:39+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class PrescriptionMapperImpl implements PrescriptionMapper {

    @Override
    public PrescriptionDto toDto(Prescription prescription) {
        if ( prescription == null ) {
            return null;
        }

        PrescriptionDto.PrescriptionDtoBuilder prescriptionDto = PrescriptionDto.builder();

        prescriptionDto.id( prescription.getId() );
        prescriptionDto.patientId( prescription.getPatientId() );
        prescriptionDto.doctorId( prescription.getDoctorId() );
        prescriptionDto.doctorName( prescription.getDoctorName() );
        prescriptionDto.medicationDetails( prescription.getMedicationDetails() );
        prescriptionDto.issuedDate( prescription.getIssuedDate() );
        prescriptionDto.notes( prescription.getNotes() );

        return prescriptionDto.build();
    }

    @Override
    public Prescription toEntity(PrescriptionDto prescriptionDto) {
        if ( prescriptionDto == null ) {
            return null;
        }

        Prescription.PrescriptionBuilder prescription = Prescription.builder();

        prescription.id( prescriptionDto.getId() );
        prescription.patientId( prescriptionDto.getPatientId() );
        prescription.doctorId( prescriptionDto.getDoctorId() );
        prescription.doctorName( prescriptionDto.getDoctorName() );
        prescription.medicationDetails( prescriptionDto.getMedicationDetails() );
        prescription.issuedDate( prescriptionDto.getIssuedDate() );
        prescription.notes( prescriptionDto.getNotes() );

        return prescription.build();
    }
}
