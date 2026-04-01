package com.mediconnect.patientservice.service;

import com.mediconnect.patientservice.dto.MedicalReportDto;
import com.mediconnect.patientservice.entity.MedicalReport;
import com.mediconnect.patientservice.mapper.MedicalReportMapper;
import com.mediconnect.patientservice.repository.MedicalReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalReportService {

    private final MedicalReportRepository medicalReportRepository;
    private final MedicalReportMapper medicalReportMapper;

    @Value("${upload.path:./uploads/reports}")
    private String uploadPath;

    public List<MedicalReportDto> getReportsByPatientId(String patientId) {
        return medicalReportRepository.findByPatientId(patientId).stream()
                .map(medicalReportMapper::toDto)
                .collect(Collectors.toList());
    }

    public MedicalReportDto uploadReport(String patientId, MultipartFile file, String description) throws IOException {
        Path root = Paths.get(uploadPath);
        if (!Files.exists(root)) {
            Files.createDirectories(root);
        }

        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName != null ? originalFileName.substring(originalFileName.lastIndexOf(".")) : "";
        String fileName = UUID.randomUUID().toString() + fileExtension;
        Path targetLocation = root.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        MedicalReport report = MedicalReport.builder()
                .patientId(patientId)
                .fileName(fileName)
                .originalFileName(originalFileName)
                .fileType(file.getContentType())
                .filePath(targetLocation.toString())
                .description(description)
                .build();

        return medicalReportMapper.toDto(medicalReportRepository.save(report));
    }

    public MedicalReportDto saveReportMetadata(String patientId, MedicalReportDto dto) {
        System.out.println("DEBUG: Saving metadata for patient " + patientId);
        MedicalReport report = MedicalReport.builder()
                .patientId(patientId)
                .fileName(dto.getFileName())
                .originalFileName(dto.getOriginalFileName())
                .fileType(dto.getFileType())
                .fileUrl(dto.getFileUrl())
                .description(dto.getDescription())
                .uploadedAt(LocalDateTime.now())
                .build();
        
        MedicalReport saved = medicalReportRepository.save(report);
        System.out.println("DEBUG: Saved report with ID: " + saved.getId());
        return medicalReportMapper.toDto(saved);
    }

    public MedicalReportDto getReportById(String id) {
        return medicalReportRepository.findById(id)
                .map(medicalReportMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Report not found"));
    }

    public void deleteReport(String id) {
        MedicalReport report = medicalReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        
        if (report.getFilePath() != null) {
            try {
                Files.deleteIfExists(Paths.get(report.getFilePath()));
            } catch (IOException e) {
                System.err.println("Warning: Could not delete local file: " + report.getFilePath());
            }
        }
        
        medicalReportRepository.delete(report);
    }
}
