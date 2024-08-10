import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credentials = {
    email: '',
    password:''
  }
  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(6));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logar(){
    this.service.authenticate(this.creds).subscribe(resposta =>{
      this.service.successfulLogin(resposta.headers.get('Authorization').substring(7));  
      this.router.navigate(['home']);    
    }, () =>{
      this.toast.error('Usuario e/ou senha inválidos!');
    })
  }

  validaCampos(): boolean{
    return this.email.valid && this.password.valid    
  }

}
