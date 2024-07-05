import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleDuty } from '../models/roleDuty';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RoleDutyService {

  constructor(
    private http: HttpClient
  ) { }
  
  findById(id: any): Observable<RoleDuty>{
    return this.http.get<RoleDuty>(`${API_CONFIG.baseUrl}/cargos/${id}`);
  }
  findAll(): Observable<RoleDuty[]> {
    return this.http.get<RoleDuty[]>(`${API_CONFIG.baseUrl}/cargos`);
  }
  create(roleDuty: RoleDuty): Observable<RoleDuty>{
    return this.http.post<RoleDuty>(`${API_CONFIG.baseUrl}/cargos`, roleDuty)
  }
  update(roleDuty: RoleDuty): Observable<RoleDuty>{
    return this.http.put<RoleDuty>(`${API_CONFIG.baseUrl}/cargos/${roleDuty.id}`, roleDuty);
  }
  delete(id: any): Observable<RoleDuty>{
    return this.http.delete<RoleDuty>(`${API_CONFIG.baseUrl}/cargos/${id}`);
  }
}
