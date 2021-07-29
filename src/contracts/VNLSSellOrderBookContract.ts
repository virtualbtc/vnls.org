import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import VNLSSellOrderBookArtifact from "./artifacts/contracts/VNLSSellOrderBook.sol/VNLSSellOrderBook.json";
import Contract from "./Contract";
import { VNLSSellOrderBook } from "./typechain";

export interface SellOrderInfo {
    seller: string;
    amount: BigNumber;
    price: BigNumber;
}

class VNLSSellOrderBookContract extends Contract<VNLSSellOrderBook> {

    constructor() {
        super(
            Config.contracts.VNLSSellOrderBook,
            VNLSSellOrderBookArtifact.abi,
            [
                "Sell",
                "Remove",
                "Buy",
                "Cancel",
            ],
        );
    }

    public async count(): Promise<BigNumber> {
        return await this.contract.count();
    }

    public async get(orderId: BigNumberish): Promise<SellOrderInfo> {
        return await this.contract.get(orderId);
    }

    public async sell(amount: BigNumber, price: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        await contract?.sell(amount, price);
    }

    public async buy(orderId: BigNumber, value: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        await contract?.buy(orderId, { value });
    }

    public async cancel(orderId: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        await contract?.cancel(orderId);
    }
}

export default new VNLSSellOrderBookContract();
