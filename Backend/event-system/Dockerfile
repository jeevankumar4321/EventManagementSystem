# 1. Use a base image with Java 17 and Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
# 2. Build the app (Skip tests to speed it up)
RUN mvn clean package -DskipTests

# 3. Create the final image to run the app
FROM openjdk:17.0.1-jdk-slim
COPY --from=build /app/target/*.jar app.jar
# 4. Open port 8080
EXPOSE 8080
# 5. Run the jar
ENTRYPOINT ["java","-jar","app.jar"]