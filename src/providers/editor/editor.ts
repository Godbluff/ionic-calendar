import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {ToastProvider} from "../toast/toast";


@Injectable()
export class EditorProvider {

  private calendarUrl: string = 'https://juleluka-api.herokuapp.com/edit/calendar';

  calendarAdmin: any = {
    username: '',
    password: ''
  };

  calendarCreate: any = {
    username: '',
    password: '',
    passwordVerify: '',
  };

  authToken: string = '';
  calendars: any = {};
  errorMessage: string = '';

  constructor(public http: Http, private toast: ToastProvider) {
    console.log('Hello EditorProvider Provider', localStorage.getItem('CCUser'));
  }


  createNewCalendarAdmin(): Observable<boolean> {
    this.calendars = {};
    let body = {
      companyName: this.calendarCreate.username,
      adminPassword: this.calendarCreate.password
    };
    let header = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.calendarUrl, body, header).map((res: Response)=> {
      this.calendarAdmin.username = this.calendarCreate.username;
      this.calendarAdmin.password = this.calendarCreate.password;
      this.calendars = res.json();
      this.calendars.password = this.calendarCreate.password;
      return true;
    })
      .catch((err: Response)=> {
        if (err instanceof Response) {
          err.status === 409 ? this.errorMessage = 'Det finnes allerede en kalender med dette navnet.' : this.errorMessage = err.statusText;
          err.status === 422 ? this.errorMessage = 'Brukernavn eller passord er for kort.': '';
          this.toast.presentToast(this.errorMessage);
          return Observable.of(false);
        }
        console.log(err);
        this.toast.presentToast('Noe gikk feil...');
        return Observable.of(false);

      });
  }


  editCalendar(): Observable<boolean> {
    console.log('getting admin token...');
    let request: string = this.calendarUrl + '/auth?companyName=' + this.calendarAdmin.username + '&password=' + this.calendarAdmin.password;
    let headers = new Headers({
      'Content-type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(request, '', headers)
      .map((res: Response)=> {
        this.authToken = res.json().authToken;
        localStorage.setItem('CCAdmin', JSON.stringify({token: this.authToken}));
        this.checkToken();
        return this.getEditableCalendar().subscribe(()=> {
          console.log('finished it');
          return true;
        });
      })
      .catch((err: Response)=> {
        if (err instanceof Response) {
          err.status === 400 ? this.toast.presentToast('Brukernavn eller passord er feil. Sjekk staving.') : this.errorMessage = err.statusText;
          return Observable.of(false);
        }
        console.log(err);
        this.toast.presentToast('Noe gikk feil...');
        return Observable.of(false);
      });
  }


  checkToken() {
    let retrievedToken = localStorage.getItem('CCAdmin');
    let parsedToken = JSON.parse(retrievedToken);
    console.log('tokens identical? :', this.authToken === parsedToken.token);
  }


  getEditableCalendar(): Observable<void> {
    console.log('getting calendars...');
    return this.http.get(this.calendarUrl, {headers: this.setHeader()})
      .map((res: Response)=> {
        this.calendars = res.json();
        console.log('Calendar Loaded.', this.calendars);
        return true;
      })
      .catch((error: Response)=> {
        return this.handleError(error);
      });
  }


  insertParticipant(participantName: string): Observable<void> {
    console.log('adding participant: ', participantName);
    let body = {
      name: participantName
    };
    let headers =  new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.authToken
    });
    let targetUrl = this.calendarUrl + '/participants/';
    return this.http.post(targetUrl, body, {headers: headers})
      .map((res: Response)=> {
        console.log('added on remote');
        console.log(participantName + ' added.');
        this.calendars.participants.push(res.json());
      })
      .catch((err: Response)=> {
        if (err instanceof Response) {
          err.status === 400 ? this.toast.presentToast('Noe gikk feil...') : this.errorMessage = err.statusText;
          return Observable.of(false);
        }
        return this.handleError(err);
      });
  }


  deleteParticipant(userId: string): Observable<void> {
    console.log('deleting participant: ', userId);
    let targetUrl = this.calendarUrl + '/participants/' + userId;
    return this.http.delete(targetUrl, {headers: this.setHeader()})
      .map((res: Response)=> {
        console.log('Deleted Participant? ' + res.ok)
      })
      .catch((error: Response)=> {
        return this.handleError(error);
      });
  }


  refreshCalendar(): Observable<void> {
    let retrievedToken = localStorage.getItem('CCAdmin');
    this.authToken = JSON.parse(retrievedToken).token;
    return this.getEditableCalendar();
  }


  updateDoorNr(door: number): Observable<void> {
    console.log('updating door: ', door);
    let targetUrl = this.calendarUrl + '/doors/' + (door + 1);
    let body: any = this.calendars.doors[door];
    return this.http.put(targetUrl, body, {headers: this.setHeader()})
      .map((res: Response)=> {
        console.log('updated door successfully')
      })
      .catch((error: Response)=> {
        return this.handleError(error);
      });
  }


  setHeader(){
    return new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.authToken
    });
  }


  private handleError(error: Response): Observable<any> {
    console.error(error);
    this.toast.presentToast('Noe gikk feil...');
    return Observable.throw(error.json().error || 'Server error');
  }

}
