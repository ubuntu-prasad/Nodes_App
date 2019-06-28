import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TokenVerifyService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(public http: HttpClient) { }

  verify_token(id_token: string, refresh_token: string){

    return new Promise(resolve => {
      let req_str = this.API_URL + '/user/tokenVerify?id_token=' + id_token + '&refresh_token=' + refresh_token;

      this.http.get(req_str).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

}
