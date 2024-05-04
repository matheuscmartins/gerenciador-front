import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uf } from '../models/uf';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UfService {

  constructor(
    private http: HttpClient
  ) { }
  
  findAll(): Observable<Uf[]> {
    return this.http.get<Uf[]>(`${API_CONFIG.baseUrl}/ufs`);
}
}
