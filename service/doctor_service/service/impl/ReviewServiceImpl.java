package com.mediconnect.doctor_service.service.impl;

import com.mediconnect.doctor_service.entity.Review;
import com.mediconnect.doctor_service.repository.ReviewRepository;
import com.mediconnect.doctor_service.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public Review addReview(Review review) {
        review.setCreatedAt(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewsByDoctorId(String doctorId) {
        return reviewRepository.findByDoctorId(doctorId);
    }
}
