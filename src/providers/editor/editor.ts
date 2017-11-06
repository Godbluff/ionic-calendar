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

  authToken: '';

  calendarAdmin: any = {
    username: '',
    password: ''
  };

  calendarCreate: any = {
    username: '',
    password: '',
    passwordVerify: '',
  };

  calendars: any = {};

  constructor(public http: Http) {
    console.log('Hello EditorProvider Provider');
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
        return this.getEditableCalendar().subscribe(()=>{
          console.log('finished it');
        });
      })
      .catch((error: Response)=> {
        return Observable.throw(error.json().error || 'Server error');
      });
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

}
