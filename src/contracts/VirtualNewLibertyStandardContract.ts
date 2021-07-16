import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Contract from "./Contract";

class VirtualNewLibertyStandardContract extends Contract<any> {

    constructor() {
        super(
            Config.contracts.VirtualNewLibertyStandard,
            require("./VirtualNewLibertyStandardContractABI.json"),
            [
                "Sell",
                "RemoveSale",
                "Buy",
                "CancelSale",
            ],
        );
    }

    public async getSaleCount(): Promise<BigNumber> { return await this.contract.saleCount(); }

    public async getSale(saleId: BigNumberish): Promise<any> {
        return await this.contract.sales(saleId);
    }

    public async sell(amount: BigNumber, price: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        return await contract?.sell(amount, price);
    }

    public async buy(saleId: BigNumber, value: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        return await contract?.buy(saleId, { value });
    }

    public async cancelSale(saleId: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        return await contract?.cancelSale(saleId);
    }
}

export default new VirtualNewLibertyStandardContract();
