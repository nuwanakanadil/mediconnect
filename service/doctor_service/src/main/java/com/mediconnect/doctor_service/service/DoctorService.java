package com.mediconnect.doctor_service.service;

import com.mediconnect.doctor_service.dto.DoctorRequest;
import com.mediconnect.doctor_service.dto.DoctorResponse;
import com.mediconnect.doctor_service.dto.DoctorLoginRequest;
import com.mediconnect.doctor_service.dto.DoctorAuthResponse;
import com.mediconnect.doctor_service.entity.Schedule;

import java.util.List;

public interface DoctorService {

    DoctorResponse createDoctor(DoctorRequest doctorRequest);

    List<DoctorResponse> getAllDoctors();

    DoctorResponse getDoctorById(String id);

    DoctorResponse updateDoctor(String id, DoctorRequest doctorRequest);

    void deleteDoctor(String id);

    List<DoctorResponse> searchDoctorsBySpecialization(String specialization);

    List<DoctorResponse> searchDoctorsByLocation(String location);

    DoctorResponse updateDoctorSchedule(String id, List<Schedule> availability);

    DoctorResponse verifyDoctor(String id);

    DoctorResponse deactivateDoctor(String id);

    DoctorAuthResponse loginDoctor(DoctorLoginRequest loginRequest);
}