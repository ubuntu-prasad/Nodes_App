import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SearchNodeService {

  API_URL = 'https://psn-functions.appspot.com';
  constructor(private http: HttpClient) { }

  search_nodes(search_name: string){
    return new Promise(resolve => {
      let req_str = this.API_URL + '/node/search?search_name=' + search_name; 

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
