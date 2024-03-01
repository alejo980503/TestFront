import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { Shipment } from './shipment';
import { WareHousing } from './ware-housing';
import { Transport } from './transport';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService{

  private baseURL = "http://localhost:8080/logistics/test/"
  tokenString:any

   constructor(private httpClient : HttpClient) {
    this.getToken()
   }


   addShipment(shipment: Shipment):Observable<Object>{
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenString
    });

    const options = {
      headers: headers
    };

    return this.httpClient.post(`${this.baseURL+'shipment/add'}`,shipment,options)
  }

  getWareHousings():Observable<WareHousing[]>{
    const headers = new HttpHeaders({
      'Authorization': this.tokenString
    });

    const options = {
      headers: headers
    };
    return this.httpClient.get<WareHousing[]>(`${this.baseURL+'warehousing/list'}`,options)
  }

  getShipments():Observable<Shipment[]>{
    const headers = new HttpHeaders({
      'Authorization': this.tokenString
    });

    const options = {
      headers: headers
    };
    return this.httpClient.get<Shipment[]>(`${this.baseURL+'shipment/list'}`,options)
  }

  getTransports():Observable<Transport[]>{
    const headers = new HttpHeaders({
      'Authorization': this.tokenString
    });

    const options = {
      headers: headers
    };
    return this.httpClient.get<Transport[]>(`${this.baseURL+'transport/list'}`,options)
  }

   getToken(){
    
    this.httpClient.get<User>(`${this.baseURL+'user'}`).subscribe( user =>{
    this.tokenString='Bearer '+user.token
    })
    
}
}
