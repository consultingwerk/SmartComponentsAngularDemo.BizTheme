declare namespace Consultingwerk {
	namespace SmartComponentsDemo {
		namespace OERA {
			namespace Sports2000 {
				namespace OrderBusinessEntity {
					interface eOrderLine {
						Ordernum?: number;
						Linenum?: number;
						Itemnum?: number;
						Price?: number;
						Qty?: number;
						Discount?: number;
						ExtendedPrice?: number;
						OrderLineStatus?: string;
						eItem?: any[];
					}
				}
			}
		}
	}
}
