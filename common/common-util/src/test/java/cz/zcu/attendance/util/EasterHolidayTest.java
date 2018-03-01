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

  @Test
  void getEasterMonday() {
    assertTrue(EasterHoliday.getEasterMonday(2019).isEqual(LocalDate.of(2019, 4, 22)));
  }

  @Test
  void getEasterFriday() {
    assertTrue(EasterHoliday.getEasterFriday(2019).isEqual(LocalDate.of(2019, 4, 19)));
  }

  @Test
  void getEasterMonday() {
    assertTrue(EasterHoliday.getEasterMonday(2020).isEqual(LocalDate.of(2020, 4, 13)));
  }

  @Test
  void getEasterFriday() {
    assertTrue(EasterHoliday.getEasterFriday(2020).isEqual(LocalDate.of(2020, 4, 10)));
  }

  @Test
  void getEasterMonday() {
    assertTrue(EasterHoliday.getEasterMonday(2021).isEqual(LocalDate.of(2021, 4, 5)));
  }

  @Test
  void getEasterFriday() {
    assertTrue(EasterHoliday.getEasterFriday(2021).isEqual(LocalDate.of(2021, 4, 2)));
  }

  @Test
  void getEasterMonday() {
    assertTrue(EasterHoliday.getEasterMonday(2022).isEqual(LocalDate.of(2022, 4, 18)));
  }

  @Test
  void getEasterFriday() {
    assertTrue(EasterHoliday.getEasterFriday(2022).isEqual(LocalDate.of(2022, 4, 15)));
  }

  @Test
  void getEasterMonday() {
    assertTrue(EasterHoliday.getEasterMonday(2023).isEqual(LocalDate.of(2023, 4, 10)));
  }

  @Test
  void getEasterFriday() {
    assertTrue(EasterHoliday.getEasterFriday(2023).isEqual(LocalDate.of(2023, 4, 7)));
  }

  @Test
  void getEasterMonday() {
    assertTrue(EasterHoliday.getEasterMonday(2024).isEqual(LocalDate.of(2024, 4, 1)));
  }

  @Test
  void getEasterFriday() {
    assertTrue(EasterHoliday.getEasterFriday(2024).isEqual(LocalDate.of(2024, 3, 29)));
  }

}