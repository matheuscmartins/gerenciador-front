import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AdressListComponent } from './components/address/address-list/address-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AddressCreateComponent } from './components/address/address-create/address-create.component';
import { AddressUpdateComponent } from './components/address/address-update/address-update.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',  component: NavComponent, canActivate:[AuthGuard], children:[
      {path: 'home', component: HomeComponent},
      {path: 'address', component: AdressListComponent},
      {path: 'address/create', component: AddressCreateComponent},
      {path: 'address/update/:id', component: AddressUpdateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
