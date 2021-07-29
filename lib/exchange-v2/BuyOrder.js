"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const VirtualBitcoinContract_1 = __importDefault(require("../contracts/VirtualBitcoinContract"));
const VNLSBuyOrderBookContract_1 = __importDefault(require("../contracts/VNLSBuyOrderBookContract"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
class BuyOrder extends skynode_1.DomNode {
    constructor(orderId, buyer, amount, price) {
        super("tr.buy-order");
        this.orderId = orderId;
        this.append(skynode_1.el("td.buyer", buyer), this.amountPanel = skynode_1.el("td", `${ethers_1.utils.formatUnits(amount, VirtualBitcoinContract_1.default.decimals)} VBTC`), skynode_1.el("td", "="), this.pricePanel = skynode_1.el("td", `${ethers_1.utils.formatEther(price)} ETH`), skynode_1.el("td", skynode_1.el("a", "Sell", {
            click: async () => {
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const amount = prompt("How much amount to sell?");
                    if (amount !== null) {
                        const allowance = await VirtualBitcoinContract_1.default.allowance(owner, VNLSBuyOrderBookContract_1.default.address);
                        if (allowance !== undefined) {
                            const realAmount = ethers_1.utils.parseUnits(amount, VirtualBitcoinContract_1.default.decimals);
                            if (allowance.lt(realAmount) === true) {
                                alert("You need to approve VBTC for Virtual New Liberty Standard.");
                                await VirtualBitcoinContract_1.default.approve(VNLSBuyOrderBookContract_1.default.address, realAmount);
                                alert("When approving transaction is complete, please sell it again for the same amount.");
                            }
                            else {
                                await VNLSBuyOrderBookContract_1.default.sell(orderId, realAmount);
                            }
                        }
                    }
                }
            },
        })), skynode_1.el("td", skynode_1.el("a", "Cancel", {
            click: () => VNLSBuyOrderBookContract_1.default.cancel(orderId),
        })));
    }
    set amount(amount) {
        this.amountPanel.empty().appendText(`${ethers_1.utils.formatUnits(amount, VirtualBitcoinContract_1.default.decimals)} VBTC`);
    }
    set price(price) {
        this.pricePanel.empty().appendText(`${ethers_1.utils.formatEther(price)} ETH`);
    }
}
exports.default = BuyOrder;
//# sourceMappingURL=BuyOrder.js.map