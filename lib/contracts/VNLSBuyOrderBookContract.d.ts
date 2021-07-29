import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
import { VNLSBuyOrderBook } from "./typechain";
export interface BuyOrderInfo {
    buyer: string;
    amount: BigNumber;
    price: BigNumber;
}
declare class VNLSBuyOrderBookContract extends Contract<VNLSBuyOrderBook> {
    constructor();
    count(): Promise<BigNumber>;
    get(orderId: BigNumberish): Promise<BuyOrderInfo>;
    buy(amount: BigNumber, value: BigNumber): Promise<void>;
    sell(orderId: BigNumberish, amount: BigNumber): Promise<void>;
    cancel(orderId: BigNumber): Promise<void>;
}
declare const _default: VNLSBuyOrderBookContract;
export default _default;
//# sourceMappingURL=VNLSBuyOrderBookContract.d.ts.map