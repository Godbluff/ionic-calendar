import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {MyApp} from "./app.component";
import {LoginPage} from "../pages/login/login";
import {CalendarService} from "../services/calendar/calendar-service";
import {LanguageService} from "../services/language/language-service";
import {HttpModule} from "@angular/http";
import {ModalService} from "../services/modal/modal-service";
import {ModalsComponent} from "../components/modals/modals";
import { EditorProvider } from '../providers/editor/editor';
import { ToastProvider } from '../providers/toast/toast';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ModalsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ModalsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CalendarService,
    LanguageService,
    ModalService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EditorProvider,
    ToastProvider
  ]
})
export class AppModule {}
