package com.mediconnect.patientservice.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalHistoryDto {
    private String id;
    private String patientId;

    @NotBlank(message = "Condition name is required")
    private String conditionName;

    @NotNull(message = "Diagnosis date is required")
    private LocalDate diagnosisDate;

    private String notes;

    @NotBlank(message = "Status is required")
    private String status;
}
