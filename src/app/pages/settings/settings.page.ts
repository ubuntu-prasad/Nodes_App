import { Component, OnInit } from '@angular/core';

/* manually added */
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from "@angular/router";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public navtiveStorage: NativeStorage,
              public router: Router
              ) { }

  logout_user(){
    this.navtiveStorage.clear();
    this.router.navigateByUrl('/login');
  }



  ngOnInit() {
  }

}
