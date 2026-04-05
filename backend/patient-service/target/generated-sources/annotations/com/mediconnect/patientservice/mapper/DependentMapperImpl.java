package com.mediconnect.patientservice.mapper;

import com.mediconnect.patientservice.dto.DependentDto;
import com.mediconnect.patientservice.entity.Dependent;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-06T01:16:46+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class DependentMapperImpl implements DependentMapper {

    @Override
    public DependentDto toDto(Dependent dependent) {
        if ( dependent == null ) {
            return null;
        }

        DependentDto.DependentDtoBuilder dependentDto = DependentDto.builder();

        dependentDto.id( dependent.getId() );
        dependentDto.patientId( dependent.getPatientId() );
        dependentDto.name( dependent.getName() );
        dependentDto.relationship( dependent.getRelationship() );
        dependentDto.dateOfBirth( dependent.getDateOfBirth() );
        dependentDto.gender( dependent.getGender() );
        dependentDto.bloodType( dependent.getBloodType() );
        dependentDto.notes( dependent.getNotes() );

        return dependentDto.build();
    }

    @Override
    public Dependent toEntity(DependentDto dependentDto) {
        if ( dependentDto == null ) {
            return null;
        }

        Dependent.DependentBuilder dependent = Dependent.builder();

        dependent.id( dependentDto.getId() );
        dependent.patientId( dependentDto.getPatientId() );
        dependent.name( dependentDto.getName() );
        dependent.relationship( dependentDto.getRelationship() );
        dependent.dateOfBirth( dependentDto.getDateOfBirth() );
        dependent.gender( dependentDto.getGender() );
        dependent.bloodType( dependentDto.getBloodType() );
        dependent.notes( dependentDto.getNotes() );

        return dependent.build();
    }

    @Override
    public void updateEntityFromDto(DependentDto dto, Dependent dependent) {
        if ( dto == null ) {
            return;
        }

        dependent.setName( dto.getName() );
        dependent.setRelationship( dto.getRelationship() );
        dependent.setDateOfBirth( dto.getDateOfBirth() );
        dependent.setGender( dto.getGender() );
        dependent.setBloodType( dto.getBloodType() );
        dependent.setNotes( dto.getNotes() );
    }
}
