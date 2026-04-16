package com.mediconnect.patientservice.dto;

import lombok.*;

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
    private java.time.LocalDate issuedDate;
    private String notes;
    private String status;
}
