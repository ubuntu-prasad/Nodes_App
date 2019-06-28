import { Injectable } from '@angular/core';
import { TokenProviderService } from "../services/token-provider.service";
import { TempDataService } from "../services/temp-data.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetPostsService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(
    private tokenProvider: TokenProviderService,
    private tempData: TempDataService,
    private http: HttpClient
  ) { }

  get_posts(){
    return new Promise(resolve => {
      let req_str = this.API_URL + '/node/getPosts?id_token=' + this.tokenProvider.id_token + '&node_name=' + this.tempData.activated_node;
      this.http.get(req_str).subscribe(
        data => {
          resolve(data);
        },
         
        err => {
          console.log(err);
      });
    });
  }

  get_connected_users(offset: string){
    return new Promise(resolve => {
      let req_str = this.API_URL + '/node/getUsers?id_token=' + this.tokenProvider.id_token + '&node_name=' + this.tempData.activated_node + '&offset=' + offset;
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
