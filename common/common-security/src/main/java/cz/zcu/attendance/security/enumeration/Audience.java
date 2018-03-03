package cz.zcu.attendance.security.enumeration;

import org.springframework.mobile.device.Device;

/**
 * Created by Petr Schutz on 21.02.2018
 *
 * @author Petr Schutz
 * @version 1.0
 */
public enum Audience {
    AUDIENCE_UNKNOWN,
    AUDIENCE_WEB,
    AUDIENCE_MOBILE,
    AUDIENCE_TABLET;

    public static Audience getAudience(Device device){
        Audience audience;
        if (device.isNormal()) {
            audience = AUDIENCE_WEB;
        } else if (device.isTablet()) {
            audience = AUDIENCE_TABLET;
        } else if (device.isMobile()) {
            audience = AUDIENCE_MOBILE;
        }else{
            audience = AUDIENCE_UNKNOWN;
        }
        return audience;
    }
}
