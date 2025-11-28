import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
   this.authService.user$.subscribe(user => {
    this.user = user;    
  });   
  }
  
  logout(){
    this.router.navigate(['login'])
    this.authService.logout();
    this.toastr.info('Logout efetuado com sucesso!', 'Logout', {timeOut: 7000})
  }
}
