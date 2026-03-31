package com.mediconnect.patientservice.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "medical_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalReport {

    @Id
    private String id;

    private String patientId;
    private String fileName;
    private String originalFileName;
    private String fileType;
    private String filePath;
    private String description;

    @CreatedDate
    private LocalDateTime uploadedAt;
}
