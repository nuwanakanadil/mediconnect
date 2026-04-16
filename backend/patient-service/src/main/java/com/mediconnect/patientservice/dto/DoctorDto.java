package com.mediconnect.patientservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorDto {
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String specialization;
    private String hospital;
    private String licenseNumber;
    private String bio;
    private String status;
    private Double rating;
    private Integer consultingFee;
    private List<String> availableSlots;
}
