import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient
  ) { }
  
  findById(id: any): Observable<Member>{
    return this.http.get<Member>(`${API_CONFIG.baseUrl}/membros/${id}`);
  }
  findAll(): Observable<Member[]> {
    return this.http.get<Member[]>(`${API_CONFIG.baseUrl}/membros`);
  }
  create(member: Member): Observable<Member>{
    return this.http.post<Member>(`${API_CONFIG.baseUrl}/membros`, member)
  }
  update(member: Member): Observable<Member>{
    return this.http.put<Member>(`${API_CONFIG.baseUrl}/membros/${member.id}`, member);
  }
  delete(id: any): Observable<Member>{
    return this.http.delete<Member>(`${API_CONFIG.baseUrl}/membros/${id}`);
  }
}
