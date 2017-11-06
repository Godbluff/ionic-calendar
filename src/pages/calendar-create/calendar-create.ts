import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditorProvider} from "../../providers/editor/editor";

/**
 * Generated class for the CalendarCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-create',
  templateUrl: 'calendar-create.html',
})
export class CalendarCreatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public editor: EditorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarCreatePage');
  }

  goToCalendarList(){
    this.navCtrl.push('EditorPage');
  }

}
