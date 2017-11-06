import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarMembersPage } from './calendar-members';

@NgModule({
  declarations: [
    CalendarMembersPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarMembersPage),
  ],
})
export class CalendarMembersPageModule {}
