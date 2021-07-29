"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const VNLSSellOrderBook_json_1 = __importDefault(require("./artifacts/contracts/VNLSSellOrderBook.sol/VNLSSellOrderBook.json"));
const Contract_1 = __importDefault(require("./Contract"));
class VNLSSellOrderBookContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.VNLSSellOrderBook, VNLSSellOrderBook_json_1.default.abi, [
            "Sell",
            "Remove",
            "Buy",
            "Cancel",
        ]);
    }
    async count() {
        return await this.contract.count();
    }
    async get(orderId) {
        return await this.contract.get(orderId);
    }
    async sell(amount, price) {
        const contract = await this.loadWalletContract();
        await (contract === null || contract === void 0 ? void 0 : contract.sell(amount, price));
    }
    async buy(orderId, value) {
        const contract = await this.loadWalletContract();
        await (contract === null || contract === void 0 ? void 0 : contract.buy(orderId, { value }));
    }
    async cancel(orderId) {
        const contract = await this.loadWalletContract();
        await (contract === null || contract === void 0 ? void 0 : contract.cancel(orderId));
    }
}
exports.default = new VNLSSellOrderBookContract();
//# sourceMappingURL=VNLSSellOrderBookContract.js.map