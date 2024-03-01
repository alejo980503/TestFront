import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { WareHousing } from './ware-housing';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class WarehousingService{

  private baseURL = "http://localhost:8080/logistics/test/"
  tokenString:any

  constructor(private httpClient: HttpClient) { 
    this.getToken()

  }
 

  addWarehousing(warehousing: WareHousing):Observable<Object>{
    
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenString
    });

    const options = {
      headers: headers,
      mode: 'no-cors'
    };

    
    return this.httpClient.post(`${this.baseURL+'warehousing/add'}`,warehousing,options)
  }

  getToken(){
    
    this.httpClient.get<User>(`${this.baseURL+'user'}`).subscribe( user =>{
    this.tokenString='Bearer '+user.token
    })
    
}
}
