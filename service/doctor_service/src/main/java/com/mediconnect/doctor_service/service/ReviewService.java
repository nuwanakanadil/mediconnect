package com.mediconnect.doctor_service.service;

import com.mediconnect.doctor_service.entity.Review;
import java.util.List;

public interface ReviewService {
    Review addReview(Review review);
    List<Review> getReviewsByDoctorId(String doctorId);
}
