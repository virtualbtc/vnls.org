import { DomNode } from "@hanul/skynode";
import { BigNumber } from "ethers";
export default class BuyOrder extends DomNode {
    orderId: BigNumber;
    private amountPanel;
    private pricePanel;
    constructor(orderId: BigNumber, buyer: string, amount: BigNumber, price: BigNumber);
    set amount(amount: BigNumber);
    set price(price: BigNumber);
}
//# sourceMappingURL=BuyOrder.d.ts.map