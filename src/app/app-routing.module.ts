import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AdressListComponent } from './components/address/address-list/address-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AddressCreateComponent } from './components/address/address-create/address-create.component';
import { AddressUpdateComponent } from './components/address/address-update/address-update.component';
import { HeadQuarterListComponent } from './components/headQuarter/headQuarter-list/headQuarter-list.component';
import { HeadQuarterUpdateComponent } from './components/headQuarter/headQuarter-update/headQuarter-update.component';
import { HeadQuarterCreateComponent } from './components/headQuarter/headQuarter-create/headQuarter-create.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { MemberCreateComponent } from './components/member/member-create/member-create.component';
import { MemberUpdateComponent } from './components/member/member-update/member-update.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',  component: NavComponent, canActivate:[AuthGuard], children:[
      {path: 'home', component: HomeComponent},
      {path: 'address', component: AdressListComponent},
      {path: 'address/create', component: AddressCreateComponent},
      {path: 'address/update/:id', component: AddressUpdateComponent},
      {path: 'headQuarter', component: HeadQuarterListComponent},
      {path: 'headQuarter/create', component: HeadQuarterCreateComponent},
      {path: 'headQuarter/update/:id', component: HeadQuarterUpdateComponent},
      {path: 'member', component: MemberListComponent},
      {path: 'member/create', component: MemberCreateComponent},     
      {path: 'member/update/:id', component: MemberUpdateComponent}     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
