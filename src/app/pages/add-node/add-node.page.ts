import { Component, OnInit } from '@angular/core';
import { CreateNodeService } from "../../services/create-node.service";
import { NodeAvailabilityService } from "../../services/node-availability.service";

import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from "@angular/router";
import { File } from "@ionic-native/file/ngx";
import { NgZone } from "@angular/core";

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.page.html',
  styleUrls: ['./add-node.page.scss'],
})
export class AddNodePage implements OnInit {

  node_name = '';
  nodes_data: any;
  check_data: any;
  check_msg = '';
  text_color = '';
  loading: any;
  node_pic_placeholder = '../../../assets/imgs/camera-placeholder.jpg';
  random_str = '';
  node_description = '';

  constructor(private createNode: CreateNodeService,
              private toastCtrl: ToastController,
              private nodeAvailability: NodeAvailabilityService,
              private loadingCtrl: LoadingController,
              private imagePicker: ImagePicker,
              private transfer: FileTransfer,
              private webview: WebView,
              private router: Router,
              private file: File,
              private _zone: NgZone
              ){
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


  check_availability_caller(){
    if (this.node_name.length >= 3){
      this.nodeAvailability.check_availability(this.node_name)
      .then(
        data => {
          //alert(JSON.stringify(data));
          this.nodes_data = data;
          console.log(this.nodes_data);
          if (this.nodes_data.status == "SUCCESS"){
            if (this.nodes_data.is_available == true){
              this.check_msg = 'Good choice!';
              this.text_color = 'color-green';
            } else {
              this.check_msg = this.node_name + ' is already taken.';
              this.text_color = 'color-red';
            }
          } else if (this.nodes_data.status == "FAILED"){
            if (this.nodes_data.reason == "INVALID_NODE_NAME"){
              this.check_msg = 'Only Aa-Zz 0-9 _ are valid!';
              this.text_color = 'color-red';
            }
            
          }
      });
   } else {
      this.check_msg = 'Only Aa-Zz 0-9 _ are valid and should more than 2 letters';
      this.text_color = 'color-black';
   }

  }

  async create_node_caller(){

    if (this.node_name.length == 0 || this.node_description.length == 0 || this.random_str.length == 0){
      this.show_toast_message('All details are required!', 'warning');
      return;
    }

    this.presentLoading('Creating...');
    this.createNode.create_new_node(this.node_name, this.node_description, this.random_str)
    .then(
      data => {
        //alert(JSON.stringify(data));
        this.check_data = data;
        console.log(this.check_data);

        if (this.check_data.status == "SUCCESS"){
          this.loading.dismiss();
          this.show_toast_message('Created a new node!', 'success');
          this.node_name = '';
          this.router.navigateByUrl('/');
        } else{
          this.loading.dismiss();
          this.show_toast_message('Failed to create a new node!', 'warning');
        }
    });
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message: message,
    });
    return await this.loading.present();
  }

  
  get_node_image(){
    
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      quality: 10
    }

    this.imagePicker.getPictures(options).then(
      (results) => {
        if (results.length != 0 && results != "OK"){
          //alert(results);
          let filename = results[0].substring(results[0].lastIndexOf('/')+1);
          let path =  results[0].substring(0,results[0].lastIndexOf('/')+1);
          this.file.readAsDataURL(path, filename).then(res=>{
            this._zone.run(() => {
              this.node_pic_placeholder = res;      
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
          //alert('sdfsdff');
          this.loading.dismiss();
      }, (err) => {
        // error
      });
    }






  ngOnInit() {
  }




}
