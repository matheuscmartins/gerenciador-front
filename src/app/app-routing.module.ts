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
import { InfractionListComponent } from './components/infraction/infraction-list/infraction-list.component';
import { InfractionCreateComponent } from './components/infraction/infraction-create/infraction-create.component';
import { InfractionUpdateComponent } from './components/infraction/infraction-update/infraction-update.component';
import { RoleDutyCreateComponent } from './components/roleDuty/roleDuty-create/roleDuty-create.component';
import { RoleDutyListComponent } from './components/roleDuty/roleDuty-list/roleDuty-list.component';
import { RoleDutyUpdateComponent } from './components/roleDuty/role-duty-update/role-duty-update.component';
import { MemberPatchListComponent } from './components/memberPatch/memberPatch-list/memberPatch-list.component';
import { MemberPatchCreateComponent } from './components/memberPatch/memberPatch-create/memberPatch-create.component';
import { MemberPatchUpdateComponent } from './components/memberPatch/memberPatch-update/memberPatch-update.component';
import { TravelControlListComponent } from './components/travelControl/travelControl-list/travelControl-list.component';
import { TravelControlCreateComponent } from './components/travelControl/travelControl-create/travelControl-create.component';

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
      {path: 'member/update/:id', component: MemberUpdateComponent},
      {path: 'infraction', component: InfractionListComponent},
      {path: 'infraction/create', component: InfractionCreateComponent},
      {path: 'infraction/update/:id', component: InfractionUpdateComponent},
      {path: 'roleDuty', component: RoleDutyListComponent},
      {path: 'roleDuty/create', component: RoleDutyCreateComponent},
      {path: 'roleDuty/update/:id', component: RoleDutyUpdateComponent},
      {path: 'memberPatch', component: MemberPatchListComponent},
      {path: 'memberPatch/create', component: MemberPatchCreateComponent},
      {path: 'memberPatch/update/:id', component: MemberPatchUpdateComponent},
      {path: 'travelControl', component: TravelControlListComponent},
      {path: 'travelControl/create', component: TravelControlCreateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
