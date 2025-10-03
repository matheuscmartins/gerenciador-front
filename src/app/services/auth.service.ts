import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
   }

   private loadUserFromStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userSubject.next(user);      
    }
  }

 authenticate(creds: Credentials) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);  

     // Recupera os dados do usuário a partir do token e os armazena
     const user = this.decodeToken(authToken);
     if (user) {
       this.setUser(user);
     }
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);    
  }

  getUser(): any {    
    return this.userSubject.value;
  }
  getRoles(): string[] {
    const user = this.getUser();
    return user && user.roles ? user.roles : [];
  }
  
  hasAnyRole(roles: string[]): boolean {
    const user = this.getUser();
    if (!user || !user.roles) return false;
    return roles.some(role => user.roles.includes(role));
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);    
  }
  private decodeToken(token: string): any {
    try {
      return this.jwtService.decodeToken(token);
    } catch (error) {     
      return null;
    }
  }
}
