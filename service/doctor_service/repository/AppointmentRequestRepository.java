package com.mediconnect.doctor_service.repository;

import com.mediconnect.doctor_service.entity.AppointmentRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppointmentRequestRepository extends MongoRepository<AppointmentRequest, String> {
    List<AppointmentRequest> findByDoctorId(String doctorId);
}
