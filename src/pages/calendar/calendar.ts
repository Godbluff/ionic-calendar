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

  ionViewWillEnter(){
    this.backgroundHeight = this.content.getContentDimensions().contentHeight;
    this.backgroundWidth = this.content.getContentDimensions().contentWidth;
    let doorCalc = this.calculateDoors();
    if(doorCalc.requiredHeight > this.backgroundHeight){
      console.log('not enough height. recalculate');
      let newRequiredHeight = ((this.backgroundHeight/100)*12.5)* 8;
      console.log('new required height: ', newRequiredHeight);
      this.doorInit.height = (this.backgroundHeight/100)*12.5;
      this.doorInit.width = (this.backgroundHeight/100)*12.5;
      this.doorInit.marginWidth = (this.backgroundWidth/100)*2;
      this.doorInit.marginHeight = (this.backgroundWidth/100)*2;
    }
    else{
      this.doorInit.height = doorCalc.singleDoor;
      this.doorInit.width = doorCalc.singleDoor;
      this.doorInit.marginWidth = doorCalc.widthMargins;
      this.doorInit.marginHeight = doorCalc.widthMargins;
    }
  }
  ionViewDidEnter(){

  }

  calculateDoors(){
    let calcs = {
      doorsWidth: 0,
      widthMargins: 0,
      singleDoor: 0,
      heightMargins: 0,
      requiredHeight: 0
    };
    console.log(this.content.getContentDimensions().contentHeight, 'x', this.content.getContentDimensions().contentWidth);
    calcs.doorsWidth = 4 * this.backgroundWidth;
    calcs.widthMargins = 5 * ((this.backgroundWidth/100)*2);
    calcs.singleDoor = (this.backgroundWidth/100)*20;
    calcs.heightMargins = 8 * ((this.backgroundWidth/100)*2) + 40;
    calcs.requiredHeight = 6 * calcs.singleDoor + calcs.heightMargins;
    console.log('Door width: ', calcs.singleDoor, 'calculated margins: ', (this.backgroundWidth/100)*2);
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
    if(this.isZoomed && door.doorIndex === this.zoomedDoor){
      this.renderer.setStyle(this.calendarZoom.nativeElement, 'transform', `scale(1,1)`);
      this.isZoomed = !this.isZoomed;
      this.zoomedDoor = door.doorIndex;
      return;
    }
    if(!this.isZoomed){
      this.renderer.setStyle(this.calendarZoom.nativeElement, 'transform', `scale(2,2) translateX(${-door.left + (0.39 * this.content.getContentDimensions().contentWidth)}px) translateY(${-door.top + 25}px)`);
      this.isZoomed = !this.isZoomed;
      this.zoomedDoor = door.doorIndex;
      return;
    }


  }

}
