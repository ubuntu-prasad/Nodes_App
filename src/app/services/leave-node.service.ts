import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TempDataService } from "../services/temp-data.service";
import { TokenProviderService } from "../services/token-provider.service";


@Injectable({
  providedIn: 'root'
})
export class LeaveNodeService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(
    private http: HttpClient,
    private tempData: TempDataService,
    private tokenProvider: TokenProviderService
  ) { }

  leave_node(){
    return new Promise(resolve => {
      let req_str = this.API_URL + '/node/leave?id_token=' + this.tokenProvider.id_token + '&node_name=' + this.tempData.activated_node;
      //alert(req_str);
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
