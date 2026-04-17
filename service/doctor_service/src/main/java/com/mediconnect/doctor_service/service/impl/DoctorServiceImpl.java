package com.mediconnect.doctor_service.service.impl;

import com.mediconnect.doctor_service.dto.DoctorRequest;
import com.mediconnect.doctor_service.dto.DoctorResponse;
import com.mediconnect.doctor_service.dto.DoctorLoginRequest;
import com.mediconnect.doctor_service.dto.DoctorAuthResponse;
import com.mediconnect.doctor_service.entity.Doctor;
import com.mediconnect.doctor_service.entity.Schedule;
import com.mediconnect.doctor_service.exception.ResourceNotFoundException;
import com.mediconnect.doctor_service.repository.DoctorRepository;
import com.mediconnect.doctor_service.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    @Override
    public DoctorResponse createDoctor(DoctorRequest doctorRequest) {
        Doctor doctor = new Doctor();
        mapRequestToEntity(doctorRequest, doctor);
        if (doctor.getPassword() == null || doctor.getPassword().isBlank()) {
            // Backward-compatible default for existing flows that did not provide password.
            doctor.setPassword(doctorRequest.getPhone());
        }
        doctor.setVerified(false);
        doctor.setActive(true);

        Doctor savedDoctor = doctorRepository.save(doctor);
        return mapEntityToResponse(savedDoctor);
    }

    @Override
    public List<DoctorResponse> getAllDoctors() {
        return doctorRepository.findAll()
            .stream()
            .map(this::mapEntityToResponse)
            .toList();
    }

    @Override
    public DoctorResponse getDoctorById(String id) {
        Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));

        return mapEntityToResponse(doctor);
    }

    @Override
    public DoctorResponse updateDoctor(String id, DoctorRequest doctorRequest) {
        Doctor existingDoctor = doctorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));

        String existingPassword = existingDoctor.getPassword();
        mapRequestToEntity(doctorRequest, existingDoctor);
        if (doctorRequest.getPassword() == null || doctorRequest.getPassword().isBlank()) {
            existingDoctor.setPassword(existingPassword);
        }

        Doctor updatedDoctor = doctorRepository.save(existingDoctor);
        return mapEntityToResponse(updatedDoctor);
    }

    @Override
    public void deleteDoctor(String id) {
        Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));

        doctorRepository.delete(doctor);
    }

    @Override
    public List<DoctorResponse> searchDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecializationContainingIgnoreCase(specialization)
            .stream()
            .map(this::mapEntityToResponse)
            .toList();
    }

    @Override
    public List<DoctorResponse> searchDoctorsByLocation(String location) {
        return doctorRepository.findByLocationContainingIgnoreCase(location)
            .stream()
            .map(this::mapEntityToResponse)
            .toList();
    }

    @Override
    public DoctorResponse updateDoctorSchedule(String id, List<Schedule> availability) {
        Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));

        doctor.setAvailability(availability);

        Doctor updatedDoctor = doctorRepository.save(doctor);
        return mapEntityToResponse(updatedDoctor);
    }

    @Override
    public DoctorResponse verifyDoctor(String id) {
        Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));

        doctor.setVerified(true);

        Doctor updatedDoctor = doctorRepository.save(doctor);
        return mapEntityToResponse(updatedDoctor);
    }

    @Override
    public DoctorResponse deactivateDoctor(String id) {
        Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));

        doctor.setActive(false);

        Doctor updatedDoctor = doctorRepository.save(doctor);
        return mapEntityToResponse(updatedDoctor);
    }

    @Override
    public DoctorAuthResponse loginDoctor(DoctorLoginRequest loginRequest) {
        Doctor doctor = doctorRepository.findByEmailIgnoreCase(loginRequest.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Invalid doctor email or password"));

        if (!doctor.isActive()) {
            throw new IllegalArgumentException("Doctor account is deactivated");
        }

        String storedPassword = doctor.getPassword();
        boolean matches;

        if (storedPassword == null || storedPassword.isBlank()) {
            // Legacy compatibility: if password was never stored, trust first successful doctor login
            // attempt and persist that password for subsequent logins.
            doctor.setPassword(loginRequest.getPassword());
            doctorRepository.save(doctor);
            matches = true;
        } else {
            matches = storedPassword.equals(loginRequest.getPassword());
        }

        if (!matches) {
            throw new IllegalArgumentException("Invalid doctor email or password");
        }

        String fullName = (doctor.getFirstName() + " " + doctor.getLastName()).trim();
        return new DoctorAuthResponse(
            doctor.getId(),
            doctor.getEmail(),
            doctor.getFirstName(),
            doctor.getLastName(),
            fullName,
            "DOCTOR"
        );
    }

    private void mapRequestToEntity(DoctorRequest doctorRequest, Doctor doctor) {
        doctor.setFirstName(doctorRequest.getFirstName());
        doctor.setLastName(doctorRequest.getLastName());
        doctor.setEmail(doctorRequest.getEmail());
        doctor.setPhone(doctorRequest.getPhone());
        doctor.setPassword(doctorRequest.getPassword());
        doctor.setSpecialization(doctorRequest.getSpecialization());
        doctor.setQualification(doctorRequest.getQualification());
        doctor.setExperienceYears(doctorRequest.getExperienceYears());
        doctor.setHospitalName(doctorRequest.getHospitalName());
        doctor.setConsultationFee(doctorRequest.getConsultationFee());
        doctor.setAvailability(doctorRequest.getAvailability());
        doctor.setVerificationDocuments(doctorRequest.getVerificationDocuments());
        doctor.setBio(doctorRequest.getBio());
        doctor.setLocation(doctorRequest.getLocation());
    }

    private DoctorResponse mapEntityToResponse(Doctor doctor) {
        return new DoctorResponse(
            doctor.getId(),
            doctor.getFirstName(),
            doctor.getLastName(),
            doctor.getEmail(),
            doctor.getPhone(),
            doctor.getSpecialization(),
            doctor.getQualification(),
            doctor.getExperienceYears(),
            doctor.getHospitalName(),
            doctor.getConsultationFee(),
            doctor.getAvailability(),
            doctor.getVerificationDocuments(),
            doctor.getBio(),
            doctor.getLocation(),
            doctor.isVerified(),
            doctor.isActive()
        );
    }
}