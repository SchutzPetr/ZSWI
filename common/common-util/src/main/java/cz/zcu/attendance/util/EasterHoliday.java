package cz.zcu.attendance.util;

import java.time.LocalDate;
import lombok.experimental.UtilityClass;
import org.jetbrains.annotations.NotNull;

@UtilityClass
public class EasterHoliday {

  @NotNull
  public LocalDate getEasterMonday(int year) {

    int month;
    int day;

    int a = year % 19;
    int b = year % 4;
    int c = year % 7;

    int m = 24;    //Constant for 20th and 21th century
    int n = 5;    //Constant for 20th and 21th century

    int d = (19 * a + m) % 30;
    int e = (n + 2 * b + 4 * c + 6 * d) % 7;

    int u = d + e - 9;

    if (u == 25 && d == 28 && e == 6 && a > 10) {

      month = 4;
      day = 18;

    } else if (u >= 1 && u <= 25) {

      month = 4;
      day = u;

    } else if (u > 25) {

      u = u - 7;
      month = 4;
      day = u;

    } else {
      u = 22 + d + e;
      month = 3;
      day = u;
    }

    return LocalDate.of(year, month, day).plusDays(1);
  }


  @NotNull
  public static LocalDate getEasterFriday(int year) {
    return getEasterMonday(year).minusDays(3);
  }

}
