package com.mediconnect.doctor_service.controller;

import com.mediconnect.doctor_service.dto.DoctorRequest;
import com.mediconnect.doctor_service.dto.DoctorResponse;
import com.mediconnect.doctor_service.entity.Schedule;
import com.mediconnect.doctor_service.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @PostMapping
    public DoctorResponse createDoctor(@Valid @RequestBody DoctorRequest doctorRequest) {
        return doctorService.createDoctor(doctorRequest);
    }

    @GetMapping
    public List<DoctorResponse> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public DoctorResponse getDoctorById(@PathVariable String id) {
        return doctorService.getDoctorById(id);
    }

    @PutMapping("/{id}")
    public DoctorResponse updateDoctor(@PathVariable String id,
                                       @Valid @RequestBody DoctorRequest doctorRequest) {
        return doctorService.updateDoctor(id, doctorRequest);
    }

    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable String id) {
        doctorService.deleteDoctor(id);
        return "Doctor deleted successfully";
    }

    @GetMapping("/search/specialization")
    public List<DoctorResponse> searchDoctorsBySpecialization(@RequestParam String specialization) {
        return doctorService.searchDoctorsBySpecialization(specialization);
    }

    @GetMapping("/search/location")
    public List<DoctorResponse> searchDoctorsByLocation(@RequestParam String location) {
        return doctorService.searchDoctorsByLocation(location);
    }

    @PutMapping("/{id}/schedule")
    public DoctorResponse updateDoctorSchedule(@PathVariable String id,
                                               @RequestBody List<Schedule> availability) {
        return doctorService.updateDoctorSchedule(id, availability);
    }

    @PutMapping("/{id}/verify")
    public DoctorResponse verifyDoctor(@PathVariable String id) {
        return doctorService.verifyDoctor(id);
    }

    @PutMapping("/{id}/deactivate")
    public DoctorResponse deactivateDoctor(@PathVariable String id) {
        return doctorService.deactivateDoctor(id);
    }
}