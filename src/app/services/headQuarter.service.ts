import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadQuarter } from '../models/headQuarter';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class HeadQuarterService {

  constructor(
    private http: HttpClient
  ) { }
  
  findById(id: any): Observable<HeadQuarter>{
    return this.http.get<HeadQuarter>(`${API_CONFIG.baseUrl}/sedes/${id}`);
  }
  findAll(): Observable<HeadQuarter[]> {
    return this.http.get<HeadQuarter[]>(`${API_CONFIG.baseUrl}/sedes`);
  }  
  create(headQuarter: HeadQuarter): Observable<HeadQuarter>{
    return this.http.post<HeadQuarter>(`${API_CONFIG.baseUrl}/sedes`, headQuarter)
  }
  update(headQuarter: HeadQuarter): Observable<HeadQuarter>{
    return this.http.put<HeadQuarter>(`${API_CONFIG.baseUrl}/sedes/${headQuarter.id}`, headQuarter);
  }
  delete(id: any): Observable<HeadQuarter>{
    return this.http.delete<HeadQuarter>(`${API_CONFIG.baseUrl}/sedes/${id}`);
  }
}
