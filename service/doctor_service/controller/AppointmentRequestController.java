package com.mediconnect.doctor_service.controller;

import com.mediconnect.doctor_service.entity.AppointmentRequest;
import com.mediconnect.doctor_service.service.AppointmentRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments/requests")
@RequiredArgsConstructor
public class AppointmentRequestController {

    private final AppointmentRequestService requestService;

    @PostMapping
    public AppointmentRequest createRequest(@RequestBody AppointmentRequest request) {
        return requestService.createRequest(request);
    }

    @GetMapping("/{id}")
    public AppointmentRequest getRequestById(@PathVariable String id) {
        return requestService.getRequestById(id);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<AppointmentRequest> getRequestsByDoctorId(@PathVariable String doctorId) {
        return requestService.getRequestsByDoctorId(doctorId);
    }

    @PutMapping("/{id}/status")
    public AppointmentRequest updateRequestStatus(@PathVariable String id, @RequestParam String status) {
        return requestService.updateRequestStatus(id, status);
    }
}
