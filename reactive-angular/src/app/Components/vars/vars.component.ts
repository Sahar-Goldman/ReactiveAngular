import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '../../Services/state.service';

@Component({
  selector: 'app-vars',
  templateUrl: './vars.component.html',
  styleUrls: ['./vars.component.css']
})
export class VarsComponent implements OnInit {
  isAValid$!: Observable<boolean>;
  isBValid$!: Observable<boolean>;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.isAValid$ = this.stateService.isAValid();
    this.isBValid$ = this.stateService.isBValid();
  }

  setA(value: number) {
    this.stateService.setA(value);
  }

  setB(value: number) {
    this.stateService.setB(value);
  }

}
