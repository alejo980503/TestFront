import { Component } from '@angular/core';
import { WareHousing } from '../ware-housing';
import { WarehousingService } from '../warehousing.service';

@Component({
  selector: 'app-warehousing',
  templateUrl: './warehousing.component.html',
  styleUrl: './warehousing.component.css'
})
export class WarehousingComponent {

  warehousing: WareHousing= new WareHousing()
  places: { id: number; text: string; }[]
  place: String;

  constructor(private warehousingService: WarehousingService){

  }
  ngOnInit(): void {

    this.places=this.getData();
   
  }


  addWarehousing(){

    this.warehousingService.addWarehousing(this.warehousing).subscribe(object =>{
      this.place=""
    })
    this.warehousing= {country: '', address:'', city:'', id: 0,warehousingType:''}

  }

  sendJob(event: Event){
    this.warehousing.warehousingType=this.place;
  }

  getData(){
    return [
      {
      id: 1, text:'Bodega'
    },
    {
      id: 2, text:'Puerto'
    }
  ]
  }

}
