package com.mediconnect.doctor_service.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    
    @Id
    private String id;
    
    private String doctorId;
    private String patientId;
    
    private int rating; // 1 to 5
    private String comment;
    
    private LocalDateTime createdAt;
}
