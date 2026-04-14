package com.mediconnect.doctor_service.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

@Document(collection = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
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
    
    // Instead of simple strings, using a nested document / list of schedules
    private List<Schedule> availability;

    private String bio;
    private String location;
    
    // Array of strings (URLs) pointing to verification documents like medical licenses
    private List<String> verificationDocuments;

    private boolean verified;
    private boolean active;
}