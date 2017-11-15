import {Component, NgZone, ElementRef, ViewChild, Renderer2} from '@angular/core';
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

  @ViewChild('calendarZoom') calendarZoom: ElementRef;

  isLoading: boolean = true;
  isZoomed: boolean = false;
  zoomedDoor: number = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public calendarService: CalendarService,
              private languageService: LanguageService,
  private renderer: Renderer2) {

  }

  ionViewCanEnter() {
    this.calendarService.fetchCalendar().subscribe(()=> {
      this.isLoading = false;
      return this.calendarService.userCalendar.length > 0;
    });

  }

  toWinnerList() {
    this.navCtrl.push('WinnersPage');
  }

  handleUserUpdated(door) {
    console.log(door);
    // this.isZoomed = !this.isZoomed;
    // this.zoomedDoor = door.doorIndex;
    // if(this.isZoomed && door.doorIndex === this.zoomedDoor){
    //   this.renderer.setStyle(this.calendarZoom.nativeElement, 'transform', `scale(1,1)`);
    //   this.isZoomed = !this.isZoomed;
    //   this.zoomedDoor = door.doorIndex;
    //   return;
    // }
    // if(!this.isZoomed){
    //   this.renderer.setStyle(this.calendarZoom.nativeElement, 'transform', `scale(2,2) translateX(${-door.left + 100}px) translateY(${-door.top +25}px)`);
    //   this.isZoomed = !this.isZoomed;
    //   this.zoomedDoor = door.doorIndex;
    //   return;
    // }


  }

}
