import { Injectable} from "@angular/core";
import { ModalController } from "ionic-angular";
import { ModalsComponent } from "../../components/modals/modals";

@Injectable()
export class ModalService {

  constructor(public modal: ModalController){

  }

  presentDoorModal() {
    const profileModal = this.modal.create(ModalsComponent, { userId: 8675309 });
    profileModal.present();
  }

}
