import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient
  ) { }
  
  findAll(): Observable<City[]> {
    return this.http.get<City[]>(`${API_CONFIG.baseUrl}/cidades`);
}
}
