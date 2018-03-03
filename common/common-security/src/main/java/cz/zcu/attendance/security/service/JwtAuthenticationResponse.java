package cz.zcu.attendance.security.service;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

/**
 * Created by Petr Schutz on 21.02.2018
 *
 * @author Petr Schutz
 * @version 1.0
 */
@Getter
@AllArgsConstructor
public class JwtAuthenticationResponse implements Serializable {

    private static final long serialVersionUID = 1250166508152483573L;

    private final String token;
}
