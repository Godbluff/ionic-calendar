import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarAdministratePage } from './calendar-administrate';

@NgModule({
  declarations: [
    CalendarAdministratePage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarAdministratePage),
  ],
})
export class CalendarAdministratePageModule {}
