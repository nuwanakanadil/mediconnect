# Use a lightweight Java 17 runtime as the base image
FROM eclipse-temurin:17-jre-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the target directory to the container
# This assumes you have run 'mvn clean package' locally first
COPY target/*.jar app.jar

# Expose the port the service runs on
EXPOSE 8081

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
