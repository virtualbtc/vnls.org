"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const VirtualBitcoinContract_1 = __importDefault(require("./contracts/VirtualBitcoinContract"));
const VirtualNewLibertyStandardContract_1 = __importDefault(require("./contracts/VirtualNewLibertyStandardContract"));
class SaleV1 extends skynode_1.DomNode {
    constructor(saleId, seller, amount, price) {
        super("tr.sale-v1");
        this.saleId = saleId;
        this.append(skynode_1.el("td.seller", seller), skynode_1.el("td", `${ethers_1.utils.formatUnits(amount, VirtualBitcoinContract_1.default.decimals)} VBTC`), skynode_1.el("td", "="), skynode_1.el("td", `${ethers_1.utils.formatEther(price)} ETH`), skynode_1.el("td", skynode_1.el("a", "Buy", {
            click: async () => {
                await VirtualNewLibertyStandardContract_1.default.buy(saleId, price);
                alert("A buying transaction has started. Please wait for the transaction to complete.");
            },
        })), skynode_1.el("td", skynode_1.el("a", "Cancel", {
            click: () => VirtualNewLibertyStandardContract_1.default.cancelSale(saleId),
        })));
    }
}
exports.default = SaleV1;
//# sourceMappingURL=Sale.js.map