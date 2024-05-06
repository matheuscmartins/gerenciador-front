import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }
  
  findById(id: any): Observable<Address>{
    return this.http.get<Address>(`${API_CONFIG.baseUrl}/enderecos/${id}`);
  }
  findAll(): Observable<Address[]> {
    return this.http.get<Address[]>(`${API_CONFIG.baseUrl}/enderecos`);
  }
  create(address: Address): Observable<Address>{
    return this.http.post<Address>(`${API_CONFIG.baseUrl}/enderecos`, address)
  }
  update(address: Address): Observable<Address>{
    return this.http.put<Address>(`${API_CONFIG.baseUrl}/enderecos/${address.id}`, address);
  }
  delete(id: any): Observable<Address>{
    return this.http.delete<Address>(`${API_CONFIG.baseUrl}/enderecos/${id}`);
  }
}
