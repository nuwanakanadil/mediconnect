package com.mediconnect.patientservice.service;

import com.mediconnect.patientservice.dto.AppointmentDto;
import com.mediconnect.patientservice.entity.Appointment;
import com.mediconnect.patientservice.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PaymentService paymentService;

    public List<AppointmentDto> getAppointmentsByPatientId(String patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public AppointmentDto bookAppointment(AppointmentDto dto) {
        Appointment appointment = mapToEntity(dto);
        appointment.setStatus("PENDING");
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Record payment
        paymentService.createPayment(com.mediconnect.patientservice.dto.PaymentDto.builder()
                .patientId(savedAppointment.getPatientId())
                .appointmentId(savedAppointment.getId())
                .doctorName(savedAppointment.getDoctorName())
                .amount(150.0) // Fixed fee for now
                .date(java.time.LocalDateTime.now())
                .status("paid")
                .description("Consultation - " + savedAppointment.getDoctorName())
                .type("payment")
                .build());

        return mapToDto(savedAppointment);
    }

    private AppointmentDto mapToDto(Appointment entity) {
        return AppointmentDto.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .doctorId(entity.getDoctorId())
                .doctorName(entity.getDoctorName())
                .specialization(entity.getSpecialization())
                .dateTime(entity.getDateTime())
                .status(entity.getStatus())
                .type(entity.getType())
                .reason(entity.getReason())
                .build();
    }

    private Appointment mapToEntity(AppointmentDto dto) {
        return Appointment.builder()
                .id(dto.getId())
                .patientId(dto.getPatientId())
                .doctorId(dto.getDoctorId())
                .doctorName(dto.getDoctorName())
                .specialization(dto.getSpecialization())
                .dateTime(dto.getDateTime())
                .status(dto.getStatus())
                .type(dto.getType())
                .reason(dto.getReason())
                .build();
    }
}
