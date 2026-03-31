package com.mediconnect.patientservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalReportDto {
    private String id;
    private String patientId;
    private String fileName;
    private String originalFileName;
    private String fileType;
    private String description;
    private LocalDateTime uploadedAt;
}
