import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

// Componentes do projeto
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AdressListComponent as AddressListComponent } from './components/address/address-list/address-list.component';
import { LoginComponent } from './components/login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { AddressCreateComponent } from './components/address/address-create/address-create.component';
import { NgxMaskModule } from 'ngx-mask';
import { AddressUpdateComponent } from './components/address/address-update/address-update.component';
import { AddressDeleteComponent } from './components/address/address-delete/address-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeadQuarterCreateComponent } from './components/headQuarter/headQuarter-create/headQuarter-create.component';
import { HeadQuarterListComponent } from './components/headQuarter/headQuarter-list/headQuarter-list.component';
import { HeadQuarterDeleteComponent } from './components/headQuarter/headQuarter-delete/headQuarter-delete.component';
import { HeadQuarterUpdateComponent } from './components/headQuarter/headQuarter-update/headQuarter-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    AddressListComponent,
    LoginComponent,
    AddressCreateComponent,
    AddressUpdateComponent,
    AddressDeleteComponent,
    HeadQuarterCreateComponent,
    HeadQuarterListComponent,
    HeadQuarterUpdateComponent,
    HeadQuarterDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot()
  ],
    providers: [AuthInterceptorProvider],
    bootstrap: [AppComponent],
    schemas: [] 
})
export class AppModule { }