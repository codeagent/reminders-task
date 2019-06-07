import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReminderListComponent } from './reminder-list/reminder-list.component';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ReminderListResolver } from './reminder-list-resolver';
import { ReminderResolver } from './reminder-resolver';

const routes: Routes = [
  {
    path: 'reminders',
    component: ReminderListComponent,
    canActivate: [AuthGuard],
    resolve: { reminders: ReminderListResolver },
    data: { name: 'all', title: 'Reminders' }
  },
  {
    path: 'reminders/:id/edit',
    component: ReminderFormComponent,
    canActivate: [AuthGuard],
    resolve: { reminder: ReminderResolver },
    data: { name: 'edit', title: 'Edit' }
  },
  {
    path: 'reminders/create',
    component: ReminderFormComponent,
    canActivate: [AuthGuard],
    resolve: {},
    data: { name: 'create', title: 'Create' }
  },
  {
    path: 'reminders/active',
    component: ReminderListComponent,
    canActivate: [AuthGuard],
    resolve: { reminders: ReminderListResolver },
    data: { name: 'active', title: 'Active' }
  },
  {
    path: 'reminders/skipped',
    component: ReminderListComponent,
    canActivate: [AuthGuard],
    resolve: { reminders: ReminderListResolver },
    data: { name: 'skipped', title: 'Skipped' }
  },
  {
    path: 'reminders/search',
    component: SearchComponent,
    canActivate: [AuthGuard],
    resolve: { reminders: ReminderListResolver },
    data: { name: 'search', title: 'Search' }
  },
  // {
  //   path: 'reminders/today', 
  //   component: ReminderListComponent, 
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { name: 'login', title: 'Login' }
  },
  { path: '**', redirectTo: 'reminders' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
