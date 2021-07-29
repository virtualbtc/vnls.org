import { DomNode } from "@hanul/skynode";
import { BigNumber } from "ethers";
export default class SellOrder extends DomNode {
    orderId: BigNumber;
    private amountPanel;
    private pricePanel;
    constructor(orderId: BigNumber, seller: string, amount: BigNumber, price: BigNumber);
    set amount(amount: BigNumber);
    set price(price: BigNumber);
}
//# sourceMappingURL=SellOrder.d.ts.map