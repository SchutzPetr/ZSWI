package cz.zcu.attendance.util;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;

/**
 * Created by Petr Schutz on 01.03.2018
 *
 * @author Petr Schutz
 * @version 1.0
 */
class EasterHolidayTest {

  @Test
  void getEasterMonday() {
    assertTrue(EasterHoliday.getEasterMonday(2018).isEqual(LocalDate.of(2018, 4, 2)));
  }

  @Test
  void getEasterFriday() {
    assertTrue(EasterHoliday.getEasterFriday(2018).isEqual(LocalDate.of(2018, 3, 30)));
  }
}