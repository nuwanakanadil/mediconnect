package com.mediconnect.patientservice.service;

import com.mediconnect.patientservice.dto.PaymentDto;
import com.mediconnect.patientservice.entity.Payment;
import com.mediconnect.patientservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public List<PaymentDto> getPaymentsByPatientId(String patientId) {
        System.out.println("PaymentService: Fetching payments for patientId: " + patientId);
        if (patientId == null) {
            System.err.println("PaymentService Error: patientId is null!");
            return java.util.Collections.emptyList();
        }
        List<Payment> payments = paymentRepository.findByPatientId(patientId);
        System.out.println("PaymentService: Found " + (payments != null ? payments.size() : "null") + " payments.");
        
        return (payments == null ? java.util.Collections.<Payment>emptyList() : payments).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public PaymentDto createPayment(PaymentDto dto) {
        Payment payment = mapToEntity(dto);
        if (payment.getDate() == null) {
            payment.setDate(LocalDateTime.now());
        }
        return mapToDto(paymentRepository.save(payment));
    }

    private PaymentDto mapToDto(Payment entity) {
        return PaymentDto.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .appointmentId(entity.getAppointmentId())
                .doctorName(entity.getDoctorName())
                .amount(entity.getAmount())
                .date(entity.getDate())
                .status(entity.getStatus())
                .description(entity.getDescription())
                .type(entity.getType())
                .build();
    }

    private Payment mapToEntity(PaymentDto dto) {
        return Payment.builder()
                .id(dto.getId())
                .patientId(dto.getPatientId())
                .appointmentId(dto.getAppointmentId())
                .doctorName(dto.getDoctorName())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .status(dto.getStatus())
                .description(dto.getDescription())
                .type(dto.getType())
                .build();
    }
}
