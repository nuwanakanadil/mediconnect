package com.mediconnect.doctor_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorAuthResponse {
    private String doctorId;
    private String email;
    private String firstName;
    private String lastName;
    private String fullName;
    private String role;
}
