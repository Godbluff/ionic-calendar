import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditorProvider} from "../../providers/editor/editor";

/**
 * Generated class for the CalendarInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-info',
  templateUrl: 'calendar-info.html',
})
export class CalendarInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private editor: EditorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarInfoPage');
  }

}
