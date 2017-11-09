import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {EditorProvider} from "../../providers/editor/editor";

/**
 * Generated class for the CalendarDoorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-doors',
  templateUrl: 'calendar-doors.html',
})
export class CalendarDoorsPage {

  @ViewChild(Slides)doorSlider: Slides;
  highlightStatus: Array<boolean> = [false];
  activeDoor: any = {
    quote: '',
  };
  isLoading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public editor: EditorProvider) {
  }

  ionViewDidLoad() {
    this.isLoading = false;
    console.log('ionViewDidLoad CalendarDoorsPage');
    console.log(this.editor.calendars.doors);
  }

  showDoorData(doorNr){
    console.log(doorNr);
    this.activeDoor = this.editor.calendars.doors[doorNr];
    console.log('active door quote', this.activeDoor);
    this.doorSlider.slideTo(doorNr,250);
  }

  currentDoor(){
    return this.doorSlider.getActiveIndex();
  }

}
