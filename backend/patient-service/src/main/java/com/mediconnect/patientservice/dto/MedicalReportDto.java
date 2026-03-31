package com.mediconnect.patientservice.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
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
