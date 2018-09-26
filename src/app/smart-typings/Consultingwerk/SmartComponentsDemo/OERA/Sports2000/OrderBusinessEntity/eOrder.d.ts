declare namespace Consultingwerk {
	namespace SmartComponentsDemo {
		namespace OERA {
			namespace Sports2000 {
				namespace OrderBusinessEntity {
					interface eOrder {
						Ordernum?: number;
						CustNum?: number;
						OrderDate?: Date;
						ShipDate?: Date;
						PromiseDate?: Date;
						Carrier?: string;
						Instructions?: string;
						PO?: string;
						Terms?: string;
						SalesRep?: string;
						BillToID?: number;
						ShipToID?: number;
						OrderStatus?: string;
						WarehouseNum?: number;
						Creditcard?: string;
						CustName?: string;
						RepName?: string;
						OrderTotal?: number;
						eCustomer?: any[];
						eOrderLine?: any[];
						eSalesrep?: any[];
					}
				}
			}
		}
	}
}
