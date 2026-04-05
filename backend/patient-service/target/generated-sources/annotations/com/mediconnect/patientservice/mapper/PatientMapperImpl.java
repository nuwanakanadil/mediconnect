package com.mediconnect.patientservice.mapper;

import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.dto.RegisterRequest;
import com.mediconnect.patientservice.entity.Patient;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-05T18:47:15+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class PatientMapperImpl implements PatientMapper {

    @Override
    public PatientDto toDto(Patient patient) {
        if ( patient == null ) {
            return null;
        }

        PatientDto.PatientDtoBuilder patientDto = PatientDto.builder();

        patientDto.id( patient.getId() );
        patientDto.fullName( patient.getFullName() );
        patientDto.email( patient.getEmail() );
        patientDto.phone( patient.getPhone() );
        patientDto.dateOfBirth( patient.getDateOfBirth() );
        patientDto.gender( patient.getGender() );
        patientDto.address( patient.getAddress() );
        patientDto.bloodGroup( patient.getBloodGroup() );
        patientDto.emergencyContactName( patient.getEmergencyContactName() );
        patientDto.emergencyContactPhone( patient.getEmergencyContactPhone() );
        patientDto.profileImageUrl( patient.getProfileImageUrl() );
        patientDto.createdAt( patient.getCreatedAt() );
        patientDto.updatedAt( patient.getUpdatedAt() );

        return patientDto.build();
    }

    @Override
    public Patient toEntity(RegisterRequest registerRequest) {
        if ( registerRequest == null ) {
            return null;
        }

        Patient.PatientBuilder patient = Patient.builder();

        patient.fullName( registerRequest.getFullName() );
        patient.email( registerRequest.getEmail() );
        patient.password( registerRequest.getPassword() );
        patient.phone( registerRequest.getPhone() );

        return patient.build();
    }

    @Override
    public void updateEntityFromDto(PatientDto dto, Patient patient) {
        if ( dto == null ) {
            return;
        }

        patient.setFullName( dto.getFullName() );
        patient.setPhone( dto.getPhone() );
        patient.setDateOfBirth( dto.getDateOfBirth() );
        patient.setGender( dto.getGender() );
        patient.setAddress( dto.getAddress() );
        patient.setBloodGroup( dto.getBloodGroup() );
        patient.setEmergencyContactName( dto.getEmergencyContactName() );
        patient.setEmergencyContactPhone( dto.getEmergencyContactPhone() );
        patient.setProfileImageUrl( dto.getProfileImageUrl() );
    }
}
