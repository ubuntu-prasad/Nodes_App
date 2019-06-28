import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'nodes', loadChildren: './pages/nodes/nodes.module#NodesPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'addNode', loadChildren: './pages/add-node/add-node.module#AddNodePageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'posts', loadChildren: './pages/posts/posts.module#PostsPageModule' },
  { path: 'edit-node', loadChildren: './edit-node/edit-node.module#EditNodePageModule' },
  { path: 'profile-info', loadChildren: './pages/profile-info/profile-info.module#ProfileInfoPageModule' },
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule' },
  { path: 'connected-users', loadChildren: './pages/connected-users/connected-users.module#ConnectedUsersPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
