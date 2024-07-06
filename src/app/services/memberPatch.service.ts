import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberPatch } from '../models/memberPatch';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class MemberPatchService {

  constructor(
    private http: HttpClient
  ) { }
  
  findById(id: any): Observable<MemberPatch>{
    return this.http.get<MemberPatch>(`${API_CONFIG.baseUrl}/membrospatchs/${id}`);
  }
  findAll(): Observable<MemberPatch[]> {
    return this.http.get<MemberPatch[]>(`${API_CONFIG.baseUrl}/membrospatchs`);
  }
  create(memberPatch: MemberPatch): Observable<MemberPatch>{
    return this.http.post<MemberPatch>(`${API_CONFIG.baseUrl}/membrospatchs`, memberPatch)
  }
  update(memberPatch: MemberPatch): Observable<MemberPatch>{
    return this.http.put<MemberPatch>(`${API_CONFIG.baseUrl}/membrospatchs/${memberPatch.id}`, memberPatch);
  }
  delete(id: any): Observable<MemberPatch>{
    return this.http.delete<MemberPatch>(`${API_CONFIG.baseUrl}/membrospatchs/${id}`);
  }
}
