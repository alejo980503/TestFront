import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from './user';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  
  private baseURL = "http://localhost:8080/logistics/test/"
  tokenString:any

  constructor(private httpClient : HttpClient) {
     this.getToken()
   }


   addProduct(product: Product):Observable<Object>{
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenString
    });

    const options = {
      headers: headers
    };

    return this.httpClient.post(`${this.baseURL+'product/add'}`,product,options)
  }

   getToken(){
    
    this.httpClient.get<User>(`${this.baseURL+'user'}`).subscribe( user =>{
    this.tokenString='Bearer '+user.token
    })
    
}

}
