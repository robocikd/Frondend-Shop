import { Payment } from "./payment";
import { Shipment } from "./shipment";

export interface InitData {
  shipments: Array<Shipment>;
  payments: Array<Payment>;
}
