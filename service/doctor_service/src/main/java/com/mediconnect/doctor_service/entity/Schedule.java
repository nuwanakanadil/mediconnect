package com.mediconnect.doctor_service.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
    private String dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private int maxAppointments;
}
