import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LogInService {

  API_URL = 'https://psn-functions.appspot.com';

  constructor(public http: HttpClient) { 
    console.log(' ---  HttpClient initialized!  --- ');
  }


  log_in(email: string, password:string){

    return new Promise(resolve => {

      let req_str = this.API_URL + '/user/login';

      const payload = new HttpParams()
      .set('email', email)
      .set('password', password);
    
    this.http.post(req_str, payload).subscribe(
      (data) =>{
        resolve(data);
      },
      (err) => {
        console.error(err);
        
      }
    );
    });


  }
}
