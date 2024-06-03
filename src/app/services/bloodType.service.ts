import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { BloodType } from '../models/bloodType';

@Injectable({
  providedIn: 'root'
})
export class BloodTypeService {

  constructor(
    private http: HttpClient
  ) { }
  
  findAll(): Observable<BloodType[]> {
    return this.http.get<BloodType[]>(`${API_CONFIG.baseUrl}/tiposanguineos`);
}
}
