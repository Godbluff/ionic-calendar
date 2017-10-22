import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CalendarService} from "../../services/calendar/calendar-service";

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public calendarService: CalendarService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
    this.calendarService.fetchCalendar().subscribe((res)=>{
      console.log(res);
    });
  }

  toWinnerList(){
    this.navCtrl.push('WinnersPage');
  }

}
