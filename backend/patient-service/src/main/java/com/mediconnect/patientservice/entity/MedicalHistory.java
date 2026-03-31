package com.mediconnect.patientservice.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "medical_histories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalHistory {

    @Id
    private String id;

    private String patientId;
    private String conditionName;
    private LocalDate diagnosisDate;
    private String treatment;
    private String notes;
    private String status;
}
