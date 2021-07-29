"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const VirtualBitcoinContract_1 = __importDefault(require("../contracts/VirtualBitcoinContract"));
const VNLSSellOrderBookContract_1 = __importDefault(require("../contracts/VNLSSellOrderBookContract"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const SellOrder_1 = __importDefault(require("./SellOrder"));
class SellOrderList extends skynode_1.DomNode {
    constructor() {
        super(".sell-order-list");
        this.wrongNetworkHandler = () => {
            alert("Wrong Network");
        };
        this.sellHandler = (orderId, seller, amount, price) => {
            this.addOrder(orderId, seller, amount, price);
        };
        this.buyHandler = async (orderId) => {
            for (const order of this.tbody.children) {
                if (order instanceof SellOrder_1.default && order.orderId.eq(orderId) === true) {
                    const info = await VNLSSellOrderBookContract_1.default.get(orderId);
                    order.amount = info.amount;
                    order.price = info.price;
                }
            }
        };
        this.removeHandler = (orderId) => {
            for (const order of this.tbody.children) {
                if (order instanceof SellOrder_1.default && order.orderId.eq(orderId) === true) {
                    order.delete();
                }
            }
        };
        this.append(skynode_1.el("a#sell-button", "Sell Virtual Bitcoin", {
            click: async () => {
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const amount = prompt("Please enter VBTC amount.");
                    if (amount !== null) {
                        const allowance = await VirtualBitcoinContract_1.default.allowance(owner, VNLSSellOrderBookContract_1.default.address);
                        if (allowance !== undefined) {
                            const realAmount = ethers_1.utils.parseUnits(amount, VirtualBitcoinContract_1.default.decimals);
                            if (allowance.lt(realAmount) === true) {
                                alert("You need to approve VBTC for Virtual New Liberty Standard.");
                                await VirtualBitcoinContract_1.default.approve(VNLSSellOrderBookContract_1.default.address, realAmount);
                                alert("When approving transaction is complete, please sell it again for the same amount.");
                            }
                            else {
                                const price = prompt("Please enter price (ETH).");
                                if (price !== null) {
                                    await VNLSSellOrderBookContract_1.default.sell(realAmount, ethers_1.utils.parseEther(price));
                                }
                            }
                        }
                    }
                }
            },
        }), skynode_1.el("table", skynode_1.el("thead", skynode_1.el("tr", skynode_1.el("td.seller", "Seller"), skynode_1.el("td", "Amount"), skynode_1.el("td", ""), skynode_1.el("td", "Price"), skynode_1.el("td", { colspan: "2" }))), this.tbody = skynode_1.el("tbody")));
        this.loadOrders();
        VirtualBitcoinContract_1.default.on("wrongNetwork", this.wrongNetworkHandler);
        VNLSSellOrderBookContract_1.default.on("wrongNetwork", this.wrongNetworkHandler);
        VNLSSellOrderBookContract_1.default.on("Sell", this.sellHandler);
        VNLSSellOrderBookContract_1.default.on("Buy", this.buyHandler);
        VNLSSellOrderBookContract_1.default.on("Remove", this.removeHandler);
    }
    addOrder(orderId, seller, amount, price) {
        this.tbody.append(new SellOrder_1.default(orderId, seller, amount, price));
    }
    async loadOrders() {
        var _a, _b;
        (_a = this.loading) === null || _a === void 0 ? void 0 : _a.delete();
        this.loading = skynode_1.el(".loading", "Loading...").appendTo(this);
        const count = await VNLSSellOrderBookContract_1.default.count();
        this.tbody.empty();
        for (let orderId = 0; orderId < count.toNumber(); orderId += 1) {
            (async () => {
                const info = await VNLSSellOrderBookContract_1.default.get(orderId);
                if (info.price.eq(0) !== true) {
                    this.addOrder(ethers_1.BigNumber.from(orderId), info.seller, info.amount, info.price);
                }
            })();
        }
        (_b = this.loading) === null || _b === void 0 ? void 0 : _b.delete();
        this.loading = undefined;
    }
    delete() {
        VirtualBitcoinContract_1.default.off("wrongNetwork", this.wrongNetworkHandler);
        VNLSSellOrderBookContract_1.default.off("wrongNetwork", this.wrongNetworkHandler);
        VNLSSellOrderBookContract_1.default.off("Sell", this.sellHandler);
        VNLSSellOrderBookContract_1.default.off("Buy", this.buyHandler);
        VNLSSellOrderBookContract_1.default.off("Remove", this.removeHandler);
        super.delete();
    }
}
exports.default = SellOrderList;
//# sourceMappingURL=SellOrderList.js.map