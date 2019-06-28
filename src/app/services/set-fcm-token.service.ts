import { Injectable } from '@angular/core';
import { TokenProviderService } from "../services/token-provider.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SetFcmTokenService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(
    private tokenProvider: TokenProviderService,
    private http: HttpClient
  ) { }

  set_fcm_token(fcm_token: string){
    //alert(fcm_token);
    return new Promise(resolve => {
      let req_str = this.API_URL + '/user/setFCMToken?fcm_token=' + fcm_token + '&id_token=' + this.tokenProvider.id_token;

      this.http.get(req_str).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
  });
}

}
