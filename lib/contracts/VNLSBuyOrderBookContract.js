"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const VNLSBuyOrderBook_json_1 = __importDefault(require("./artifacts/contracts/VNLSBuyOrderBook.sol/VNLSBuyOrderBook.json"));
const Contract_1 = __importDefault(require("./Contract"));
class VNLSBuyOrderBookContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.VNLSBuyOrderBook, VNLSBuyOrderBook_json_1.default.abi, [
            "Buy",
            "Remove",
            "Sell",
            "Cancel",
        ]);
    }
    async count() {
        return await this.contract.count();
    }
    async get(orderId) {
        return await this.contract.get(orderId);
    }
    async buy(amount, value) {
        const contract = await this.loadWalletContract();
        await (contract === null || contract === void 0 ? void 0 : contract.buy(amount, { value }));
    }
    async sell(orderId, amount) {
        const contract = await this.loadWalletContract();
        await (contract === null || contract === void 0 ? void 0 : contract.sell(orderId, amount));
    }
    async cancel(orderId) {
        const contract = await this.loadWalletContract();
        await (contract === null || contract === void 0 ? void 0 : contract.cancel(orderId));
    }
}
exports.default = new VNLSBuyOrderBookContract();
//# sourceMappingURL=VNLSBuyOrderBookContract.js.map