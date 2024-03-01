import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { WarehousingComponent } from './warehousing/warehousing.component';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';



@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ProductComponent,
    ShipmentComponent,
    WarehousingComponent,
    ShipmentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())

   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
