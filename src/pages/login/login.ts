import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CalendarService} from "../../services/calendar/calendar-service";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  companyName: string = '';
  userName: string = '';

  constructor(public navCtrl: NavController, public calendarService: CalendarService) {

  }

  getCalendar(){
    this.calendarService.getCalendar(this.companyName, this.userName).subscribe((res)=>{
      this.navCtrl.push('MainPage', {token: res});
    });
  }

  viewMain(){
    this.navCtrl.push('MainPage');
  }
}
