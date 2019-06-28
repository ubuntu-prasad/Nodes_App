import { Component, OnInit, NgZone } from '@angular/core';
import { GetPostsService } from "../../services/get-posts.service";
import { GetNodesService } from "../../services/get-nodes.service";
import { TempDataService } from "../../services/temp-data.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-connected-users',
  templateUrl: './connected-users.page.html',
  styleUrls: ['./connected-users.page.scss'],
})
export class ConnectedUsersPage implements OnInit {

  offset = 0;
  connected_user_data = [];
  temp_arr = [];
  res_data: any;
  node_name: any;
  node_description: any;
  node_profile_pic:any;
  display_mode = 'block';
  loading:any;

  constructor(private getPosts: GetPostsService,
              private _zone: NgZone,
              private getNode: GetNodesService,
              private tempData: TempDataService,
              private loadingCtrl: LoadingController
    ) { 
    this.get_connected_users_caller();
    // alert(tempData.node_description);
    // alert(tempData.profile_pic);
    this.node_name = tempData.activated_node;
    this.node_description = tempData.node_description;
    this.node_profile_pic = tempData.profile_pic;
  }

  ngOnInit() {
  }

  get_connected_users_caller(){
    this.offset += 10;
    this.presentLoading("Retrieving data..")
    this.getPosts.get_connected_users(this.offset.toString())
    .then(
      (data) => {
        //alert(JSON.stringify(data));
        this.res_data = data;
        this.temp_arr = this.res_data.connected_users;
        this._zone.run(() => {

          this.connected_user_data = this.connected_user_data.concat(this.temp_arr);
          //alert(this.connected_user_data);

          if (this.temp_arr.length == 0) this.display_mode = 'None';
          this.loading.dismiss();
        });
        //alert(this.connected_user_data);
        //alert(JSON.stringify(this.connected_user_data));
        
      },
      (error) => {
        this.loading.dismiss();
      }
      
    );
  }


  /* Show loading */
  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message: message,
    });
    return await this.loading.present();
  }
}
