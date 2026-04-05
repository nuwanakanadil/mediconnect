package com.mediconnect.patientservice.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    private String id;
    private String patientId;
    private String appointmentId;
    private String doctorName;
    private Double amount;
    private LocalDateTime date;
    private String status; // PAID, PENDING, CANCELLED, REFUNDED
    private String description;
    private String type; // PAYMENT, REFUND
}
