import {Component, NgZone, ElementRef, ViewChild, Renderer2} from '@angular/core';
import {IonicPage, NavController, NavParams, Content} from 'ionic-angular';
import {CalendarService} from "../../services/calendar/calendar-service";
import {LanguageService} from "../../services/language/language-service";
import {Observable} from "rxjs";

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
  @ViewChild(Content) content: Content;

  isLoading: boolean = true;
  isZoomed: boolean = false;
  zoomedDoor: number = null;

  backgroundHeight: number = 0;
  backgroundWidth: number = 0;

  doorInit = {
    height: 0,
    width: 0,
    marginHeight: 0,
    marginWidth: 0,
  };

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

  ionViewWillEnter() {
    this.backgroundHeight = this.content.getContentDimensions().contentHeight;
    this.backgroundWidth = this.content.getContentDimensions().contentWidth;
    let doorCalc = this.calculateDoors();
    console.log('got doorCalc', doorCalc);
    if (doorCalc.requiredHeight > this.backgroundHeight) {
      console.log('not enough height. Recalculating');
      let doorSize = (this.backgroundHeight/100) * 12.5;
      let heightMargins = (this.backgroundHeight - (doorSize * 6)) - 40;
      let widthMargins = (this.backgroundWidth - (doorSize * 4));
      this.doorInit.height = Math.floor(doorSize);
      this.doorInit.width = Math.floor(doorSize);
      this.doorInit.marginWidth = Math.floor(widthMargins / 8);
      this.doorInit.marginHeight = Math.floor(heightMargins / 12);
    }
    else {
      this.doorInit.height = Math.floor(doorCalc.singleDoor);
      this.doorInit.width = Math.floor(doorCalc.singleDoor);
      this.doorInit.marginWidth = Math.floor(doorCalc.widthMargins / 8);
      this.doorInit.marginHeight = Math.floor(doorCalc.widthMargins / 12);
    }
    console.log('sending doorinit: ', this.doorInit);
  }

  ionViewDidEnter() {

  }

  calculateDoors() {
    this.backgroundHeight = this.content.getContentDimensions().contentHeight;
    this.backgroundWidth = this.content.getContentDimensions().contentWidth;

    let calcs = {
      singleDoor: 0,
      widthMargins: 0,
      heightMargins: 0,
      requiredHeight: 0
    };

    console.log(this.content.getContentDimensions().contentHeight, 'x', this.content.getContentDimensions().contentWidth);
    calcs.singleDoor = (this.backgroundWidth / 100) * 20;
    calcs.widthMargins = (this.backgroundWidth - (calcs.singleDoor * 4));
    calcs.heightMargins = (this.backgroundHeight - (calcs.singleDoor * 6));
    calcs.requiredHeight = 6 * calcs.singleDoor + calcs.heightMargins -40;

    console.log('Door width: ', calcs.singleDoor, 'calculated margins: ', calcs.heightMargins);
    console.log('requiredHeight: ', calcs.requiredHeight, 'ReportedHeight: ', this.backgroundHeight);

    return calcs
  }

  toWinnerList() {
    this.navCtrl.push('WinnersPage');
  }

  handleUserUpdated(door) {
    console.log('clicked : ', door, 'isZoomed? ', this.isZoomed);
    // this.isZoomed = !this.isZoomed;
    // this.zoomedDoor = door.doorIndex;
    if (this.isZoomed && door.doorIndex === this.zoomedDoor) {
      this.renderer.setStyle(this.calendarZoom.nativeElement, 'transform', `scale(1,1)`);
      this.isZoomed = !this.isZoomed;
      this.zoomedDoor = door.doorIndex;
      return;
    }
    if (!this.isZoomed) {
      this.renderer.setStyle(this.calendarZoom.nativeElement, 'transform', `scale(2,2) translateX(${-door.left + (0.39 * this.content.getContentDimensions().contentWidth)}px) translateY(${-door.top + 25}px)`);
      this.isZoomed = !this.isZoomed;
      this.zoomedDoor = door.doorIndex;
      return;
    }


  }

}
