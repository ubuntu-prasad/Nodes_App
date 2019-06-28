import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TokenProviderService } from "../services/token-provider.service";



@Injectable({
  providedIn: 'root'
})

export class CreateNodeService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(public http: HttpClient,
              public tokenProvider: TokenProviderService
              ) {         
  }


  create_new_node(node_name: string, node_description:string, node_profile: string){

    return new Promise(resolve => {
      
      let req_str = this.API_URL + '/node/create?id_token=' + this.tokenProvider.id_token + '&node_name=' + node_name + '&profile_pic=' + node_profile +'&node_description='+node_description;

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
