import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarCreatePage } from './calendar-create';

@NgModule({
  declarations: [
    CalendarCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarCreatePage),
  ],
})
export class CalendarCreatePageModule {}
