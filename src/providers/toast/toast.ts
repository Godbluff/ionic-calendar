import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";

@Injectable()
export class ToastProvider {

  constructor(public toastCtrl: ToastController) {
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      cssClass: 'yellow'
    });
    toast.present();
  }
}
