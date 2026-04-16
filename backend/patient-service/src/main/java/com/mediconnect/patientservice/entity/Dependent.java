package com.mediconnect.patientservice.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "dependents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dependent {
    @Id
    private String id;
    private String patientId;
    private String name;
    private String relationship;
    private LocalDate dateOfBirth;
    private String gender;
    private String bloodType;
    private String notes;
}
