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
    return this.http.post<any>(`${API_CONFIG.baseUrl}/login`, creds);
  } 
  
  successfulLogin(loginResponse: any) {   
    const authToken = loginResponse.token?.replace('Bearer ', '').trim();
    if (authToken) {
      localStorage.setItem('token', authToken);
    }

    const user = {
      email: loginResponse.email,
      roles: loginResponse.roles || [],
      userId: loginResponse.userId || null,
      headQuarterId: loginResponse.headQuarterId || null
    };
    this.setUser(user);
  }

  /** 🔹 Retorna se o usuário está autenticado */
  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  /** 🔹 Salva usuário no storage e notifica observadores */
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  /** 🔹 Retorna usuário atual */
  getUser(): any {
    return this.userSubject.value;
  }

  /** 🔹 Retorna lista de roles */
  getRoles(): string[] {
    const user = this.getUser();
    return user && user.roles ? user.roles : [];
  }

  /** 🔹 Verifica se o usuário tem algum dos perfis */
  hasAnyRole(roles: string[]): boolean {
    const user = this.getUser();
    if (!user || !user.roles) return false;
    return roles.some(role => user.roles.includes(role));
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user && user.userId ? Number(user.userId) : null;
  }
  /** 🔹 Verifica se o usuário possui um perfil específico */
  hasRole(role: string): boolean {
    const user = this.getUser();
    return user && user.roles ? user.roles.includes(role) : false;
  }

  /** 🔹 Retorna o ID da sede (headQuarter) */
  getHeadQuarterId(): number | null {
    const user = this.getUser();
    return user && user.headQuarterId ? Number(user.headQuarterId) : null;
  }

  /** 🔹 Faz logout limpando dados locais */
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  /** 🔹 Decodifica o token (opcional, se quiser extrair claims do JWT) */
  private decodeToken(token: string): any {
    try {
      return this.jwtService.decodeToken(token);
    } catch (error) {
      return null;
    }
  }
}
