import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private a$ = new BehaviorSubject<number>(0);
  private b$ = new BehaviorSubject<number>(0);

  constructor() { }

  setA(num : number){
    this.a$.next(num);
  }

  setB(num : number){
    this.b$.next(num);
  }

  getA() : Observable<number>{
    return this.a$.asObservable();
  }

  getB() : Observable<number>{
    return this.b$.asObservable();
  }

  private isNumberValid(num: number): boolean {
    return (num > 0) && (num < 100) && (Number.isInteger(num));
  }


  isAValid() : Observable<boolean>{
    return this.a$.pipe(map(num => this.isNumberValid(num)));
  }

  isBValid() : Observable<boolean>{
    return this.b$.pipe(map(num => this.isNumberValid(num)));
  }

  isBothValid() : Observable<boolean>{
    let both$ = combineLatest([this.isAValid(), this.isBValid()]); // Observable<[boolean, boolean]>
    return both$.pipe(map(pair => pair[0] && pair[1]));
  }
  
}
