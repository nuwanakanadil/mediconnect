package com.mediconnect.patientservice.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {
    @Id
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String specialization;
    private String hospital;
    private String licenseNumber;
    private String bio;
    private String status; // PENDING, VERIFIED, REJECTED
    private Double rating;
    private Integer consultingFee;
    private List<String> availableSlots;
}
