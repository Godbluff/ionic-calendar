import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CalendarService} from "../../services/calendar/calendar-service";
import {LanguageService} from "../../services/language/language-service";

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

  errorMessage: string = 'oopa';
  retrievedToken;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public calendarService: CalendarService,
              private languageService: LanguageService) {
  }

  ionViewDidLoad() {
    this.calendarService.fetchCalendar();
    console.log('ionViewDidLoad CalendarPage');
  }

  ionViewCanEnter(){
    this.calendarService.fetchCalendar().subscribe((res)=>{
      return this.calendarService.userCalendar.length > 0;
    });

  }

  toWinnerList() {
    this.navCtrl.push('WinnersPage');
  }

}
