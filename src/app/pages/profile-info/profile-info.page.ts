import { Component, OnInit } from '@angular/core';
import { UpdateProfileInfoService } from "../../services/update-profile-info.service";
import { ImagePickerOptions, ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from "@angular/router";
import { File } from '@ionic-native/file/ngx';
import {NgZone} from '@angular/core';
import { AlertController } from "@ionic/angular";
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
})
export class ProfileInfoPage implements OnInit {
  ngOnInit(){
  }

  profile_pic_placeholder = '../../../assets/imgs/camera-placeholder3.png';
  full_name: string;
  loading: any;
  random_str: string;
  res_data: any;

  constructor(private updateProfile: UpdateProfileInfoService,
              private imagePicker: ImagePicker,
              private transfer: FileTransfer,
              private loadingCtrl: LoadingController,
              private navtiveStorage: NativeStorage,
              private router: Router,
              private file: File,
              private _zone: NgZone,
              private alertController: AlertController
              ) { 
    this.get_profile_info_caller();
  }

  update_profile_caller(){
    this.presentLoading('Updating profile...')
    this.updateProfile.update_profile(this.full_name, this.random_str)
    .then(
      (data) => {
        //alert(JSON.stringify(data))
        this.loading.dismiss();
      },
      (error) => {}
    );
  }


  get_profile_info_caller(){
    this.presentLoading('Retrieving info...')
    this.updateProfile.get_profile_info()
    .then(
      (data) => {
        this.res_data = data;
        this._zone.run(() => {
          this.full_name = this.res_data.full_name;
          this.profile_pic_placeholder = 'https://firebasestorage.googleapis.com/v0/b/psn-server-16b36.appspot.com/o/' + this.res_data.profile_pic + '?alt=media';      
        });
        this.random_str = this.res_data.profile_pic
        //(this.profile_pic_placeholder);
        this.loading.dismiss();
      },
      (error) => {}
    );
  }



  /* image picker */
  get_profile_image(){
    
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      quality: 10
    }

    this.imagePicker.getPictures(options).then(
      (results) => { 
        if (results.length != 0 && results != "OK"){

          /* set thumb */
          let filename = results[0].substring(results[0].lastIndexOf('/')+1);
          let path =  results[0].substring(0,results[0].lastIndexOf('/')+1);
          this.file.readAsDataURL(path, filename).then(res=>{
            this._zone.run(() => {
              this.profile_pic_placeholder = res;      
            });
          });

          this.upload_image(results[0]);
        }
    }, (err) => { });
  }


    /* upload images to firebase storage */
    upload_image(file_path: string){
      this.presentLoading('Setting picture...');
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'name.jpg',
        headers: {},
      }
      
     this.random_str =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
     let api_endpoint = 'https://firebasestorage.googleapis.com/v0/b/psn-server-16b36.appspot.com/o?name=' + this.random_str;
     fileTransfer.upload(file_path, api_endpoint, options)
     .then(
         (data) => {
          // this.profile_pic_placeholder = 'https://firebasestorage.googleapis.com/v0/b/psn-server-16b36.appspot.com/o/' + this.random_str + '?alt=media';
           //alert('sdfsdff');
           this.loading.dismiss();
      }, (err) => {
        // error
      });
    }

    /* show loading */
    async presentLoading(message: string) {
      this.loading = await this.loadingCtrl.create({
        message: message,
      });
      return await this.loading.present();
    }


    /* Logout user */
    logout_user(){
      this.navtiveStorage.clear();
      this.router.navigateByUrl('/login');
    }

    async app_info() {
      const alert = await this.alertController.create({
        // header: 'App Info',
        subHeader: 'App Info',
        message: 'Copyright © 2019 by Hexora Labs. All Rights Reserved.',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async feedback() {
      const alert = await this.alertController.create({
        // header: 'App Info',
        subHeader: 'Feedback',
        message: 'Nodes is still under development. If there are any bugs, please report to nodesnetworkfeedback@gmail.com',
        buttons: ['OK']
      });
  
      await alert.present();
    }



}
