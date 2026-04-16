package com.mediconnect.patientservice.repository;

import com.mediconnect.patientservice.entity.MedicalHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MedicalHistoryRepository extends MongoRepository<MedicalHistory, String> {
    List<MedicalHistory> findByPatientId(String patientId);
}
