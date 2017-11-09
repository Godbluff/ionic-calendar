import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditorProvider} from "../../providers/editor/editor";

/**
 * Generated class for the CalendarMembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-members',
  templateUrl: 'calendar-members.html',
})
export class CalendarMembersPage {

  newParticipant: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public editor: EditorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarMembersPage');
    console.log(this.editor.calendars);
  }

  addParticipant(name: any) {
    if (this.editor.calendars.participants.filter((p: any) => p.name == this.newParticipant).length > 0) {
      this.newParticipant = 'Participant already added.';
      setTimeout(() => {this.newParticipant = ''},2000);
      console.log('Already in the participants list, dude!');
    }
    else if(this.newParticipant.length >= 2) { this.editor.insertParticipant(name);
      this.newParticipant = '';}
  }


  removeParticipant(loc: number){
    let user = this.editor.calendars.participants[loc].id;
    this.editor.calendars.participants.splice(loc,1);
    this.editor.deleteParticipant(user);
  }

}
