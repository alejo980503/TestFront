import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../shipment.service';
import { Shipment } from '../shipment';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrl: './shipment-list.component.css'
})
export class ShipmentListComponent implements OnInit{

  shipments: Shipment[]
  filtro: string = '';

  constructor(private shipmentService: ShipmentService){

  }
  ngOnInit(): void {
   this.getShipments()
  }

  private getShipments(){
    this.shipmentService.getShipments().subscribe(objects =>{
      this.shipments = objects;
    })
  };


  aplicarFiltro(): any[] {
    if (!this.filtro) {
      return this.shipments;
    }
    return this.shipments.filter(shipment => {
      return shipment.trackingNumber.toLowerCase().includes(this.filtro.toLowerCase());
    });
  }
}
