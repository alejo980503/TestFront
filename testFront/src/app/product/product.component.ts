import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products: Product[]=[]
  product: Product = new Product()

  constructor(private productService: ProductService){

  }

  addProductToList(product: Product){
    this.products.push(product)
  }

  addProduct(){
   
    this.productService.addProduct(this.product).subscribe(c =>{
      this.addProductToList(c as Product)
      localStorage.setItem('products',JSON.stringify(this.products))
    },error => console.log(error));
    this.product= {productType: '', nameProduct:'', referenceProduct:'', id: 0}
  }
}
