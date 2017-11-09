import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {EditorProvider} from "../../providers/editor/editor";

/**
 * Generated class for the EditorPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editor',
  templateUrl: 'editor.html'
})
export class EditorPage {

  calendarInfoRoot = 'CalendarInfoPage';
  calendarMembersRoot = 'CalendarMembersPage';
  calendarDoorsRoot = 'CalendarDoorsPage';


  constructor(public navCtrl: NavController, public editor: EditorProvider) {}


  ionViewWillEnter(){
    this.editor.refreshCalendar().subscribe(()=>{
    });
  }
  ngOnInit(){

  }

}
