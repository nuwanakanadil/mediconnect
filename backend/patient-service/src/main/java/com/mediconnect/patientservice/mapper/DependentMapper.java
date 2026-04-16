package com.mediconnect.patientservice.mapper;

import com.mediconnect.patientservice.dto.DependentDto;
import com.mediconnect.patientservice.entity.Dependent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DependentMapper {
    DependentDto toDto(Dependent dependent);
    Dependent toEntity(DependentDto dependentDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "patientId", ignore = true)
    void updateEntityFromDto(DependentDto dto, @MappingTarget Dependent dependent);
}
