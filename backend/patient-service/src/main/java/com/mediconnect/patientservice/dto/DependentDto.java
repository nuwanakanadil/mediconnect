package com.mediconnect.patientservice.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DependentDto {
    private String id;
    private String patientId;
    private String name;
    private String relationship;
    private LocalDate dateOfBirth;
    private String gender;
    private String bloodType;
    private String notes;
}
