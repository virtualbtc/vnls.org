import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
declare class VirtualNewLibertyStandardContract extends Contract<any> {
    constructor();
    getSaleCount(): Promise<BigNumber>;
    getSale(saleId: BigNumberish): Promise<any>;
    sell(amount: BigNumber, price: BigNumber): Promise<void>;
    buy(saleId: BigNumber, value: BigNumber): Promise<void>;
    cancelSale(saleId: BigNumber): Promise<void>;
}
declare const _default: VirtualNewLibertyStandardContract;
export default _default;
//# sourceMappingURL=VirtualNewLibertyStandardContract.d.ts.map