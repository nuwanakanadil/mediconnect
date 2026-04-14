package com.mediconnect.doctor_service.service.impl;

import com.mediconnect.doctor_service.entity.AppointmentRequest;
import com.mediconnect.doctor_service.entity.AppointmentStatus;
import com.mediconnect.doctor_service.exception.ResourceNotFoundException;
import com.mediconnect.doctor_service.repository.AppointmentRequestRepository;
import com.mediconnect.doctor_service.service.AppointmentRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentRequestServiceImpl implements AppointmentRequestService {

    private final AppointmentRequestRepository requestRepository;

    @Override
    public AppointmentRequest createRequest(AppointmentRequest request) {
        request.setRequestedAt(LocalDateTime.now());
        request.setStatus(AppointmentStatus.PENDING);
        return requestRepository.save(request);
    }

    @Override
    public AppointmentRequest getRequestById(String id) {
        return requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found with id: " + id));
    }

    @Override
    public List<AppointmentRequest> getRequestsByDoctorId(String doctorId) {
        return requestRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<AppointmentRequest> getRequestsByDoctorIdAndStatus(String doctorId, String status) {
        return requestRepository.findByDoctorIdAndStatus(doctorId, parseStatus(status));
    }

    @Override
    public AppointmentRequest updateRequestStatus(String id, String status) {
        AppointmentRequest request = getRequestById(id);
        request.setStatus(parseStatus(status));
        return requestRepository.save(request);
    }

    private AppointmentStatus parseStatus(String status) {
        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("Status is required");
        }

        return switch (status.trim().toUpperCase()) {
            case "PENDING" -> AppointmentStatus.PENDING;
            case "ACCEPTED", "CONFIRMED" -> AppointmentStatus.ACCEPTED;
            case "REJECTED", "CANCELLED", "CANCELED" -> AppointmentStatus.REJECTED;
            case "COMPLETED", "DONE" -> AppointmentStatus.COMPLETED;
            default -> throw new IllegalArgumentException("Invalid status: " + status);
        };
    }
}
