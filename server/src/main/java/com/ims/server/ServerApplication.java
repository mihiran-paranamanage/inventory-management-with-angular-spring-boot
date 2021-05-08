package com.ims.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import javax.annotation.PostConstruct;
import java.util.TimeZone;

@EnableJpaAuditing
@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@PostConstruct
	public void init(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Colombo"));
	}
}
