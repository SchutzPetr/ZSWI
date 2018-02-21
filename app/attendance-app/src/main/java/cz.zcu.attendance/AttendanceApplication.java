package cz.zcu.attendance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@PropertySource(value = {"classpath:application.properties"})
@SpringBootApplication
public class AttendanceApplication extends BaseApplication {

  public static void main(String[] args) {
    SpringApplication.run(AttendanceApplication.class, args);
  }
}
