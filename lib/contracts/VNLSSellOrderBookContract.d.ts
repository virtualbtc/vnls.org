import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
import { VNLSSellOrderBook } from "./typechain";
export interface SellOrderInfo {
    seller: string;
    amount: BigNumber;
    price: BigNumber;
}
declare class VNLSSellOrderBookContract extends Contract<VNLSSellOrderBook> {
    constructor();
    count(): Promise<BigNumber>;
    get(orderId: BigNumberish): Promise<SellOrderInfo>;
    sell(amount: BigNumber, price: BigNumber): Promise<void>;
    buy(orderId: BigNumber, value: BigNumber): Promise<void>;
    cancel(orderId: BigNumber): Promise<void>;
}
declare const _default: VNLSSellOrderBookContract;
export default _default;
//# sourceMappingURL=VNLSSellOrderBookContract.d.ts.map