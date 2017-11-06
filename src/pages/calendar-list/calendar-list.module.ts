import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarListPage } from './calendar-list';

@NgModule({
  declarations: [
    CalendarListPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarListPage),
  ],
})
export class CalendarListPageModule {}
