import { Component } from '@angular/core';
import { StreamingMedia, StreamingAudioOptions, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { observable } from 'rxjs';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  errorShow: String = "";
  url: string;
  stream: any;
  promise: any;
  isPlaying: Boolean;
  constructor(public streamingMedia: StreamingMedia, private localNotifications: LocalNotifications, private backgroundMode: BackgroundMode) {
    //this.url = "http://rv3.denialstream.com:8074/;stream.mp3";
    this.url = "http://rv3.denialstream.com:8074/;stream.mp3";
    this.stream = new Audio(this.url);
    this.isPlaying = false;



  }

  playMusicRadio() {
    //this.backgroundMode.enable();
    this.isPlaying = true;
    this.stream.load();
    console.info(this.stream);
    this.errorShow = "antes del play";

    try {
      this.stream;
      this.stream.volume = 1;
      this.promise = this.stream.play();
      this.promise.then(function (response) { }, function (err) {
        alert(err);
      });

    } catch (exception) {
      alert(exception);
    }


    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Escuchando FMSombras.',
      sticky: true,
      actions: [
        
        { id: 'apagar', title: 'Apagar' }
      ]
    });
    this.localNotifications.on("apagar").subscribe(() => {
      this.stopMusic();

    });
    
  }
  stopMusic() {
    this.stream.pause();
    this.localNotifications.update({ id: 1, sticky: false });
    this.isPlaying = false;
    this.localNotifications.clearAll();
    //this.backgroundMode.disable();
  }

  playMusic() {
    this.stream.load();
    try {
      this.stream.volume = 1;
      this.promise = this.stream.play();
      this.promise.then(function (response) { }, function (err) {
        alert(err);
      });

    } catch (exception) {
      alert(exception);
    }
  }

  openSocial(social:any){
    if(social===1){
      window.open("https://twitter.com/fansitecl/");
    }
    if(social===2){
      window.open("https://www.facebook.com/fansite.cl/");
    }
    if(social===3){
      window.open("https://www.instagram.com/fansitecl/");
    }
    if(social===4){
      window.open("https://www.youtube.com/user/Fansitetv");
    }
  }


}
