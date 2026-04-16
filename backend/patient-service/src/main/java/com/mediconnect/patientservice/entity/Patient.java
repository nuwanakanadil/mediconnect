package com.mediconnect.patientservice.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {

    @Id
    private String id;

    private String fullName;

    @Indexed(unique = true)
    private String email;
    private String password;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String bloodGroup;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String profileImageUrl;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
