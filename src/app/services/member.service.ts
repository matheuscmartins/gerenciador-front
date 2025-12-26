import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }
  
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
  findByHeadQuarterId(id: any): Observable<Member[]>{
    return this.http.get<Member[]>(`${API_CONFIG.baseUrl}/membros/sede/${id}`);
  }
  /**
 * Upload de foto de perfil
 */
  uploadProfileImage(memberId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<any>(
      `${API_CONFIG.baseUrl}/membros/${memberId}/upload-foto`,
      formData
    );
  }

  /**
   * Retorna URL completa da imagem
   */
  getImageUrl(imagePath: string): string {
    // Se não tem caminho, retorna imagem padrão
    if (!imagePath || imagePath === '' || imagePath === null) {
      return 'assets/img/noProfile.png';
    }  
    // Se já é uma URL completa (http), retorna como está
    if (imagePath.startsWith('http')) {
      return imagePath;
    }  
    // Se é caminho relativo do servidor, concatena com baseUrl
    return `${API_CONFIG.baseUrl}/${imagePath}`;
  }
  updatePassword(memberId: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>(
      `${API_CONFIG.baseUrl}/membros/${memberId}/alterar-senha`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword
      }
    );
  }
}
