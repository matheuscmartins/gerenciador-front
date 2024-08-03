import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feed } from '../models/feed';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient
  ) { }
  
  findById(id: any): Observable<Feed>{
    return this.http.get<Feed>(`${API_CONFIG.baseUrl}/feed/${id}`);
  }
  findAll(): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${API_CONFIG.baseUrl}/feed`);
  }
  create(feed: Feed): Observable<Feed>{
    return this.http.post<Feed>(`${API_CONFIG.baseUrl}/feed`, feed)
  }
  update(feed: Feed): Observable<Feed>{
    return this.http.put<Feed>(`${API_CONFIG.baseUrl}/feed/${feed.id}`, feed);
  }
  delete(id: any): Observable<Feed>{
    return this.http.delete<Feed>(`${API_CONFIG.baseUrl}/feed/${id}`);
  }
  findbyHeadQuarterIdAndPeriod(id: any, startDate: string, endDate: string): Observable<Feed[]>{
    return this.http.get<Feed[]>(`${API_CONFIG.baseUrl}/feed/sede/${id}/periodo/${startDate}/${endDate}`);
  }
}