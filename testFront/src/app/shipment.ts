import { Customer } from "./customer";
import { Product } from "./product";
import { Transport } from "./transport";
import { WareHousing } from "./ware-housing";

export class Shipment {

    trackingNumber: String;
    products: Product[];
    shippingType: String;
    admissionDate: String | null;
    deliveryDate: String;
    deliveryWarehouse: String;
    transport: Transport;
    customer: Customer;
    price: number;
    normalPrice: number;
    discount: number;
    warehousing: WareHousing;
}
