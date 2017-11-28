import {Component} from '@angular/core';
import {ViewController, NavController, NavParams} from "ionic-angular";

/**
 * Generated class for the ModalsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modals',
  templateUrl: 'modals.html'
})
export class ModalsComponent {

  text: string;
  prizeData: any = {};
  outcomeText: string = '';
  scaledPrize: boolean = false;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    console.log('Hello ModalsComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.prizeData = this.navParams.get('data');
    this.prizeData.win ? this.outcomeText =  'Gratulerer! Du har vunnet!' : this.outcomeText = 'Dessverre. Du vant ikke i dag';
    console.log(this.prizeData);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  togglePrizeScaling(){
    this.scaledPrize = !this.scaledPrize;
  }

}
