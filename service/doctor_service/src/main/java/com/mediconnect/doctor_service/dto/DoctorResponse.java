package com.mediconnect.doctor_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import com.mediconnect.doctor_service.entity.Schedule;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorResponse {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String specialization;
    private String qualification;
    private Integer experienceYears;
    private String hospitalName;
    private BigDecimal consultationFee;
    private List<Schedule> availability;
    private List<String> verificationDocuments;
    private String bio;
    private String location;
    private boolean verified;
    private boolean active;
}