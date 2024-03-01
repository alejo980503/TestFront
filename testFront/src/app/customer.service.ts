import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Customer } from './customer';
import * as jwt from 'jsonwebtoken';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class CustomerService{

  private baseURL = "http://localhost:8080/logistics/test/"
  tokenString:any

  constructor(private httpClient : HttpClient) {
    this.getToken()
   }

  addCustomer(customer: Customer):Observable<Object>{
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenString
    });

    const options = {
      headers: headers,
      mode: 'no-cors'
    };

    
    return this.httpClient.post(`${this.baseURL+'customer/add'}`,customer,options)
  }

  getToken(){
    
    this.httpClient.get<User>(`${this.baseURL+'user'}`).subscribe( user =>{
    this.tokenString='Bearer '+user.token
    })
    
}
}
