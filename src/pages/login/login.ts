import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CalendarService} from "../../services/calendar/calendar-service";
import {LanguageService} from "../../services/language/language-service";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  companyName: string = '';
  userName: string = '';
  isLoading: boolean ;

  constructor(public navCtrl: NavController, public calendarService: CalendarService, public languageService: LanguageService) {

  }

  getCalendar(){
    this.isLoading = true;
    this.calendarService.getCalendar(this.companyName, this.userName).subscribe((res)=>{
      if (res){
        this.isLoading = false;
        this.navCtrl.push('MainPage', {token: res});
      }
      else{
        this.isLoading = false;
      }
    });
  }

  viewMain(){
    this.navCtrl.push('MainPage');
  }
}

// TODO: Clean up presentation on login and calendar screens. Images and stylings. Door sizes.
// TODO: Implement handling of saving images from URLs, camera and gallery in JSON-format for saving in database.
// TODO: Bypass Main page for single-calendar users
// TODO: Implement editor in app
// TODO: Set Up Firebase project for Calendar
