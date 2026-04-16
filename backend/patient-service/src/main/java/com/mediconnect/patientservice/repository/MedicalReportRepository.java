package com.mediconnect.patientservice.repository;

import com.mediconnect.patientservice.entity.MedicalReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MedicalReportRepository extends MongoRepository<MedicalReport, String> {
    List<MedicalReport> findByPatientId(String patientId);
}
