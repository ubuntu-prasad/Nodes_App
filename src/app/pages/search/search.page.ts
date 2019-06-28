import { Component, OnInit } from '@angular/core';
import { SearchNodeService } from "../../services/search-node.service";
import { JoinNodeService } from "../../services/join-node.service";
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {


  search_name = '';
  nodes_data: any;
  isValidRes: boolean;
  names_list: any;
  res_data: any;
  loading: any;

  constructor(private searchNode: SearchNodeService,
              private joinNode: JoinNodeService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController
    ) { 

  }

  search_node_caller(){
    if (this.search_name.length >= 3){
      this.searchNode.search_nodes(this.search_name)
      .then(
        data => {
          this.nodes_data = data;
          if (this.nodes_data.status == "SUCCESS"){
            this.names_list = this.nodes_data.matched_names
            this.isValidRes = true;
          }
      });
    }
  }
  

  join_node_caller(node_name: string){
    this.presentLoading();
    this.joinNode.join_node(node_name)
    .then(
      data => {
        this.res_data = data;
        if (this.res_data.status == "SUCCESS"){
          this.show_toast_message("Join request sent!", "success");
        } else if (this.res_data.reason == "ALREADY_JOINED"){
          this.show_toast_message("You have already connected to this node!", "warning");
        } else if (this.res_data.reason == "ALREADY_REQUESTED"){
          this.show_toast_message("Join request already sent!", "warning");
        } else if (this.res_data.error == "EMAIL_NOT_VERIFIED"){
          this.show_toast_message("Please verify your email address to join!", "warning");
        }
        this.loading.dismiss();
      }
    )
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

  /* show loading */
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Joining...',
    });
    return await this.loading.present();
  }



  ngOnInit() {
  }

}
