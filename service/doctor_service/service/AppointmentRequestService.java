package com.mediconnect.doctor_service.service;

import com.mediconnect.doctor_service.entity.AppointmentRequest;
import java.util.List;

public interface AppointmentRequestService {
    AppointmentRequest createRequest(AppointmentRequest request);
    AppointmentRequest getRequestById(String id);
    List<AppointmentRequest> getRequestsByDoctorId(String doctorId);
    AppointmentRequest updateRequestStatus(String id, String status);
}
