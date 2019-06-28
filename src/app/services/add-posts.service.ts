import { Injectable } from '@angular/core';

import { TokenProviderService } from "../services/token-provider.service";
import { TempDataService } from "../services/temp-data.service";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AddPostsService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(private tokenProvider: TokenProviderService,
              private http: HttpClient,
              private tempData: TempDataService
              ) { }


  add_posts(url_list_str: string){
    return new Promise(resolve => {
      //alert('in add posts sevice');
      let req_str = this.API_URL + '/node/addPosts?id_token=' + this.tokenProvider.id_token + 
                    '&node_name=' + this.tempData.activated_node + 
                    '&post_urls=' + url_list_str;

      this.http.get(req_str).subscribe(
        data => {
          resolve(data);
        }, 
        err => {
          console.log(err);
      });
    });
  }

  submit_comment(pic_url: string, text: string){
    return new Promise(resolve => {
      let req_str = this.API_URL + '/node/post/addComment?id_token=' + this.tokenProvider.id_token + '&node_name=' + this.tempData.activated_node + '&pic_url=' + pic_url + '&comment=' + text;
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

