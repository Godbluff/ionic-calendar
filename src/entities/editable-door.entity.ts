export class EditableDoor {
  imageUrl: string;
  number: number;
  openedBy: Array<string>;
  prize: string;
  quote: string;
  winners: Array<string>;

  constructor(){
    this.initialise();
  }

  initialise(){
    this.imageUrl = '';
    this.number = 0;
    this.openedBy = [];
    this.prize = '';
    this.quote = '';
    this.winners = [];

  }
}
