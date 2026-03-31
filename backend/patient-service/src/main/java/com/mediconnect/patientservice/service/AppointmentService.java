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

    public List<AppointmentDto> getAppointmentsByPatientId(String patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public AppointmentDto bookAppointment(AppointmentDto dto) {
        Appointment appointment = mapToEntity(dto);
        appointment.setStatus("PENDING");
        return mapToDto(appointmentRepository.save(appointment));
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
