import { Component, OnInit } from '@angular/core';
import { GetNodesService } from "../../services/get-nodes.service";

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TokenProviderService } from "../../services/token-provider.service";
import { TokenVerifyService } from "../../services/token-verify.service";
import { TempDataService } from "../../services/temp-data.service";
import { GetNotificationsService } from "../../services/get-notifications.service";
import { Router } from "@angular/router";
import { ActionSheetController, ToastController } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-nodes',
  templateUrl: 'nodes.page.html',
  styleUrls: ['nodes.page.scss'],
})


export class NodesPage {
  str = 'jjk';
  nodes_data: any;
  node_list = [];
  node_list2 = [];
  res_data: any;
  intro = '';
  display_mode: any;
  images_map: Map<string, string>;
  fake_list_display: any;
  noti_data: any;
  notifications_list: any;

  fileTransfer: FileTransferObject = this.transfer.create();


  constructor(public getNodes: GetNodesService, 
              public nativeStorage: NativeStorage,
              public tokenProvider: TokenProviderService,
              public tokenVerify: TokenVerifyService,
              public router: Router,
              private tempDataService: TempDataService,
              public actionSheetController: ActionSheetController,
              private getNotifications: GetNotificationsService,
              public fcm: FCM,
              private toastCtrl: ToastController,
              private webview: WebView,
              private transfer: FileTransfer,
              private file: File

              ){
                this.images_map = new Map<string, string>();

                if (this.node_list.length == 0){
                  // this.intro = 'You have not connected to any Node. You can find Nodes and join. ';
                  this.display_mode = 'inline';
                } else{
                  // this.intro = '';
                  this.display_mode = 'None';
                  //this.fake_list_display = 'None';
                }

                this.fcm.onNotification().subscribe(data => {
                  //alert(JSON.stringify(data));
                  if(data.wasTapped){
                    console.log("Received in background");
                  } else {
                    //alert('dfdfdf');
                    let jsonStr = JSON.stringify(data)
                    let jsonObj = JSON.parse(jsonStr);
                    let body = jsonObj['body'];
                    this.show_toast_message(body, "secondary");
                    //alert(JSON.stringify(data))
                    console.log("Received in foreground");
                  };
                });
  }

  check_file_availability(){

    for (let i=0; i<this.node_list.length; i++){
    
      let fileName_ = this.node_list[i].profile_pic + '.png';
      this.file.checkFile(this.file.externalDataDirectory, fileName_).then(
       (result) => {

        let img = this.webview.convertFileSrc(this.file.externalDataDirectory+'/'+fileName_)
        
        //this.images_array.push(img);
        this.images_map[this.node_list[i].profile_pic] = <string> img;

      },(error) =>{
       
        let post_url_ = 'https://firebasestorage.googleapis.com/v0/b/psn-server-16b36.appspot.com/o/'+ this.node_list[i].profile_pic+'?alt=media';
        this.fileTransfer.download(post_url_, this.file.externalDataDirectory + this.node_list[i].profile_pic +'.png').then(
          (entry) => {
          let img = this.webview.convertFileSrc(entry.toURL())
          this.images_map[this.node_list[i].profile_pic] = <string> img;

    
        }, (error) => {
          // handle error
          //alert(JSON.stringify(error));
        });
      });
    }
    this.node_list2 = this.node_list;

}







  get_connected_nodes_caller(event){
    this.fake_list_display = 'inline';
    this.getNodes.get_connected_nodes()
    .then(
      data => {
        //alert(JSON.stringify(data));
        this.nodes_data = data;
        console.log(this.nodes_data);
        this.node_list = this.nodes_data.connected_nodes;
        this.check_file_availability();
        console.log(this.node_list);
        event.target.complete();
        //alert(this.node_list);
        if (this.node_list.length == 0){
            // this.intro = 'You have not connected to any Node. You can find Nodes and join. ';
            this.display_mode = 'inline';
            //this.fake_list_display = 'None';
        } else{
          // this.intro = '';
          this.display_mode = 'None';
          //this.fake_list_display = 'None';
        }
        //this.fake_list_display = 'none';
    });
  }

  goto_posts(selected_node: any, node_description: any, profile_pic:any){
    //alert(selected_node);
    this.tempDataService.activated_node = selected_node;
    this.tempDataService.node_description = node_description;
    this.tempDataService.profile_pic = profile_pic;
    this.router.navigateByUrl('/posts');

  }

  doRefresh(event) {
    this. get_connected_nodes_caller(event);
  }

async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Nodes',
    buttons: [{
      text: 'New Node',
      role: 'destructive',
      icon: 'md-add',
      handler: () => {
        console.log('new node clicked');
        this.router.navigateByUrl('/addNode')
      }
    }, {
      text: 'Settings',
      icon: 'md-settings',
      handler: () => {
        console.log('settings clicked');
        this.router.navigateByUrl('/profile-info')
      }
    }]
  });
  await actionSheet.present();
}

ngOnInit() {
  this.get_connected_nodes_caller(event);
  this.get_notifications();

}

ionviewwillenter(){
}


get_notifications(){
  this.getNotifications.get_notifications()
  .then(
    (data) => {
      this.noti_data = data;
      this.notifications_list = this.noti_data.notifications;
    },
    (error) => {}
  );
}


dddd(){
  this.tempDataService.test_n_count = 34;
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



}
