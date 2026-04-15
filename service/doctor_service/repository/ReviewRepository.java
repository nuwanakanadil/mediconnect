package com.mediconnect.doctor_service.repository;

import com.mediconnect.doctor_service.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByDoctorId(String doctorId);
}
