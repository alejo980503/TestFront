import { Component } from '@angular/core';
import { Customer } from '../customer';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  customer= new Customer();

  constructor(private customerService: CustomerService, private router: Router){

  }


  onSubmit(){ 
    localStorage.setItem('customer',JSON.stringify(this.customer.id))
    this.saveCustomer()
  
  }

  saveCustomer(){
    this.customerService.addCustomer(this.customer).subscribe(c =>{
      console.log(c)
    },error => console.log(error));
    this.router.navigate(['/products'])
  }

}
