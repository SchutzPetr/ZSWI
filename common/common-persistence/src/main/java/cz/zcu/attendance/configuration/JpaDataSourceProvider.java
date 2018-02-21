package cz.zcu.attendance.configuration;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import java.beans.PropertyVetoException;
import javax.sql.DataSource;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "db")
@PropertySource(value = {"classpath:application-common-persistence.properties"})
public class JpaDataSourceProvider {

  private String user;

  private String password;

  private String url;

  private String server;

  private String schema;

  private String driver;

  private Integer minPoolSize;

  private Integer maxPoolSize;

  private Integer maxIdleTime;

  private Integer maxStatementsPerConnection;

  private Integer maxStatements;

  private String preferredTestQuery;

  private DataSource createDataSource() throws PropertyVetoException {
    DataSourceBuilder dsb = DataSourceBuilder.create().type(ComboPooledDataSource.class);

    ComboPooledDataSource dataSource = (ComboPooledDataSource) dsb.build();
    dataSource.setMinPoolSize(minPoolSize);
    dataSource.setMaxPoolSize(maxPoolSize);
    dataSource.setMaxIdleTime(maxIdleTime);
    dataSource.setMaxStatements(maxStatements);
    dataSource.setMaxStatementsPerConnection(maxStatementsPerConnection);
    dataSource.setJdbcUrl(url);
    dataSource.setPassword(password);
    dataSource.setUser(user);
    dataSource.setDriverClass(driver);
    dataSource.setTestConnectionOnCheckin(true);
    dataSource.setTestConnectionOnCheckout(true);
    dataSource.setPreferredTestQuery(preferredTestQuery);
    dataSource.setInitialPoolSize(minPoolSize);
    dataSource.setAcquireRetryAttempts(-1);

    return dataSource;
  }

  @Bean(name = "dataSource")
  @Primary
  public DataSource dataSource() throws PropertyVetoException {
    return createDataSource();
  }
}
