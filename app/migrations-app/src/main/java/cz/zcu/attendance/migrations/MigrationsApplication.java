package cz.zcu.attendance.migrations;

import cz.zcu.attendance.configuration.JpaDataSourceProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

@Slf4j
@Configuration
@PropertySource(value = {"classpath:application.properties"})
@EnableConfigurationProperties
@Import({
    JpaDataSourceProvider.class,
    FlywayAutoConfiguration.class
})
public class MigrationsApplication {

  public static void main(String[] args) {
    SpringApplication.run(MigrationsApplication.class, args);
  }
}
