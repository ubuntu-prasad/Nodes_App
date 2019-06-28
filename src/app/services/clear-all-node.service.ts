import { Injectable } from '@angular/core';
import { TokenProviderService } from "../services/token-provider.service";
import { HttpClient } from "@angular/common/http";
import { TempDataService } from "../services/temp-data.service";


@Injectable({
  providedIn: 'root'
})
export class ClearAllNodeService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(private tokenProvider: TokenProviderService,
              private http: HttpClient,
              private tempData: TempDataService

  ) { }

  clear_all_node(){
    return new Promise(resolve => {
      
      let req_str = this.API_URL + '/node/deleteAllPosts?id_token=' + this.tokenProvider.id_token + '&node_name=' + this.tempData.activated_node;

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
