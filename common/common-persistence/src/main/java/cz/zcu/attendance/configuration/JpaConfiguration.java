package cz.zcu.attendance.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


/**
 * @author Ladislav Račák
 * @since 11.08.2016
 */
@Configuration
@Getter
@Setter
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = {"cz.zcu.attendance"})
@EntityScan(basePackages = {"cz.zcu.attendance"})
@Import({JpaDataSourceProvider.class})
public class JpaConfiguration {

  @Bean
  public static AuditorAware<String> auditorProvider() {
    return new AuditingUsernameProvider();
  }

}
