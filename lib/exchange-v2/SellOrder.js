"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const VirtualBitcoinContract_1 = __importDefault(require("../contracts/VirtualBitcoinContract"));
const VNLSSellOrderBookContract_1 = __importDefault(require("../contracts/VNLSSellOrderBookContract"));
class SellOrder extends skynode_1.DomNode {
    constructor(orderId, seller, amount, price) {
        super("tr.sell-order");
        this.orderId = orderId;
        this.append(skynode_1.el("td.seller", seller), this.amountPanel = skynode_1.el("td", `${ethers_1.utils.formatUnits(amount, VirtualBitcoinContract_1.default.decimals)} VBTC`), skynode_1.el("td", "="), this.pricePanel = skynode_1.el("td", `${ethers_1.utils.formatEther(price)} ETH`), skynode_1.el("td", skynode_1.el("a", "Buy", {
            click: async () => {
                const amountToBuy = prompt("How much amount to buy?");
                if (amountToBuy !== null) {
                    console.log(ethers_1.utils.formatEther(price.mul(ethers_1.utils.parseUnits(amountToBuy, VirtualBitcoinContract_1.default.decimals)).div(amount)));
                    await VNLSSellOrderBookContract_1.default.buy(orderId, price.mul(ethers_1.utils.parseUnits(amountToBuy, VirtualBitcoinContract_1.default.decimals)).div(amount));
                    alert("A buying transaction has started. Please wait for the transaction to complete.");
                }
            },
        })), skynode_1.el("td", skynode_1.el("a", "Cancel", {
            click: () => VNLSSellOrderBookContract_1.default.cancel(orderId),
        })));
    }
    set amount(amount) {
        this.amountPanel.empty().appendText(`${ethers_1.utils.formatUnits(amount, VirtualBitcoinContract_1.default.decimals)} VBTC`);
    }
    set price(price) {
        this.pricePanel.empty().appendText(`${ethers_1.utils.formatEther(price)} ETH`);
    }
}
exports.default = SellOrder;
//# sourceMappingURL=SellOrder.js.map