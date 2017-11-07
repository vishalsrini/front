export class RawCashewSchema {
    year: Number;
    origin: String;
    quantity: Number;
    price: Number;
    currency: String = 'Rs';
    outTurn: Number;
    nutCount: Number;
    defective: Number;
    moisture: Number;
    others: Number;
    packing: String;
    loading: String;
    inspection: String;
    landingPort: String;
    shipment: String;
    fob: Boolean;
    cif: Boolean;
    paymentTerms: String;
    _id: number;
}