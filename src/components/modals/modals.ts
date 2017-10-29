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

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    console.log('Hello ModalsComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.prizeData = this.navParams.get('data');
    console.log(this.prizeData);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
