import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ClientAddComponent} from './components/client-add/client-add.component';
import {ClientEditComponent} from './components/client-edit/client-edit.component';
import {ClientDetailsComponent} from './components/client-details/client-details.component';
import {ClientsComponent} from './components/clients/clients.component';
import {SettingsComponent} from './components/settings/settings.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {path: '',                component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'login',           component: LoginComponent},
    {path: 'register',        component: RegisterComponent},
    {path: 'client/add',      component: ClientAddComponent, canActivate: [AuthGuard]},
    {path: 'client/edit/:id', component: ClientEditComponent, canActivate: [AuthGuard]},
    {path: 'client/:id',      component: ClientDetailsComponent, canActivate: [AuthGuard]},
    {path: 'clients',         component: ClientsComponent, canActivate: [AuthGuard]},
    {path: 'settings',        component: SettingsComponent, canActivate: [AuthGuard]},
    {path: '**',              component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
      RouterModule.forRoot(routes)
      ],
  declarations: [],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
