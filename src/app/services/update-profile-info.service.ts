import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TokenProviderService } from "../services/token-provider.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileInfoService {

  constructor(private http: HttpClient,
              private tokenProvider: TokenProviderService          
    ) { }

  API_URL = 'https://psn-functions.appspot.com';

  update_profile(full_name: string, profile_pic: string){

    return new Promise(resolve => {
      let req_str = this.API_URL + '/user/profileInfo/update?id_token=' + this.tokenProvider.id_token + '&full_name=' + full_name +'&profile_pic=' + profile_pic;

      this.http.get(req_str).subscribe(
        data => {
          resolve(data);
        },
         
        err => {
          console.log(err);
      });
    });
  }

  get_profile_info(){

    return new Promise(resolve => {
      let req_str = this.API_URL + '/user/profileInfo/get?id_token=' + this.tokenProvider.id_token;

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
