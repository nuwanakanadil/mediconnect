package com.mediconnect.doctor_service.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "appointment_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequest {
    
    @Id
    private String id;
    
    private String appointmentId; // Reference to Member 1's Appointment Service
    private String doctorId;
    private String patientId;
    
    private LocalDateTime appointmentDateTime;
    private String patientNotes;
    
    private AppointmentStatus status; // PENDING, ACCEPTED, REJECTED
    
    private LocalDateTime requestedAt;
}
