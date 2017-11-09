import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarDoorsPage } from './calendar-doors';
import {Camera} from "@ionic-native/camera";

@NgModule({
  declarations: [
    CalendarDoorsPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarDoorsPage),
  ],
  providers:[
    Camera
  ]
})
export class CalendarDoorsPageModule {}
