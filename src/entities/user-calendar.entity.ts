export class EditableCalendar {
  companyName: string;
  doorSequence: Array<number>;
  doors: Array<any>;
  id: string;

  constructor(){
    this.initialise();
  }

  initialise(){
    this.companyName = '';
    this.doorSequence = [];
    this.doors = [];
    this.id = '';

  }
}
