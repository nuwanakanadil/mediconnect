package com.mediconnect.doctor_service.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "prescriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {

    @Id
    private String id;
    
    private String doctorId;
    private String patientId;
    private String appointmentId;
    
    private List<Medication> medications;
    
    private String diagnosis;
    private String additionalNotes;
    private LocalDateTime issuedAt;
}
