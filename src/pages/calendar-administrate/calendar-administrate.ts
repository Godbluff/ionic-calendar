import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CalendarService} from "../../services/calendar/calendar-service";
import {EditorProvider} from "../../providers/editor/editor";

/**
 * Generated class for the CalendarAdministratePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-administrate',
  templateUrl: 'calendar-administrate.html',
})
export class CalendarAdministratePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public editor: EditorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarAdministratePage');
  }

  goToCalendarList() {
    this.navCtrl.push('CalendarListPage')
  }

  adminCalendars() {
    this.editor.editCalendar().subscribe(()=> {
      this.navCtrl.push('CalendarListPage');
    });
  }

}
