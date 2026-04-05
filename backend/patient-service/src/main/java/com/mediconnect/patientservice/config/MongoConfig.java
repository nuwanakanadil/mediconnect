package com.mediconnect.patientservice.config;

import com.mongodb.client.MongoClient;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class MongoConfig {

    private final MongoClient mongoClient;

    @PostConstruct
    public void checkConnection() {
        System.out.println("MONGODB DIAGNOSTIC: Checking database connectivity...");
        try {
            // Attempt a simple ping to the admin database
            mongoClient.getDatabase("admin").runCommand(new Document("ping", 1));
            System.out.println("MONGODB DIAGNOSTIC: Successfully connected to MongoDB cluster.");
        } catch (Exception e) {
            System.err.println("MONGODB DIAGNOSTIC ERROR: Failed to connect to MongoDB!");
            System.err.println("CAUSE: " + e.getMessage());
            System.err.println("---------------------------------------------------------");
            System.err.println("TROUBLESHOOTING TIPS:");
            System.err.println("1. Check Atlas Whitelist: Ensure your current public IP is listed.");
            if (e.getMessage() != null && e.getMessage().contains("InetAddress")) {
                System.err.println("2. DNS SRV Issue Detected: Your network might not resolve 'mongodb+srv'.");
                System.err.println("   TIP: Try 'mongodb://' standard URI in application.properties.");
            } else {
                System.err.println("2. Check Internet/Firewall: Port 27017 must be open.");
            }
            System.err.println("3. Fallback: If Atlas is down/unreachable, switch to a local MongoDB.");
            System.err.println("---------------------------------------------------------");
        }
    }
}
