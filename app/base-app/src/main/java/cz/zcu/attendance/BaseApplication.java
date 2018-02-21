package cz.zcu.attendance;

import org.flywaydb.core.Flyway;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Main abstract starting class for spring boot application.
 */
@EnableConfigurationProperties
@PropertySource(value = {"classpath:application-base.properties"})
@EnableScheduling
@EnableAsync
@EnableTransactionManagement
@EnableAspectJAutoProxy
@SpringBootApplication(scanBasePackages = {"cz.zcu.attendance"})
public abstract class BaseApplication {


  /**
   * Flyway migration strategy bean
   *
   * @return migration strategy
   */
  @Bean
  public static FlywayMigrationStrategy flywayMigrationStrategy() {
    return Flyway::validate;
  }


}
