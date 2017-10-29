import { Component } from '@angular/core';

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

  constructor() {
    console.log('Hello ModalsComponent Component');
    this.text = 'Hello World';
  }

}
