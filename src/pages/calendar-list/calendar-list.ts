import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditorProvider} from "../../providers/editor/editor";

/**
 * Generated class for the CalendarListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-list',
  templateUrl: 'calendar-list.html',
})
export class CalendarListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private editor: EditorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarListPage');
    console.log(this.editor.calendars);
  }

  toEditorPage(){
    this.navCtrl.push('EditorPage');
  }

  toCalendarEdit(){
    this.navCtrl.push('EditorPage');
  }

}
