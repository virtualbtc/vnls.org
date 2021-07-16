"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const Contract_1 = __importDefault(require("./Contract"));
class VirtualBitcoinContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.VirtualBitcoin, require("./VirtualBitcoinContractABI.json"), [
            "Transfer",
            "Approval",
            "BuyPizza",
            "ChangePizza",
            "SellPizza",
            "Mine",
        ]);
        this.name = "Virtual Bitcoin";
        this.symbol = "VBTC";
        this.decimals = 8;
    }
    async getName() { return await this.contract.name(); }
    async getTotalSupply() { return await this.contract.totalSupply(); }
    async balanceOf(owner) {
        return await this.contract.balanceOf(owner);
    }
    async transfer(to, amount) {
        const contract = await this.loadWalletContract();
        await (contract === null || contract === void 0 ? void 0 : contract.transfer(to, amount));
    }
    async transferFrom(from, to, amount) {
        const contract = await this.loadWalletContract();
        await (contract === null || contract === void 0 ? void 0 : contract.transferFrom(from, to, amount));
    }
    async approve(spender, amount) {
        const contract = await this.loadWalletContract();
        await (contract === null || contract === void 0 ? void 0 : contract.approve(spender, amount));
    }
    async allowance(owner, spender) {
        const contract = await this.loadWalletContract();
        return await (contract === null || contract === void 0 ? void 0 : contract.allowance(owner, spender));
    }
    async getPizzaPrice(power) { return await this.contract.pizzaPrice(power); }
    async getPizzaCount() { return await this.contract.pizzaCount(); }
    async getPizza(pizzaId) { return await this.contract.pizzas(pizzaId); }
    async buyPizza(power) {
        const contract = await this.loadWalletContract();
        return await (contract === null || contract === void 0 ? void 0 : contract.buyPizza(power));
    }
    async sellPizza(pizzaId) {
        const contract = await this.loadWalletContract();
        return await (contract === null || contract === void 0 ? void 0 : contract.sellPizza(pizzaId));
    }
    async changePizza(pizzaId, power) {
        const contract = await this.loadWalletContract();
        return await (contract === null || contract === void 0 ? void 0 : contract.changePizza(pizzaId, power));
    }
    async powerOf(pizzaId) { return await this.contract.powerOf(pizzaId); }
    async subsidyOf(pizzaId) { return await this.contract.subsidyOf(pizzaId); }
    async mine(pizzaId) {
        const contract = await this.loadWalletContract();
        return await (contract === null || contract === void 0 ? void 0 : contract.mine(pizzaId));
    }
}
exports.default = new VirtualBitcoinContract();
//# sourceMappingURL=VirtualBitcoinContract.js.map