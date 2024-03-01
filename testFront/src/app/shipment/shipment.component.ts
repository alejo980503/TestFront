import { Component, OnInit } from '@angular/core';
import { Shipment } from '../shipment';
import { ShipmentService } from '../shipment.service';
import { DatePipe } from '@angular/common';
import { Product } from '../product';
import { Customer } from '../customer';
import { WareHousing } from '../ware-housing';
import { Transport } from '../transport';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.css',
  providers: [DatePipe],
})
export class ShipmentComponent  implements OnInit {

  shipment: Shipment= new Shipment()
  dateForm: Date= new Date()
  dateFormat: String | null;
  products: string | null;
  customer: Customer= new Customer();
  id: string | null;
  anyDate: String | null;
  globalPrice: number= 100000;
  idWare:number;
  wareHousings: WareHousing []
  wareHousing: WareHousing = new WareHousing()
  places: { id: number; text: string; }[]
  shippingTypes: { id: number; text: string; }[]
  shippingType: String
  idTransport: String
  transport: Transport = new Transport()
  transports: Transport[]

  constructor(private shipmentService: ShipmentService, private datePipe: DatePipe){

  }

  ngOnInit(): void {
    this.getData()
    this.shippingTypes=this.getShippingTypes()
    this.getTransports()
  }

  getData(){
    this.shipmentService.getWareHousings().subscribe(list=>{
      this.wareHousings=list
    })
  }

  getTransports(){
    this.shipmentService.getTransports().subscribe(list=>{
      this.transports=list
    })
  }

  sendTransport(event:Event){
   this.transport.transportRegistration= this.idTransport
   this.shipment.transport=this.transport
  }

  SendDataonChange(event:Event){
    this.dateFormat=this.datePipe.transform(this.dateForm, 'yyyy-MM-dd');
  }

  private generateAlphanumericString(longitud: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let rest = '';
    for (let i = 0; i < longitud; i++) {
      rest += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return rest;
  }

  sendWareHousing(event:Event){
    this.wareHousing.id=this.idWare
    this.shipment.warehousing=this.wareHousing
  }

  
  sendShppingTypes(event:Event){
    this.shipment.shippingType=this.shippingType
  }

  onSubmit(){
    this.shipment.admissionDate=this.dateFormat;
    this.products = localStorage.getItem('products')
    this.id = localStorage.getItem('customer')
    this.generateRandomDate()
    if (typeof  this.products === 'string' &&  this.products !== null && typeof this.id ==='string' && this.id!==null) {
      this.customer.id=JSON.parse(this.id) as number
      this.shipment.customer=this.customer
      this.shipment.products= JSON.parse( this.products) as Product[]
    }
    this.shipment.trackingNumber=this.generateAlphanumericString(10);
    if(this.anyDate !== null){
      this.shipment.deliveryDate= this.anyDate
    }
    this.randomNumber(100000,900000)
    if(this.shipment.shippingType === 'Maritimo' && this.shipment.products.length > 10){
      const aux=this.globalPrice
      const aux2=aux*0.05
      this.shipment.price=aux - aux2
      this.shipment.normalPrice=aux
      this.shipment.discount=aux2
    }else if(this.shipment.shippingType === 'Terrestre' && this.shipment.products.length > 10){
      const aux=this.globalPrice
      const aux2=aux*0.03
      this.shipment.price=aux - aux2
      this.shipment.normalPrice=aux
      this.shipment.discount=aux2
    }else{
      this.shipment.price=this.globalPrice
      this.shipment.normalPrice=this.globalPrice
      this.shipment.discount=0
    }
    console.log(JSON.stringify(this.shipment))
    this.shipmentService.addShipment(this.shipment).subscribe(c =>{
    },error => console.log(error));
  }

  generateRandomDate() {
    const start = new Date(2020, 0, 1); 
    const end = new Date(); 
    const randomDate = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    this.anyDate=this.datePipe.transform(new Date(randomDate), 'yyyy-MM-dd');
  }

  randomNumber(min: number, max: number) {
    this.globalPrice = Math.floor(Math.random() * (max - min)) + min;
  }

  getShippingTypes(){
    return [
      {
      id: 1, text:'Terrestre'
    },
    {
      id: 2, text:'Maritimo'
    }
  ]
  }

}
