import {Component, Input, ViewChild, ElementRef} from '@angular/core';
import {CalendarService} from "../../services/calendar/calendar-service";
import {Headers, Http, Response} from "@angular/http";
import {ModalService} from "../../services/modal/modal-service";
import {Prize} from "../../entities/prize.entity";
import {Content} from "ionic-angular";

/**
 * Generated class for the DoorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'door',
  templateUrl: 'door.html'
})
export class DoorComponent {
  @Input('doorNumber') doorNumber: number;
  @Input() isOpened: boolean = false;
  @Input() containerId: string;

  @ViewChild('door') door: ElementRef;
  @ViewChild(Content) content: Content;

  text: string;
  doorQuote: string;
  prize: string;
  userWin: boolean = false;
  instructions: string = '';
  imageUrl: string = '';
  doorAvailable: boolean = false;

  cardClass: string = 'card';
  doorOpen: boolean = false;
  bgPos: string = '';
  screenHeight: number = null;
  screenWidth: number = null;

  doorData: Prize;

  private loaderVisible: string = 'none';

  constructor(public calendarService: CalendarService, public http: Http, private modalService: ModalService) {
    console.log('Hello DoorComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.adjustDoors();
    window.addEventListener('orientationchange', () => {
      this.adjustDoors();
    });
    window.addEventListener('resize', () => {
      this.adjustDoors();
    });
  }

  ngOnChanges() {
    console.log('got new inputs', this.loaderVisible);
  }

  adjustDoors(){
    var top = this.door.nativeElement.offsetTop;
    var left = this.door.nativeElement.offsetLeft;
    this.bgPos = `${-left-1}px ${-top-1}px`;
  }

  toggleDoor(): void {
      this.loaderVisible = 'block';
      this.calendarService.openDoor(this.doorNumber).subscribe((door: Prize)=>{
        this.doorData = door;
        door.quote ? this.doorQuote = door.quote : '';
        door.available ? this.doorAvailable = door.available : false;
        door.open ? this.isOpened = door.available : false;
        this.doorOpen = !this.doorOpen;
        this.loaderVisible = 'none';
      })
  }

  openModal(){
    this.modalService.presentDoorModal(this.doorData);
    console.log('doordata in door: ', this.doorData)
  }
}
