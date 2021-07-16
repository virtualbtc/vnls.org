import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
export interface PizzaStruct {
    owner: string;
    power: BigNumber;
    minedBlock: BigNumber;
    accSubsidy: BigNumber;
}
declare class VirtualBitcoinContract extends Contract<any> {
    name: string;
    symbol: string;
    decimals: number;
    constructor();
    getName(): Promise<string>;
    getTotalSupply(): Promise<BigNumber>;
    balanceOf(owner: string): Promise<BigNumber>;
    transfer(to: string, amount: BigNumberish): Promise<void>;
    transferFrom(from: string, to: string, amount: BigNumberish): Promise<void>;
    approve(spender: string, amount: BigNumberish): Promise<void>;
    allowance(owner: string, spender: string): Promise<BigNumber>;
    getPizzaPrice(power: BigNumber): Promise<BigNumber>;
    getPizzaCount(): Promise<BigNumber>;
    getPizza(pizzaId: BigNumber): Promise<PizzaStruct>;
    buyPizza(power: BigNumber): Promise<BigNumber>;
    sellPizza(pizzaId: BigNumber): Promise<void>;
    changePizza(pizzaId: BigNumber, power: BigNumber): Promise<void>;
    powerOf(pizzaId: BigNumber): Promise<BigNumber>;
    subsidyOf(pizzaId: BigNumber): Promise<BigNumber>;
    mine(pizzaId: BigNumber): Promise<void>;
}
declare const _default: VirtualBitcoinContract;
export default _default;
//# sourceMappingURL=VirtualBitcoinContract.d.ts.map