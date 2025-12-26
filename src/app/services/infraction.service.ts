import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Infraction } from '../models/infraction';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class InfractionService {

  constructor(
    private http: HttpClient
  ) { }
  
  findById(id: any): Observable<Infraction>{
    return this.http.get<Infraction>(`${API_CONFIG.baseUrl}/advertencias/${id}`);
  }
  findAll(): Observable<Infraction[]> {
    return this.http.get<Infraction[]>(`${API_CONFIG.baseUrl}/advertencias`);
  }
  create(infraction: Infraction): Observable<Infraction>{
    return this.http.post<Infraction>(`${API_CONFIG.baseUrl}/advertencias`, infraction)
  }
  update(infraction: Infraction): Observable<Infraction>{
    return this.http.put<Infraction>(`${API_CONFIG.baseUrl}/advertencias/${infraction.id}`, infraction);
  }
  delete(id: any): Observable<Infraction>{
    return this.http.delete<Infraction>(`${API_CONFIG.baseUrl}/advertencias/${id}`);
  }
  findByHeadQuarterId(id: any): Observable<Infraction[]>{
    return this.http.get<Infraction[]>(`${API_CONFIG.baseUrl}/advertencias/sede/${id}`);
  }
  findByMemberId(id: any): Observable<Infraction[]>{
    return this.http.get<Infraction[]>(`${API_CONFIG.baseUrl}/advertencias/membro/${id}`);
  }
}
