import {Component, Input, ViewChild, ElementRef, Output, EventEmitter, Renderer2} from '@angular/core';
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
  @Input() doorIndex: number;
  @Input() invisible: boolean;
  @Input() backgroundWidth: number;
  @Input() backgroundHeight: number;
  @Input() doorInit;

  @Output() userUpdated = new EventEmitter();

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
  backgroundSize: string;
  screenHeight: number = null;
  screenWidth: number = null;

  doorData: Prize;

  private loaderVisible: string = 'none';

  constructor(public calendarService: CalendarService, public http: Http, private modalService: ModalService, private renderer: Renderer2) {
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
    this.renderer.setStyle(this.door.nativeElement, 'height', `${this.doorInit.height}px`);
    this.renderer.setStyle(this.door.nativeElement, 'width', `${this.doorInit.width}px`);
    this.renderer.setStyle(this.door.nativeElement, 'margin', ` ${this.doorInit.marginHeight}px ${this.doorInit.marginWidth}px`);
    this.adjustDoors();
  }

  adjustDoors(){
    var top = this.door.nativeElement.offsetTop;
    var left = this.door.nativeElement.offsetLeft;
    this.bgPos = `${-left}px ${-top}px`;
    this.backgroundSize = `auto ${this.backgroundHeight}px`;
    this.renderer.setStyle(this.door.nativeElement, 'backgroundSize', `auto ${this.backgroundHeight}px`);

  }

  toggleDoor(): void {
    this.userUpdated.emit({
      top: this.door.nativeElement.offsetTop,
      left: this.door.nativeElement.offsetLeft,
      doorIndex: this.doorIndex
      });
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
