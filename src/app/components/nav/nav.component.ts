import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  constructor(
    private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.router.navigate(['home'])
  }
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }
  closeSidenavOnMobile(): void {
    if (this.isMobile() && this.drawer) {
      this.drawer.close();
    }
  }
}
