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
const BuyOrder_1 = __importDefault(require("./BuyOrder"));
class BuyOrderList extends skynode_1.DomNode {
    constructor() {
        super(".buy-order-list");
        this.wrongNetworkHandler = () => {
            alert("Wrong Network");
        };
        this.buyHandler = (orderId, buyer, amount, price) => {
            this.addOrder(orderId, buyer, amount, price);
        };
        this.sellHandler = async (orderId) => {
            for (const order of this.tbody.children) {
                if (order instanceof BuyOrder_1.default && order.orderId.eq(orderId) === true) {
                    const info = await VNLSBuyOrderBookContract_1.default.get(orderId);
                    order.amount = info.amount;
                    order.price = info.price;
                }
            }
        };
        this.removeHandler = (orderId) => {
            for (const order of this.tbody.children) {
                if (order instanceof BuyOrder_1.default && order.orderId.eq(orderId) === true) {
                    order.delete();
                }
            }
        };
        this.append(skynode_1.el("a#buy-button", "Buy Virtual Bitcoin", {
            click: async () => {
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const amount = prompt("Please enter VBTC amount.");
                    if (amount !== null) {
                        const realAmount = ethers_1.utils.parseUnits(amount, VirtualBitcoinContract_1.default.decimals);
                        const price = prompt("Please enter price (ETH).");
                        if (price !== null) {
                            await VNLSBuyOrderBookContract_1.default.buy(realAmount, ethers_1.utils.parseEther(price));
                        }
                    }
                }
            },
        }), skynode_1.el("table", skynode_1.el("thead", skynode_1.el("tr", skynode_1.el("td.buyer", "Buyer"), skynode_1.el("td", "Amount"), skynode_1.el("td", ""), skynode_1.el("td", "Price"), skynode_1.el("td", { colspan: "2" }))), this.tbody = skynode_1.el("tbody")));
        this.loadOrders();
        VirtualBitcoinContract_1.default.on("wrongNetwork", this.wrongNetworkHandler);
        VNLSBuyOrderBookContract_1.default.on("wrongNetwork", this.wrongNetworkHandler);
        VNLSBuyOrderBookContract_1.default.on("Buy", this.buyHandler);
        VNLSBuyOrderBookContract_1.default.on("Sell", this.sellHandler);
        VNLSBuyOrderBookContract_1.default.on("Remove", this.removeHandler);
    }
    addOrder(orderId, buyer, amount, price) {
        this.tbody.append(new BuyOrder_1.default(orderId, buyer, amount, price));
    }
    async loadOrders() {
        var _a, _b;
        (_a = this.loading) === null || _a === void 0 ? void 0 : _a.delete();
        this.loading = skynode_1.el(".loading", "Loading...").appendTo(this);
        const count = await VNLSBuyOrderBookContract_1.default.count();
        this.tbody.empty();
        for (let orderId = 0; orderId < count.toNumber(); orderId += 1) {
            (async () => {
                const info = await VNLSBuyOrderBookContract_1.default.get(orderId);
                if (info.price.eq(0) !== true) {
                    this.addOrder(ethers_1.BigNumber.from(orderId), info.buyer, info.amount, info.price);
                }
            })();
        }
        (_b = this.loading) === null || _b === void 0 ? void 0 : _b.delete();
        this.loading = undefined;
    }
    delete() {
        VirtualBitcoinContract_1.default.off("wrongNetwork", this.wrongNetworkHandler);
        VNLSBuyOrderBookContract_1.default.off("wrongNetwork", this.wrongNetworkHandler);
        VNLSBuyOrderBookContract_1.default.off("Buy", this.buyHandler);
        VNLSBuyOrderBookContract_1.default.off("Sell", this.sellHandler);
        VNLSBuyOrderBookContract_1.default.off("Remove", this.removeHandler);
        super.delete();
    }
}
exports.default = BuyOrderList;
//# sourceMappingURL=BuyOrderList.js.map