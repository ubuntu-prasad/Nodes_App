import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LoadingController, ToastController, NumericValueAccessor } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { TempDataService } from "../../services/temp-data.service";
import { AddPostsService } from "../../services/add-posts.service";
import { GetPostsService } from "../../services/get-posts.service";
import { LeaveNodeService } from "../../services/leave-node.service";
import { ActionSheetController, AlertController } from "@ionic/angular";

import { ImageLoaderConfigService } from 'ionic-image-loader';
import { ImageLoaderService, IonicImageLoaderComponent } from 'ionic-image-loader';
import { Router } from "@angular/router";
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ClearAllNodeService } from "../../services/clear-all-node.service";
import { UpdateProfileInfoService } from "../../services/update-profile-info.service";

import { DomSanitizer } from '@angular/platform-browser';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  ngOnInit(){
  }

  ionViewWillLeave() {

    let options: NativeTransitionOptions = {
       direction: 'up',
       duration: 10,
       slowdownfactor: 0,
       slidePixels: 20,
       iosdelay: 0,
       androiddelay: 0,
       fixedPixelsTop: 0,
       fixedPixelsBottom: 60
      }
   
    this.nativePageTransitions.slide(options)
      .then()
      .catch();
   
   }
   


  counter = 0;
  selected_node: any;
  img_urls = [];
  posts_details: any;
  posts_details2: any;
  res_data: any;
  res_data2: any;
  loading: any;
  selectedImage: any;
  display_mode = 'None';
  fileTransfer: FileTransferObject = this.transfer.create();

  images_map: Map<string, string>;
  hideme = [];
  comments_list = [];
  profile_pic: string;



  constructor(
    private camera: Camera,
    private imagePicker: ImagePicker,
    private transfer: FileTransfer, 
    private file: File,
    public loadingController: LoadingController,
    private localNotifications: LocalNotifications,
    private tempDataService: TempDataService,
    private addPosts: AddPostsService,
    private getPosts: GetPostsService,
    private imageLoaderConfig: ImageLoaderConfigService,
    private imageLoader: ImageLoaderService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private leaveNode: LeaveNodeService,
    private router: Router,
    private clearAllNode: ClearAllNodeService,
    private DomSanitizer: DomSanitizer,
    private filePath: FilePath,
    private toastCtrl: ToastController,
    private webview: WebView,
    private updateProfile: UpdateProfileInfoService,
    private nativePageTransitions: NativePageTransitions

  ) { 
    imageLoaderConfig.enableDebugMode();
    imageLoaderConfig.maxCacheSize = 100 * 1024 * 1024; // 2 MB
    imageLoaderConfig.maxCacheAge = 7 * 24 * 60 * 60 * 1000; // 1 minute
    this.imageLoaderConfig.setImageReturnType('base64');
    this.selected_node = this.tempDataService.activated_node;
    this.get_posts_caller();
    this.get_profile_info_caller()

    this.images_map = new Map<string, string>();

  
    
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

  coming_soon(){
    this.show_toast_message("This feature will be available soon!", "success");
  }

  get_profile_info_caller(){
    this.updateProfile.get_profile_info()
    .then(
      (data) => {
        this.res_data2 = data;
        this.profile_pic = this.res_data2.profile_pic;
      },
      (error) => {}
    );
  }




  submit_comment_caller(pic_url: string, index: number){

    if (this.comments_list[index].length == 0) return ;  

    this.presentLoading("Submitting");
    //alert(text);
    //alert(this.comments_list[text]);
    this.addPosts.submit_comment(pic_url, this.comments_list[index]).then(
      (data) =>{
        this.loading.dismiss();
        this.comments_list[index] = '';
        this.get_posts_caller();

      },
      (error)=> {
        this.loading.dismiss();
        this.comments_list[index] = '';
      }
    );
  }


check_file_availability(){


    for (let i=0; i<this.posts_details.length; i++){
    
      let fileName_ = this.posts_details[i].pic_url + '.png';
      this.file.checkFile(this.file.externalDataDirectory, fileName_).then(
       (result) => {

        let img = this.webview.convertFileSrc(this.file.externalDataDirectory+'/'+fileName_)
        
        //this.images_array.push(img);
        this.images_map[this.posts_details[i].pic_url] = <string> img;

      },(error) =>{
       
        let post_url_ = 'https://firebasestorage.googleapis.com/v0/b/psn-server-16b36.appspot.com/o/'+ this.posts_details[i].pic_url+'?alt=media';
        this.fileTransfer.download(post_url_, this.file.externalDataDirectory + this.posts_details[i].pic_url +'.png').then(
          (entry) => {
          let img = this.webview.convertFileSrc(entry.toURL())
          this.images_map[this.posts_details[i].pic_url] = <string> img;

    
        }, (error) => {
          // handle error
          //alert(JSON.stringify(error));
        });
      });
    }
    this.posts_details2 = this.posts_details;

}

  /* get posts caller */
  get_posts_caller(){
    this.presentLoading('Loading...');
    this.getPosts.get_posts().then(
      (data) => {
        this.res_data = data;
        this.posts_details = this.res_data.posts;

        if (this.posts_details.length == 0){
          this.display_mode = 'inline';
          this.loading.dismiss();
        } else{
          this.display_mode = 'None';
          this.check_file_availability();
          this.loading.dismiss();
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
  

  /* Get a image using the camera */
  use_camera(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0
    }
    
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, 
      (err) => {
        console.log(err);
    }
    );  
  }
  

  /* Get images using image-picker */
  get_images(){
    const options: ImagePickerOptions = {
      quality:50
    }
    
    this.imagePicker.getPictures(options).then(
      (results) => {
        if (results.length != 0 && results != "OK"){
          let txt: string;
          if (results.length == 1){
            txt = ' Photo';
          }else{
            txt = ' Photos';
          }
          // show notification
          this.localNotifications.schedule({
            id: 1,
            text: 'Uploading ' + results.length + txt,
            smallIcon: 'res://stat_sys_upload'

          });
          // //this.selectedImage = results[0];
          // alert(results[0]);
          for (var i = 0; i < results.length; i++) {
            this.upload_image(results[i], results.length);
          }
        }
    }, (err) => { });
  }
  
  /* upload images to firebase storage */
  upload_image(file_path: string, len: any){
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {},
    }
    
   let random_str =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
   this.img_urls.push(random_str);
   let api_endpoint = 'https://firebasestorage.googleapis.com/v0/b/psn-server-16b36.appspot.com/o?name=' + random_str;
   fileTransfer.upload(file_path, api_endpoint, options)
    .then((data) => {
      // success
      if (this.counter == len-1){
        //alert(this.img_urls.join());
        this.addPosts.add_posts(this.img_urls.join())
        .then(
          data => {
            //alert(data);

        });
        this.localNotifications.cancel(1);
        this.get_posts_caller();
        this.counter = 0;
      } else {
        this.counter = this.counter + 1;
      }
    }, (err) => {
      // error
    }) 
  }


  /* actions sheet */
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '@'+ this.selected_node,
      buttons: [
        {
          text: 'Members',
          role: 'destructive',
          handler: () => {
            this.router.navigateByUrl('/connected-users');
          }
        },        
      {
        text: 'Delete all photos',
        role: 'destructive',
        handler: () => {
          this.presentAlertConfirm_for_clearAll();
          console.log('new node clicked');
        }
      },
      {
        text: 'Leave',
        role: 'destructive',
        handler: () => {
          this.presentAlertConfirm();
          console.log('new node clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  /* leave confirm alert */
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Leave',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Leave',
          handler: (data) => {
            this.leave_node_caller();
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  /* leave confirm alert */
  async presentAlertConfirm_for_clearAll() {
    const alert = await this.alertController.create({
      header: 'Delete all photos ',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: (data) => {
            this.delete_all_posts_caller();
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  /* delete all from posts caller */
  delete_all_posts_caller(){
    this.presentLoading('Deleting...');
    this.clearAllNode.clear_all_node()
    .then(
      (data) => {
        this.loading.dismiss();
        this.get_posts_caller();
      },
      (error) => {
        this.loading.dismiss();
      }
    );
  }







  /* leave node caller */
  leave_node_caller(){
    this.presentLoading('Leaving...')
    this.leaveNode.leave_node()
    .then(
      (data) => {
        //alert(JSON.stringify(data));
        this.loading.dismiss();
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.loading.dismiss();
      }
    );
  }
  

  /* loading panel */
  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: message,
    });
    return await this.loading.present();
  }



}
