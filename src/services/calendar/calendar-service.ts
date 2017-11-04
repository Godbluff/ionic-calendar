import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {LanguageService} from "../language/language-service";
import {ModalService} from "../modal/modal-service";
import {Observable} from "rxjs";

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

  getCalendar(companyName: string, participantName: string): Observable<boolean> {
    console.log('fetching token...');
    this.loaderVisible = 'block';
    let headers = new Headers({'Content-type': 'application/json'});
    let targetUrl: string = this.calendarUrl + '/participant/lookup?companyName=' + companyName + '&participantName=' + participantName;
    return this.http.get(targetUrl, {headers: headers})
      .map((res: Response) => {
        console.log('token received');
        this.userToken = res.json().token;
        localStorage.setItem('CCParticipant', JSON.stringify({token: this.userToken}));
        return true;
      })
      .catch((error: Response) => {
        console.log('something went wrong on token fetch...');
        if (error instanceof Response) {
          error.status === 400 ? this.errorMessage = this.languageService.texts.errorMessage[this.languageService.setLanguage] : this.errorMessage = '';
          this.loaderVisible = 'none';
          return Observable.of(false);
        }
        return Observable.of(false);

      });


  }

  fetchCalendar(): Observable<void> {
    console.log('fetching calendar...');
    let retrievedToken = localStorage.getItem('CCParticipant');
    let parsedToken = JSON.parse(retrievedToken);
    this.userToken = parsedToken.token;
    let headers: any = new Headers({'Accept': 'application/json', 'X-Participant': this.userToken});
    return this.http.get(this.calendarUrl, {headers: headers})
      .map((res: Response)=> {
        console.log('calendar loaded.');
        this.userCalendar = res.json();
        console.log(this.userCalendar);
      })
      .catch((err: Response)=> {
        this.handleError(err);
      });
  }

  openDoor(doorNumber: number): Observable<any> {
    console.log('opening door...');
    let targetUrl = this.calendarUrl + '/doors/' + doorNumber + '/open';
    let headers = new Headers({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'X-Participant': this.userToken
    });
    return this.http.post(targetUrl, '', {headers: headers})
      .map((res: Response)=> {
        console.log('door loaded.');
        return res.json();

      })
      .catch((error: Response) => {
        this.handleError(error);
        this.loaderVisible = 'none';
      });
  }

  private handleError(error): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
