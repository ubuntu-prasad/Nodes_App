import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

/* manually added */
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TokenProviderService } from "../services/token-provider.service";
import { TempDataService } from "../services/temp-data.service";



@Injectable({
  providedIn: 'root'
})
export class GetNodesService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(
          public http: HttpClient, 
          public nativeStorage: NativeStorage,
          public tokenProvider: TokenProviderService,
          private tempData: TempDataService
          ) {
  }

  get_connected_nodes(){

    return new Promise(resolve => {
      
      //alert('get node services : ' + this.tokenProvider.id_token);
      let req_str = this.API_URL + '/user/connectedNodes?id_token=' + this.tokenProvider.id_token;

      this.http.get(req_str).subscribe(
        data => {
          resolve(data);
        }, 
        err => {
          console.log(err);
      });
    });

  }

  get_node_details(){

    return new Promise(resolve => {
      
      //alert('get node services : ' + this.tokenProvider.id_token);
      let req_str = this.API_URL + '/node/getDetails?id_token=' + this.tokenProvider.id_token + '&node_name='+ this.tempData.activated_node;

      this.http.get(req_str).subscribe(
        data => {
          resolve(data);
        }, 
        err => {
          console.log(err);
      });
    });

  }


}
