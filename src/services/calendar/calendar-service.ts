import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {LanguageService} from "../language/language-service";
import {ModalService} from "../modal/modal-service";

@Injectable()
export class CalendarService {
  calendarUrl: string = 'https://juleluka-api.herokuapp.com/calendar';
  userCalendar: any = {
    doorSequence: []
  };
  userToken: string = '';
  loaderVisible: string = 'none';
  wantNewCalendar: boolean = true;
  errorMessage: string = '';
  todayNumber: number = 0;

  constructor(private http: Http, public languageService: LanguageService, public modalService: ModalService) {
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
      .catch((err)=> {
        this.handleError(err);
      });
  }

  fetchCalendar(): Observable<any>{
    let retrievedToken = localStorage.getItem('CCParticipant');
    let parsedToken = JSON.parse(retrievedToken);
    this.userToken = parsedToken.token;
    let headers: any = new Headers({'Accept': 'application/json', 'X-Participant' : this.userToken});
    return this.http.get(this.calendarUrl, {headers: headers})
      .map((res)=>{
        this.userCalendar = res.json();
        console.log(this.userCalendar);
      })
      .catch((err)=>{
        this.handleError(err);
      });
  }

  openDoor(doorNumber: number): Observable<any> {
      let targetUrl = 'https://juleluka-api.herokuapp.com/calendar/doors/' + doorNumber + '/open';
      let headers = new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'X-Participant': this.userToken
      });
      return this.http.post(targetUrl, '', {headers: headers})
        .map((res: Response)=>{
          return res.json();

        })
        .catch((error) => {
          this.handleError(error);
          this.loaderVisible = 'none';
        });
  }

  private handleError(error): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }




}
