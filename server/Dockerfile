FROM openjdk:11-jre-slim
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} /server.jar
ENTRYPOINT ["java","-jar","/server.jar"]