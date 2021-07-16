"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const Contract_1 = __importDefault(require("./Contract"));
class VirtualNewLibertyStandardContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.VirtualNewLibertyStandard, require("./VirtualNewLibertyStandardContractABI.json"), [
            "Sell",
            "RemoveSale",
            "Buy",
            "CancelSale",
        ]);
    }
    async getSaleCount() { return await this.contract.saleCount(); }
    async getSale(saleId) {
        return await this.contract.sales(saleId);
    }
    async sell(amount, price) {
        const contract = await this.loadWalletContract();
        return await (contract === null || contract === void 0 ? void 0 : contract.sell(amount, price));
    }
    async buy(saleId, value) {
        const contract = await this.loadWalletContract();
        return await (contract === null || contract === void 0 ? void 0 : contract.buy(saleId, { value }));
    }
    async cancelSale(saleId) {
        const contract = await this.loadWalletContract();
        return await (contract === null || contract === void 0 ? void 0 : contract.cancelSale(saleId));
    }
}
exports.default = new VirtualNewLibertyStandardContract();
//# sourceMappingURL=VirtualNewLibertyStandardContract.js.map