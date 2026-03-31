package com.mediconnect.patientservice.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrescriptionDto {
    private String id;
    private String patientId;
    private String doctorId;
    private String doctorName;
    private String medicationDetails;
    private LocalDate issuedDate;
    private String notes;
}
