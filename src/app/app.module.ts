import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* manually added */
import { HttpClientModule } from '@angular/common/http'
import { Camera } from '@ionic-native/camera/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { IonicImageLoader } from 'ionic-image-loader';
import { FCM } from '@ionic-native/fcm/ngx';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { ImagePreloader } from './directives/img-preload.directive';
import { FilePath } from '@ionic-native/file-path/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@NgModule({
  declarations: [AppComponent, ImagePreloader],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicImageLoader.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    NativeStorage,
    ImagePicker,
    FileTransfer,
    File,
    LocalNotifications,
    WebView,
    FCM,
    WebIntent,
    FilePath,
    NativePageTransitions,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
