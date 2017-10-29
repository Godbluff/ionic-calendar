import { Component } from '@angular/core';
import {ViewController} from "ionic-angular";

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

  constructor(public viewCtrl: ViewController) {
    console.log('Hello ModalsComponent Component');
    this.text = 'Hello World';
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
