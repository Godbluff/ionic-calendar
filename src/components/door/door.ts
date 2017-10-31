import {Component, Input} from '@angular/core';
import {CalendarService} from "../../services/calendar/calendar-service";
import {Headers, Http, Response} from "@angular/http";
import {ModalService} from "../../services/modal/modal-service";
import {Prize} from "../../entities/prize.entity";

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

  text: string;
  @Input('doorNumber') doorNumber: number;
  @Input() isOpened: boolean = false;
  doorQuote: string;
  @Input() containerId: string;
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
    console.log(this.doorNumber);
  }

  ngOnChanges() {
    console.log('got new inputs', this.loaderVisible);

  }

  ngAfterViewInit(){
    setTimeout(() => {
      var el = document.querySelector("#" + this.containerId);
      var top = el.getBoundingClientRect().top;
      var left = el.getBoundingClientRect().left;
      this.bgPos = `${-left-1}px ${-top-1}px`;

      window.addEventListener('orientationchange', () => {
        var el = document.querySelector("#" + this.containerId);
        var top = el.getBoundingClientRect().top;
        var left = el.getBoundingClientRect().left;
        let scrollTop = window.scrollY;
        this.bgPos = `${-left-1}px ${-top -scrollTop -1}px`;
      });
      window.addEventListener('resize', () => {
        var el = document.querySelector("#" + this.containerId);
        var top = el.getBoundingClientRect().top;
        var left = el.getBoundingClientRect().left;
        let scrollTop = window.scrollY;
        let bigscreen =  screen.width;
        if(bigscreen > 1280) {
          this.bgPos = `${-left - 1}px ${-top -scrollTop - 1}px`;
        }
      });
    },0);
  }

  toggleDoor(): void {
      this.loaderVisible = 'block';
      this.calendarService.openDoor(this.doorNumber).subscribe((door)=>{
        this.doorData = door;
        door.prize ? this.prize = door.prize : '';
        door.instructions ? this.instructions = door.instructions : '';
        door.quote ? this.doorQuote = door.quote : '';
        door.win ? this.userWin = door.win : false;
        door.imageUrl ? this.imageUrl = door.imageUrl : this.imageUrl = 'http://www.stoltzimage.com/images/white-box-with-bow.jpg';
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
