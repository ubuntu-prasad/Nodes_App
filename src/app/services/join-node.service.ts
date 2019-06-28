import { Injectable } from '@angular/core';
import { TokenProviderService } from "../services/token-provider.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JoinNodeService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(private tokenProvider: TokenProviderService,
              private http: HttpClient
              ) { }

  join_node(node_name: string){
    return new Promise(resolve => {
      let req_str = this.API_URL + '/node/join?id_token=' + this.tokenProvider.id_token + '&node_name=' + node_name;
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
