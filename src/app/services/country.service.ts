import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }
  
  findAll(): Observable<Country[]> {
    return this.http.get<Country[]>(`${API_CONFIG.baseUrl}/paises`);
}
}
