package com.mediconnect.doctor_service.dto;

import jakarta.validation.constraints.*;
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
public class DoctorRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String password;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @NotBlank(message = "Qualification is required")
    private String qualification;

    @NotNull(message = "Experience years is required")
    @Min(value = 0, message = "Experience years cannot be negative")
    private Integer experienceYears;

    @NotBlank(message = "Hospital name is required")
    private String hospitalName;

    @NotNull(message = "Consultation fee is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Consultation fee must be 0 or more")
    private BigDecimal consultationFee;

    private List<Schedule> availability;

    private List<String> verificationDocuments;

    private String bio;

    @NotBlank(message = "Location is required")
    private String location;
}