import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EditorProvider} from "../../providers/editor/editor";
import {ToastProvider} from "../../providers/toast/toast";
import {Observable} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-calendar-members',
  templateUrl: 'calendar-members.html',
})
export class CalendarMembersPage {

  newParticipant: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public editor: EditorProvider,
              private toast: ToastProvider) {
  }

  ionViewDidLoad() {
  }

  addParticipant(inputString: any) {
    let names = inputString.split(/,|;/);
    let duplicateUsers = [];
    let addUserObservables: Array<Observable> = [];

    names.map((name)=> {
      let trimmedName = name.trim();
      console.log(trimmedName.length);
      if (this.editor.calendars.participants.filter((p: any) => p.name == trimmedName).length > 0) {
        duplicateUsers.push(trimmedName);
      }
      else if(trimmedName){
        addUserObservables.push(this.inserstParticipant(trimmedName));
      }
    });

    console.log('Duplicate users: ', duplicateUsers);
    console.log('Observables: ', addUserObservables);

    Observable.forkJoin(addUserObservables).subscribe(()=> {
      console.log('completed additions');
    });

    this.newParticipant = '';

    if (duplicateUsers.length > 0) {
      this.toast.presentToast('Allerede lagt til: ' + duplicateUsers);
    }
  }

  inserstParticipant(name): Observable<void> {
    return this.editor.insertParticipant(name).map(()=> {
    });
  }


  removeParticipant(loc: number) {
    let user = this.editor.calendars.participants[loc].id;
    this.editor.calendars.participants.splice(loc, 1);
    this.editor.deleteParticipant(user).subscribe(()=> {
      console.log('deleted user');
    });
  }

}
