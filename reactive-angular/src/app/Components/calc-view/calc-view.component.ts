import { Component, OnInit } from '@angular/core';
import { combineLatest, merge, Observable } from 'rxjs';
import { map, mapTo, switchAll } from 'rxjs/operators';
import { CalculationService } from '../../Services/calculation.service';
import { StateService } from '../../Services/state.service';

@Component({
  selector: 'app-calc-view',
  templateUrl: './calc-view.component.html',
  styleUrls: ['./calc-view.component.css']
})
export class CalcViewComponent implements OnInit {
  a$!: Observable<number>;
  b$!: Observable<number>;
  sum$!: Observable<number>;
  diff$!: Observable<number>;
  mult$!: Observable<number>;
  isValid$!: Observable<boolean>;
  isBusy$!: Observable<boolean>;

  constructor(private calculationService: CalculationService,
    private stateService : StateService) { 
  }

  ngOnInit(): void {
    
    this.a$ = this.stateService.getA();
    this.b$ = this.stateService.getB();

    let both$ = combineLatest([this.a$, this.b$]);  // Observable<[number, number]>

    this.sum$ = both$.pipe(
      map(pair => this.calculationService.add(pair[0], pair[1])), 
      switchAll()
    );

    this.diff$ = both$.pipe(
      map(pair => this.calculationService.sub(pair[0], pair[1])), 
      switchAll()
    );

    this.mult$ = both$.pipe(
      map(pair => this.calculationService.mul(pair[0], pair[1])), 
      switchAll()
    );

    this.isValid$ = this.stateService.isBothValid();

    // when both$ fires an event it means that either a or b changed
    // when sum, diff, and product fire an event, it means that calculation is over
    // so when both fires an event: busy = true
    // when sum, diff, and product fire an event, busy = false

    let true$ = both$.pipe(mapTo(true));
    let false$ = merge(this.sum$, this.mult$, this.diff$).pipe(mapTo(false));

    this.isBusy$ = merge(true$, false$);
  }

}
