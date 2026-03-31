package com.mediconnect.patientservice.controller;

import com.mediconnect.patientservice.dto.AppointmentDto;
import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.service.AppointmentService;
import com.mediconnect.patientservice.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients/me/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<AppointmentDto>> getMyAppointments(@AuthenticationPrincipal String email) {
        PatientDto patient = patientService.getProfile(email);
        return ResponseEntity.ok(appointmentService.getAppointmentsByPatientId(patient.getId()));
    }

    @PostMapping("/book")
    public ResponseEntity<AppointmentDto> bookAppointment(@AuthenticationPrincipal String email, @RequestBody AppointmentDto dto) {
        PatientDto patient = patientService.getProfile(email);
        dto.setPatientId(patient.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(appointmentService.bookAppointment(dto));
    }
}
