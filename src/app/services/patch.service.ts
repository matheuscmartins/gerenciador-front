import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Patch } from '../models/patch';

@Injectable({
  providedIn: 'root'
})
export class PatchService {

  constructor(
    private http: HttpClient
  ) { }
  
  findAll(): Observable<Patch[]> {
    return this.http.get<Patch[]>(`${API_CONFIG.baseUrl}/patchs`);
}

}
