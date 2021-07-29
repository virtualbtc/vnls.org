import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import VNLSBuyOrderBookArtifact from "./artifacts/contracts/VNLSBuyOrderBook.sol/VNLSBuyOrderBook.json";
import Contract from "./Contract";
import { VNLSBuyOrderBook } from "./typechain";

export interface BuyOrderInfo {
    buyer: string;
    amount: BigNumber;
    price: BigNumber;
}

class VNLSBuyOrderBookContract extends Contract<VNLSBuyOrderBook> {

    constructor() {
        super(
            Config.contracts.VNLSBuyOrderBook,
            VNLSBuyOrderBookArtifact.abi,
            [
                "Buy",
                "Remove",
                "Sell",
                "Cancel",
            ],
        );
    }

    public async count(): Promise<BigNumber> {
        return await this.contract.count();
    }

    public async get(orderId: BigNumberish): Promise<BuyOrderInfo> {
        return await this.contract.get(orderId);
    }

    public async buy(amount: BigNumber, value: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        await contract?.buy(amount, { value });
    }

    public async sell(orderId: BigNumberish, amount: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        await contract?.sell(orderId, amount);
    }

    public async cancel(orderId: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        await contract?.cancel(orderId);
    }
}

export default new VNLSBuyOrderBookContract();
