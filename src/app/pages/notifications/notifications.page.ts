import { Component, OnInit } from '@angular/core';
import { TempDataService } from "../../services/temp-data.service";
import { GetNotificationsService } from "../../services/get-notifications.service";

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notification_details: any;
  noti_data: any;
  res_data:any;
  display_mode = 'inline';

  constructor(
    private tempData: TempDataService,
    private alertController: AlertController,
    private getNotifications: GetNotificationsService
  ) { 
  }

  acceptRequest(request_id: any){
    //alert(request_id);
    this.presentAlertConfirm(request_id);
  }

  async presentAlertConfirm(request_id: string) {
    const alert = await this.alertController.create({
      header: 'Accept join request?',
      buttons: [
        {
          text: 'Ignore',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('ignore');
            this.getNotifications.accept_request(request_id, "notAccept");

          }
        }, {
          text: 'Accept',
          handler: (data) => {
            console.log('accept');
            this.getNotifications.accept_request(request_id, "accept");
          }
        }
      ]
    });
    await alert.present();
  }

  doRefresh(event) {
    this.get_notifications(event)
  }


  get_notifications(event){
    this.getNotifications.get_notifications()
    .then(
      (data) => {
        this.noti_data = data;
        //alert(JSON.stringify(this.noti_data));
        this.notification_details = this.noti_data.notificaions;
        //alert(this.notification_details);
        event.target.complete();
        if(this.notification_details.length != 0){
          this.display_mode = 'None';
        } else{
          this.display_mode = 'inline';
        }
        //alert(this.tempData.user_notifications);
      },
      (error) => {}
    );
  }


  ngOnInit() {
    this.get_notifications(event);
  }

}
