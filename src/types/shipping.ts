import { Parcel } from "./parcel";
import { ShippingForm } from "./shippingForm";

export interface Shipping extends ShippingForm {
  parcels: Parcel[];
}
