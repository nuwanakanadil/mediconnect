package com.mediconnect.patientservice.repository;

import com.mediconnect.patientservice.entity.Dependent;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DependentRepository extends MongoRepository<Dependent, String> {
    List<Dependent> findByPatientId(String patientId);
}
