import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Contract from "./Contract";

export interface PizzaStruct {
    owner: string;
    power: BigNumber;
    minedBlock: BigNumber;
    accSubsidy: BigNumber;
}

class VirtualBitcoinContract extends Contract<any> {

    public name = "Virtual Bitcoin";
    public symbol = "VBTC";
    public decimals = 8;

    constructor() {
        super(
            Config.contracts.VirtualBitcoin,
            require("./VirtualBitcoinContractABI.json"),
            [
                "Transfer",
                "Approval",
                "BuyPizza",
                "ChangePizza",
                "SellPizza",
                "Mine",
            ],
        );
    }

    public async getName(): Promise<string> { return await this.contract.name(); }
    public async getTotalSupply(): Promise<BigNumber> { return await this.contract.totalSupply(); }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return await this.contract.balanceOf(owner);
    }

    public async transfer(to: string, amount: BigNumberish) {
        const contract = await this.loadWalletContract();
        await contract?.transfer(to, amount);
    }

    public async transferFrom(from: string, to: string, amount: BigNumberish) {
        const contract = await this.loadWalletContract();
        await contract?.transferFrom(from, to, amount);
    }

    public async approve(spender: string, amount: BigNumberish) {
        const contract = await this.loadWalletContract();
        await contract?.approve(spender, amount);
    }

    public async allowance(owner: string, spender: string): Promise<BigNumber> {
        const contract = await this.loadWalletContract();
        return await contract?.allowance(owner, spender);
    }

    public async getPizzaPrice(power: BigNumber): Promise<BigNumber> { return await this.contract.pizzaPrice(power); }
    public async getPizzaCount(): Promise<BigNumber> { return await this.contract.pizzaCount(); }
    public async getPizza(pizzaId: BigNumber): Promise<PizzaStruct> { return await this.contract.pizzas(pizzaId); }

    public async buyPizza(power: BigNumber): Promise<BigNumber> {
        const contract = await this.loadWalletContract();
        return await contract?.buyPizza(power);
    }

    public async sellPizza(pizzaId: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        return await contract?.sellPizza(pizzaId);
    }

    public async changePizza(pizzaId: BigNumber, power: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        return await contract?.changePizza(pizzaId, power);
    }

    public async powerOf(pizzaId: BigNumber): Promise<BigNumber> { return await this.contract.powerOf(pizzaId); }
    public async subsidyOf(pizzaId: BigNumber): Promise<BigNumber> { return await this.contract.subsidyOf(pizzaId); }

    public async mine(pizzaId: BigNumber): Promise<void> {
        const contract = await this.loadWalletContract();
        return await contract?.mine(pizzaId);
    }
}

export default new VirtualBitcoinContract();
