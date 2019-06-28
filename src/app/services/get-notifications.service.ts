import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { TokenProviderService } from "../services/token-provider.service";

@Injectable({
  providedIn: 'root'
})
export class GetNotificationsService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(
    private http: HttpClient,
    private tokenProvider: TokenProviderService
  ) { }


  get_notifications(){
    return new Promise(resolve => {
      let req_str = this.API_URL + '/user/getNotifications?id_token=' + this.tokenProvider.id_token;
      this.http.get(req_str).subscribe(
        data => {
          resolve(data);
        },
         
        err => {
          console.log(err);
      });
    });
  }


  accept_request(request_id:string, response:string){
    return new Promise(resolve => {
      let req_str = this.API_URL + '/node/acceptRequest?id_token=' + this.tokenProvider.id_token + '&request_id='+request_id + '&response='+response;
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
