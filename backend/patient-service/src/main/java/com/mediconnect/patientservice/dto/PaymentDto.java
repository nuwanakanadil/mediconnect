package com.mediconnect.patientservice.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDto {
    private String id;
    private String patientId;
    private String appointmentId;
    private String doctorName;
    private Double amount;
    private LocalDateTime date;
    private String status;
    private String description;
    private String type;
}
