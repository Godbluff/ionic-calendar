import {EditableDoor} from "./editable-door.entity";

export class EditableCalendar {
  companyName: string;
  doorSequence: Array<number>;
  doors: Array<EditableDoor[]>;
  doorsAlwaysAvailable: boolean;
  id: string;
  logoUrl: string;
  participants: Array<any>;
  winnersPerDay: number;

  constructor(){
    this.initialise();
  }

  initialise(){
    this.companyName = '';
    this.doorSequence = [];
    this.doors = [];
    this.doorsAlwaysAvailable = false;
    this.id = '';
    this.logoUrl = '';
    this.participants = [];
    this.winnersPerDay = 1;

  }
}
