package com.mediconnect.patientservice.controller;

import com.mediconnect.patientservice.dto.PatientDto;
import com.mediconnect.patientservice.dto.PaymentDto;
import com.mediconnect.patientservice.service.PatientService;
import com.mediconnect.patientservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/patients/me/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PaymentDto>> getMyPayments(@AuthenticationPrincipal String email) {
        System.out.println("PaymentController: GET /api/patients/me/payments called for email: " + email);
        if (email == null) {
            System.err.println("PaymentController Error: email principal is null!");
            return ResponseEntity.status(401).build();
        }

        try {
            PatientDto patient = patientService.getProfile(email);
            if (patient == null) {
                System.err.println("PaymentController Error: patient profile is null for email: " + email);
                return ResponseEntity.status(404).build();
            }
            
            System.out.println("PaymentController: Successfully retrieved patient profile for: " + email + ", ID: " + patient.getId());
            
            List<PaymentDto> payments = paymentService.getPaymentsByPatientId(patient.getId());
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            System.err.println("PaymentController Error: " + e.getMessage());
            e.printStackTrace();
            throw e; // Rethrow to let global handler or Spring handle it (or add local handler)
        }
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        System.err.println("PaymentController Local Exception Handler: " + e.getMessage());
        return ResponseEntity.status(500).body("Error retrieving payments: " + e.getMessage());
    }
}
