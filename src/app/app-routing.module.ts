import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AddressListComponent } from './components/address/address-list/address-list.component';
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
import { TravelControlUpdateComponent } from './components/travelControl/travelControl-update/travelControl-update.component';
import { FeedListComponent } from './components/feed/feed-list/feed-list.component';
import { FeedCreateComponent } from './components/feed/feed-create/feed-create.component';
import { FeedUpdateComponent } from './components/feed/feed-update/feed-update.component';
import { MyProfileListComponent } from './components/myProfile/myProfile-list/myProfile-list.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',  component: NavComponent, canActivate:[AuthGuard], children:[
      {path: 'home', component: HomeComponent},
      {path: 'address', component: AddressListComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'address/create', component: AddressCreateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'address/update/:id', component: AddressUpdateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'headQuarter', component: HeadQuarterListComponent},
      {path: 'headQuarter/create', component: HeadQuarterCreateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO'] }},
      {path: 'headQuarter/update/:id', component: HeadQuarterUpdateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO'] }},
      {path: 'member', component: MemberListComponent},
      {path: 'member/create', component: MemberCreateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},    
      {path: 'member/update/:id', component: MemberUpdateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'infraction', component: InfractionListComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'infraction/create', component: InfractionCreateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'infraction/update/:id', component: InfractionUpdateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'roleDuty', component: RoleDutyListComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'roleDuty/create', component: RoleDutyCreateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO'] }},
      {path: 'roleDuty/update/:id', component: RoleDutyUpdateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO'] }},
      {path: 'memberPatch', component: MemberPatchListComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'memberPatch/create', component: MemberPatchCreateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'memberPatch/update/:id', component: MemberPatchUpdateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR'] }},
      {path: 'travelControl', component: TravelControlListComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR', 'ROLE_EDITOR']}},
      {path: 'travelControl/create', component: TravelControlCreateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR', 'ROLE_EDITOR']}},
      {path: 'travelControl/update/:id', component: TravelControlUpdateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR', 'ROLE_EDITOR']}},
      {path: 'feed', component: FeedListComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR', 'ROLE_EDITOR'] }},
      {path: 'feed/create', component: FeedCreateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR', 'ROLE_EDITOR'] }},
      {path: 'feed/update/:id', component: FeedUpdateComponent, canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN', 'ROLE_COMANDO', 'ROLE_DIRETOR', 'ROLE_EDITOR'] }},
      {path: 'myProfile/:id', component: MyProfileListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
