package com.mediconnect.doctor_service.repository;

import com.mediconnect.doctor_service.entity.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DoctorRepository extends MongoRepository<Doctor, String> {

    List<Doctor> findBySpecializationContainingIgnoreCase(String specialization);

    List<Doctor> findByLocationContainingIgnoreCase(String location);
}