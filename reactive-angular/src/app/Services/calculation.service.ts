import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  private delay(millis: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, millis));
  }
  
  async add(num1: number, num2: number): Promise<number> {
    await this.delay(1000);
      return num1 + num2;
  }

  async sub(num1: number, num2: number): Promise<number>{
    await this.delay(1000);
    return num1 - num2;
  }

  async mul(num1: number, num2: number): Promise<number> {
    await this.delay(1000);
    return num1 * num2;
  }
}
