package com.mediconnect.doctor_service.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Medication {
    private String name;
    private String dosage;
    private String frequency;
    private int durationDays;
}
