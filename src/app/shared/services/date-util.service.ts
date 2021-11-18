import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateUtilService {
  constructor() {}

  public toDate(dateString: string | number): Date {
    if (dateString) {
      try {
        return new Date(dateString);
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
  }

  public toDateString(date: Date): string {
    try {
      const [day, month, year] = [
        `${date.getDate()}`.padStart(2, '0'),
        `${date.getMonth() + 1}`.padStart(2, '0'),
        date.getFullYear(),
      ];
      return `${year}-${month}-${day}`;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public toDateTimeString(date: Date): string {
    try {
      const [year, month, day] = [
        date.getFullYear(),
        `${date.getMonth() + 1}`.padStart(2, '0'),
        `${date.getDate()}`.padStart(2, '0'),
      ];
      const [hour, minutes, seconds] = [
        `${date.getHours()}`.padStart(2, '0'),
        `${date.getMinutes()}`.padStart(2, '0'),
        `${date.getSeconds()}`.padStart(2, '0'),
      ];
      return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
