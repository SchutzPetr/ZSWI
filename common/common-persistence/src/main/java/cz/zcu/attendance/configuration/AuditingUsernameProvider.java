package cz.zcu.attendance.configuration;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Username provider used for auditing. Should return username of current logged user.
 *
 * @author Ladislav Račák
 * @since 09.09.2016
 */
public class AuditingUsernameProvider implements AuditorAware<String> {


  @Override
  public String getCurrentAuditor() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
      return null;
    }

    return (String) authentication.getPrincipal();
  }
}
