import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenProviderService {

  public id_token: string;
  
  constructor() {
  }
}
