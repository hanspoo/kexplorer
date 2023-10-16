/* Desplegar la diferencia en horas y minutos */

import moment, { Moment } from "moment";
import { elapsedAsString } from "../src/utils";

describe("muestra tiempo transcurrido entre dos fecha", () => {
  test("exactamente 0 todo", () => {
    const t1 = moment("2013-02-08 09:30:26");
    const t2 = moment("2013-02-08 09:30:26");
    const s = elapsedAsString(t1, t2);
    expect(s).toBe("0");
  });
  test("exactamente 1 minuto", () => {
    const t1 = moment("2013-02-08 09:30:26");
    const t2 = moment("2013-02-08 09:31:26");
    const s = elapsedAsString(t1, t2);
    expect(s).toBe("1 minuto");
  });
  test("exactamente 2 minutos", () => {
    const t1 = moment("2013-02-08 09:30:26");
    const t2 = moment("2013-02-08 09:32:26");
    const s = elapsedAsString(t1, t2);
    expect(s).toBe("2 minutos");
  });
  test("menos de 1 minuto dice hace un instante", () => {
    const t1 = moment("2013-02-08 09:30:26");
    const t2 = moment("2013-02-08 09:31:24");
    const s = elapsedAsString(t1, t2);
    expect(s).toBe("un instante");
  });
  test("1 hora exacta", () => {
    const t1 = moment("2013-02-08 09:30:26");
    const t2 = moment("2013-02-08 10:30:26");
    const s = elapsedAsString(t1, t2);
    expect(s).toBe("1 hora");
  });
  test("2 horas", () => {
    const t1 = moment("2013-02-08 09:30:26");
    const t2 = moment("2013-02-08 11:30:26");
    const s = elapsedAsString(t1, t2);
    expect(s).toBe("2 horas");
  });
});

// public void printDifference(Date startDate, Date endDate){

//     //milliseconds
//     long different = endDate.getTime() - startDate.getTime();

//     System.out.println("startDate : " + startDate);
//     System.out.println("endDate : "+ endDate);
//     System.out.println("different : " + different);

//     long secondsInMilli = 1000;
//     long minutesInMilli = secondsInMilli * 60;
//     long hoursInMilli = minutesInMilli * 60;
//     long daysInMilli = hoursInMilli * 24;

//     //long elapsedDays = different / daysInMilli;
//     //different = different % daysInMilli;

//     long elapsedHours = different / hoursInMilli;
//     different = different % hoursInMilli;

//     long elapsedMinutes = different / minutesInMilli;
//     different = different % minutesInMilli;

//     long elapsedSeconds = different / secondsInMilli;

//     System.out.printf(
//         "%d hours, %d minutes, %d seconds%n",
//         elapsedHours, elapsedMinutes, elapsedSeconds);

// }
