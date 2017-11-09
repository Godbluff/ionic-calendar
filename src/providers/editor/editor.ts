import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

/*
 Generated class for the EditorProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
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

  constructor(public http: Http) {
    console.log('Hello EditorProvider Provider', localStorage.getItem('CCUser'));
  }

  editCalendar(): Observable<void> {
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
        return this.getEditableCalendar().subscribe(()=>{
          console.log('finished it');
        });
      })
      .catch((error: Response)=> {
        return Observable.throw(error.json().error || 'Server error');
      });
  }

  checkToken(){
    let retrievedToken = localStorage.getItem('CCAdmin');
    let parsedToken = JSON.parse(retrievedToken);
    console.log('tokens identical? :', this.authToken === parsedToken.token);
  }


  getEditableCalendar(): Observable<void> {
    console.log('getting calendars...');
    let headers = new Headers({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get(this.calendarUrl, {headers: headers})
      .map((res: Response)=>{
        this.calendars = res.json();
        console.log('Calendar Loaded.', this.calendars);
        return true;
      })
      .catch((error: Response)=>{
        return Observable.throw(error.json().error || 'Server error');
      });
  }

  insertParticipant(participantName: string){
    let token = this.authToken;
    let body = {"name": participantName};
    let targetUrl = this.calendarUrl + '/participants';
    let headers = new Headers({'Content-type': 'application/json', 'Accept': 'application/json', 'Authorization': this.authToken});
    this.http.post(targetUrl,body, {headers: headers})
      .toPromise()
      .then((Response: any) => {console.log(participantName + ' added.'); this.calendars.participants.push(Response.json());})
      .catch((error: any) => console.log(error));
  }


  deleteParticipant(userId: string){
    let token = localStorage.getItem('CCAdmin');
    let targetUrl = this.calendarUrl + '/participants/' + userId;
    let headers = new Headers({'Content-type': 'application/json', 'Accept': 'application/json', 'Authorization': this.authToken});
    this.http.delete(targetUrl, {headers: headers})
      .toPromise()
      .then((Response: any) => {console.log('Deleted Participant? ' + Response.ok)})
      .catch((error: any) => console.log(error));
  }

  refreshCalendar(): Observable<void>{
    let retrievedToken = localStorage.getItem('CCAdmin');
    this.authToken = JSON.parse(retrievedToken).token;
    return this.getEditableCalendar();
  }

}
