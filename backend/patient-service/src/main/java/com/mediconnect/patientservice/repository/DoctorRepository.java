package com.mediconnect.patientservice.repository;

import com.mediconnect.patientservice.entity.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DoctorRepository extends MongoRepository<Doctor, String> {
    List<Doctor> findByStatus(String status);
}
