export class Prize {
  available: boolean;
  imageUrl: string;
  instructions: string;
  number: number;
  open: boolean;
  prize: string;
  quote: string;
  win: boolean;

  constructor(){
    this.initialise();
  }

  initialise(){
    this.available = false;
    this.imageUrl = '';
    this.instructions = 'No insctructions';
    this.number = 0;
    this.open = false;
    this.prize = 'no prize';
    this.quote = 'no quote';
    this.win = false;

  }
}
