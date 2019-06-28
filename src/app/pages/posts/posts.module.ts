import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostsPage } from './posts.page';

import { IonicImageLoader } from 'ionic-image-loader';

const routes: Routes = [
  {
    path: '',
    component: PostsPage
  }
];

@NgModule({
  imports: [
    IonicImageLoader,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostsPage]
})
export class PostsPageModule {}
