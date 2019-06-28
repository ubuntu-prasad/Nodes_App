import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempDataService {

  activated_node: any;
  node_description: any;
  profile_pic:any;
  test_n_count = 23;

  constructor() { }
}
