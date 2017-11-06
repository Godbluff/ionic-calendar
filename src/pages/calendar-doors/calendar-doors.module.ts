import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarDoorsPage } from './calendar-doors';

@NgModule({
  declarations: [
    CalendarDoorsPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarDoorsPage),
  ],
})
export class CalendarDoorsPageModule {}
