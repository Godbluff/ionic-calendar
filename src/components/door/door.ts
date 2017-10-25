import {Component, Input} from '@angular/core';
import {CalendarService} from "../../services/calendar/calendar-service";

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

  private loaderVisible: string = 'none';

  constructor(public calendarService: CalendarService) {
    console.log('Hello DoorComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    console.log(this.doorNumber);
  }

  ngOnChanges() {
    console.log('got new inputs', this.loaderVisible);

  }


}
