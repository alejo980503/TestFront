import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { ProductComponent } from './product/product.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { WarehousingComponent } from './warehousing/warehousing.component';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';

const routes: Routes = [
  {path : 'customers', component:CustomerComponent},
  {path : '',redirectTo:'customers',pathMatch: 'full'},
  {path : 'products', component:ProductComponent},
  {path : 'shipment', component:ShipmentComponent},
  {path : 'warehousing', component:WarehousingComponent},
  {path : 'shipments-list', component:ShipmentListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
