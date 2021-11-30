import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BmiCalculatorService {
  constructor() {}

  /**
   * Calculate BMI
   * @param weight kg
   * @param height cm
   */
  calculateBmi(weight: number, height: number): number {
    if (weight == null || height == null) {
      return null;
    }

    try {
      const bmi = ((weight * 10000) / (height * height)).toFixed(2);
      return parseFloat(bmi);
    } catch (e) {
      return null;
    }
  }
}
