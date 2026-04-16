package com.mediconnect.patientservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalHistoryDto {
    private String id;
    private String patientId;
    private String conditionName;
    private LocalDate diagnosisDate;
    private String treatment;
    private String notes;
    private String status;
}
