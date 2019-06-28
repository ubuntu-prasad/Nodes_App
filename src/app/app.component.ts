import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

/* manually added */
import { Router } from "@angular/router";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TokenProviderService } from "../app/services/token-provider.service";
import { TokenVerifyService } from "../app/services/token-verify.service";
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { ImageLoaderConfigService } from 'ionic-image-loader';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  res_data: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private nativeStorage: NativeStorage,
    private tokenProvider: TokenProviderService,
    private tokenVerify: TokenVerifyService,
    public imageLoaderConfig: ImageLoaderConfigService,
    private webIntent: WebIntent
    ){
      imageLoaderConfig.enableDebugMode();
      imageLoaderConfig.maxCacheSize = 100 * 1024 * 1024; // 2 MB
      imageLoaderConfig.maxCacheAge = 7 * 24 * 60 * 60 * 1000; // 1 minute
      this.imageLoaderConfig.setImageReturnType('base64');
    
      this.webIntent.registerBroadcastReceiver({
        filterActions: [
            'com.darryncampbell.cordova.plugin.broadcastIntent.ACTION',
            'com.darryncampbell.cordova.plugin.broadcastIntent.ACTION_2'
            ]
        })



    /* detect logged in or not */
    this.nativeStorage.getItem('tokens')
      .then(

        data => {
          let jsonStr = JSON.stringify(data);
          let jsonObj = JSON.parse(jsonStr);
          let id_token = jsonObj['id_token'];
          let refresh_token = jsonObj['refresh_token'];

          /* set id_token in token provider service */
          this.tokenProvider.id_token = id_token;
          //alert('app componenet:' + id_token);
          //alert('app component:' + refresh_token);
          this.tokenVerify.verify_token(id_token, refresh_token)
          .then(
            
            data => {
              this.res_data = data;
              console.log(this.res_data);
              let status = this.res_data.status;
              //alert('app component : ' + JSON.stringify(this.res_data));

              if (status == "RENEWED"){
                let _id_token = this.res_data.id_token;
    
                /* set id_token in token provider service */
                this.tokenProvider.id_token = _id_token;
    
                /* save id_token and refresh_token to native storage */
                this.nativeStorage.setItem('tokens', {id_token: _id_token, refresh_token: refresh_token})
                .then(
                  () => console.log('tokens stored!'),
                  () => console.log('Error storing tokens')
                );
              }
              this.router.navigateByUrl('/');
          }
          );
          
        },
        error => {
          this.router.navigateByUrl('/login');
        }
      );
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString('#011936');
      this.splashScreen.hide();
    });
  }
}
