import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CalendarService} from "../../services/calendar/calendar-service";

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  isLoading: boolean = true;
  token: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public calendarService: CalendarService) {
  }

  ionViewDidLoad() {
    this.token = this.navParams.get('token');
    this.calendarService.fetchCalendar().subscribe(()=>{
      this.isLoading = false;
    })
  }

  toCalendarPage(){
    this.navCtrl.push('CalendarPage');
  }

}
