import { Component, OnInit } from '@angular/core';
import { SignInService } from '../../services/sign-in.service' 
import { LogInService } from '../../services/log-in.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

/* manually imported */
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TokenProviderService } from "../../services/token-provider.service";
import { SetFcmTokenService } from "../../services/set-fcm-token.service";
import { FCM } from '@ionic-native/fcm/ngx';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  res_data: any;
  user_fcm_token: string;
  loading: any;

  constructor(public navCtrl: NavController, 
              public signIn: SignInService, 
              public logIn: LogInService,
              public toastCtrl: ToastController,
              public router: Router,
              public nativeStorage: NativeStorage,
              public tokenProvider: TokenProviderService,
              private fcm: FCM,
              private setFcmToken: SetFcmTokenService,
              private loadingCtrl: LoadingController) {
  }

  /* show toast message  */
  async show_toast_message(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      animated: true,
      color: color
    });
    toast.present();
  }

  /* Show loading */
  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message: message,
    });
    return await this.loading.present();
  }



  /* set user fcm token */
  set_user_fcm_caller(){
    this.fcm.subscribeToTopic('nodes');
    this.fcm.getToken().then(token => {
      //alert(JSON.stringify(token));
      console.log(token);
      this.user_fcm_token = token;

      this.setFcmToken.set_fcm_token(this.user_fcm_token)
      .then(data => {
       // alert(JSON.stringify(data));
      });
    });

    this.fcm.onNotification().subscribe(data => {
      //alert(JSON.stringify(data));
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        //alert(JSON.stringify(data))
        console.log("Received in foreground");
      };
    });
  }


  /* user sign in */
  sign_in_caller(){
      this.presentLoading("Creating...");
      this.signIn.sign_in(this.email, this.password)
      .then(data => {
        this.res_data = data;
        console.log(this.res_data);

        let status = this.res_data.status;
        if (status == "SUCCESS"){
          //this.show_toast_message('Registration Successfull!', 'success');

          /* save id_token and refresh_token to native storage */
          let id_token = this.res_data.id_token;
          let refresh_token = this.res_data.refresh_token;

          /* set id_token in token provider service */
          this.tokenProvider.id_token = id_token;          

          this.nativeStorage.setItem('tokens', {id_token: id_token, refresh_token: refresh_token})
          .then(
            () => console.log('tokens stored!'),
            () => console.log('Error storing tokens')
          );
          this.set_user_fcm_caller();
          this.loading.dismiss();
          this.router.navigateByUrl('/');
        } else {
          this.loading.dismiss();
          this.show_toast_message('Registration failed!', 'warning');
        }

      });

  }

  /* user log in */
  log_in_caller(){
    this.presentLoading("Logging...");
    this.logIn.log_in(this.email, this.password)
    .then(data => {
      this.res_data = data;
      console.log(this.res_data);
      let status = this.res_data.status;
      if (status == "SUCCESS"){
        //this.show_toast_message('Login Successfull!', 'success');

          /* save id_token and refresh_token to native storage */
          let id_token = this.res_data.id_token;
          let refresh_token = this.res_data.refresh_token;

          /* set id_token in token provider service */
          this.tokenProvider.id_token = id_token;    
          
          this.nativeStorage.setItem('tokens', {id_token: id_token, refresh_token: refresh_token})
          .then(
            () => console.log('tokens stored!'),
            () => console.log('Error storing tokens')
          );
          this.set_user_fcm_caller();
          this.loading.dismiss();
          this.router.navigateByUrl('/');
          //window.location.reload();
          
      } else {
        this.loading.dismiss();
        this.show_toast_message('Login failed!', 'warning');
      }

    });

  }


  ngOnInit() {
  }

}
