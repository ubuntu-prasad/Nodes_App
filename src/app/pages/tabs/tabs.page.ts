import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TokenVerifyService } from "../../services/token-verify.service";

/* manually added */
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TokenProviderService } from "../../services/token-provider.service";
import { TempDataService } from "../../services/temp-data.service";


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  res_data: any;
  notifications_count = this.tempData.test_n_count;

  constructor(public router: Router, 
              public nativeStorage: NativeStorage, 
              public tokenVerify: TokenVerifyService,
              public tokenProvider: TokenProviderService,
              private tempData: TempDataService
              ){
            //this.notifications_count = tempData.user_notifications.length;
  }

}
