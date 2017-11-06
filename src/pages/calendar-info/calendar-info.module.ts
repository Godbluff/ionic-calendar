import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarInfoPage } from './calendar-info';

@NgModule({
  declarations: [
    CalendarInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarInfoPage),
  ],
})
export class CalendarInfoPageModule {}
