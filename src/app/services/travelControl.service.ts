import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TravelControl } from '../models/travelControl';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TravelControlService {

  constructor(
    private http: HttpClient
  ) { }
  
  findById(id: any): Observable<TravelControl>{
    return this.http.get<TravelControl>(`${API_CONFIG.baseUrl}/viagens/${id}`);
  }
  findAll(): Observable<TravelControl[]> {
    return this.http.get<TravelControl[]>(`${API_CONFIG.baseUrl}/viagens`);
  }
  create(travelControl: TravelControl): Observable<TravelControl>{
    return this.http.post<TravelControl>(`${API_CONFIG.baseUrl}/viagens`, travelControl)
  }
  update(travelControl: TravelControl): Observable<TravelControl>{
    return this.http.put<TravelControl>(`${API_CONFIG.baseUrl}/viagens/${travelControl.id}`, travelControl);
  }
  delete(id: any): Observable<TravelControl>{
    return this.http.delete<TravelControl>(`${API_CONFIG.baseUrl}/viagens/${id}`);
  }
  findbyHeadQuarterIdAndPeriod(id: any, startDate: string, endDate: string): Observable<TravelControl[]>{
    return this.http.get<TravelControl[]>(`${API_CONFIG.baseUrl}/viagens/sede/${id}/periodo/${startDate}/${endDate}`);
  }
}