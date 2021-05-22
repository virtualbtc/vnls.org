import { BigNumber } from "@ethersproject/bignumber";
import Config from "../Config";
import SmartContract from "./SmartContract";

export interface PizzaStruct {
    owner: string;
    power: BigNumber;
    minedBlock: BigNumber;
    accSubsidy: BigNumber;
}

class VirtualNewLibertyStandard extends SmartContract {

    constructor() {
        super(
            Config.VNLS_ADDRESS,
            require("./VirtualNewLibertyStandardABI.json"),
        );
    }

    public async init() {
        await super.init([
            "Sell",
            "RemoveSale",
            "Buy",
            "CancelSale",
        ]);
    }

    public async getSaleCount(): Promise<BigNumber> { return await this.contract.pizzaCount(); }

    public async sell(amount: BigNumber, price: BigNumber): Promise<void> {
        return await this.web3Contract.sell(amount, price);
    }

    public async buy(saleId: BigNumber, value: BigNumber): Promise<void> {
        return await this.web3Contract.buy(saleId, { value });
    }

    public async cancelSale(saleId: BigNumber): Promise<void> {
        return await this.web3Contract.cancelSale(saleId);
    }
}

export default new VirtualNewLibertyStandard();
