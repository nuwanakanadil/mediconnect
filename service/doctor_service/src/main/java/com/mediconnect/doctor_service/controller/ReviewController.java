package com.mediconnect.doctor_service.controller;

import com.mediconnect.doctor_service.entity.Review;
import com.mediconnect.doctor_service.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Review> getReviewsByDoctorId(@PathVariable String doctorId) {
        return reviewService.getReviewsByDoctorId(doctorId);
    }
}
