package com.mediconnect.patientservice.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {
    @Id
    private String id;
    private String patientId;
    private String doctorId;
    private String doctorName;
    private String specialization;
    private LocalDateTime dateTime;
    private String status; // PENDING, CONFIRMED, CANCELLED, COMPLETED
    private String type; // VIDEO, IN_PERSON
    private String reason;
}
