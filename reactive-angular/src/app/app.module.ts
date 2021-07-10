import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalcViewComponent } from './Components/calc-view/calc-view.component';
import { VarsComponent } from './Components/vars/vars.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcViewComponent,
    VarsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
