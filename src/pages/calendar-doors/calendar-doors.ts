import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {EditorProvider} from "../../providers/editor/editor";
import {EditableDoor} from "../../entities/editable-door.entity";
import {Camera, CameraOptions} from '@ionic-native/camera';

/**
 * Generated class for the CalendarDoorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-doors',
  templateUrl: 'calendar-doors.html',
})
export class CalendarDoorsPage {

  @ViewChild(Slides) doorSlider: Slides;
  @ViewChild('quoteInput') quoteInput: ElementRef;
  @ViewChild('prizeInput') prizeInput: ElementRef;
  @ViewChild('instructionInput') instructionInput: ElementRef;


  highlightStatus: Array<boolean> = [false];
  activeDoor: EditableDoor = new EditableDoor();
  isLoading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public editor: EditorProvider, public camera: Camera) {
  }

  ionViewDidLoad() {
    this.isLoading = false;
    console.log('ionViewDidLoad CalendarDoorsPage');
    console.log(this.editor.calendars.doors);
  }

  showDoorData(doorNr) {
    console.log(doorNr);
    this.activeDoor = this.editor.calendars.doors[doorNr];
    console.log('active door quote', this.activeDoor);
    this.doorSlider.slideTo(doorNr, 250);
  }

  currentDoor() {
    return this.doorSlider.getActiveIndex() || 0;
  }

  blurFunction() {
    console.log('blurred');
  }

  getCameraImage() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 400,
      targetHeight: 400,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      cameraDirection: this.camera.Direction.FRONT
    }).then((imageData)=> {
      this.editor.calendars.doors[this.currentDoor()].imageUrl = "data:image/jpeg;base64," + imageData;
    });
  }

  getGalleryImage() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 400,
      targetHeight: 400,
      allowEdit: true,
      correctOrientation: true
    }).then((imageData)=> {
      this.editor.calendars.doors[this.currentDoor()].imageUrl = "data:image/jpeg;base64," + imageData;
    });
  }

}
