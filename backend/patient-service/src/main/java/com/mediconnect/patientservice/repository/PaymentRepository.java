package com.mediconnect.patientservice.repository;

import com.mediconnect.patientservice.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findByPatientId(String patientId);
}
