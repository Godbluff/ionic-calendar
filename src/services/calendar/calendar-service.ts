import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {LanguageService} from "../language/language-service";

@Injectable()
export class CalendarService {
  calendarUrl: string = 'https://juleluka-api.herokuapp.com/calendar';
  userCalendar: any = {};
  userToken: string = '';
  loaderVisible: string = 'none';
  wantNewCalendar: boolean = true;
  errorMessage: string = '';
  todayNumber: number = 0;

  constructor(private http: Http, public languageService: LanguageService,) {
  }

  getCalendar(companyName: string, participantName: string): Observable<any> {
    console.log('Fetching...');
    this.loaderVisible = 'block';
    let headers = new Headers({'Content-type': 'application/json'});
    let targetUrl: string = 'https://juleluka-api.herokuapp.com/calendar/participant/lookup?companyName=' + companyName + '&participantName=' + participantName;
    return this.http.get(targetUrl, {headers: headers})
      .map((res) => {
        console.log(res.json().token);
        this.userToken = res.json().token;
        localStorage.setItem('CCParticipant', JSON.stringify({token: this.userToken}));
        return this.userToken;
      })
      .catch((err)=>{
        this.handleError(err);
      });
  }

  fetchCalendar(): Observable<any>{
    let headers: any = new Headers({'Accept': 'application/json', 'X-Participant' : this.userToken});
    return this.http.get(this.calendarUrl, {headers: headers})
      .map((res)=>{
        console.log(res.json());
        return res.json();
      })
      .catch((err)=>{
        this.handleError(err);
      });
  }


  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
