package com.mediconnect.patientservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDto {
    private String id;
    private String patientId;
    private String doctorId;
    private String doctorName;
    private String specialization;
    private LocalDateTime dateTime;
    private String status;
    private String type;
    private String reason;
}
