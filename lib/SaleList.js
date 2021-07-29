"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const VirtualBitcoinContract_1 = __importDefault(require("./contracts/VirtualBitcoinContract"));
const VirtualNewLibertyStandardContract_1 = __importDefault(require("./contracts/VirtualNewLibertyStandardContract"));
const Wallet_1 = __importDefault(require("./ethereum/Wallet"));
const SaleV1_1 = __importDefault(require("./SaleV1"));
class SaleList extends skynode_1.DomNode {
    constructor() {
        super(".sale-list");
        this.wrongNetworkHandler = () => {
            alert("Wrong Network");
        };
        this.sellHandler = (saleId, seller, amount, price) => {
            this.addSale(saleId, seller, amount, price);
        };
        this.removeSaleHandler = (saleId) => {
            for (const sale of this.tbody.children) {
                if (sale instanceof SaleV1_1.default && sale.saleId.eq(saleId) === true) {
                    sale.delete();
                }
            }
        };
        this.append(skynode_1.el("a#sell-button", "Sell Your Virtual Bitcoin", {
            click: async () => {
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const amount = prompt("Please enter VBTC amount.");
                    if (amount !== null) {
                        const allowance = await VirtualBitcoinContract_1.default.allowance(owner, VirtualNewLibertyStandardContract_1.default.address);
                        if (allowance !== undefined) {
                            const realAmount = ethers_1.utils.parseUnits(amount, VirtualBitcoinContract_1.default.decimals);
                            if (allowance.lt(realAmount) === true) {
                                alert("You need to approve VBTC for Virtual New Liberty Standard.");
                                await VirtualBitcoinContract_1.default.approve(VirtualNewLibertyStandardContract_1.default.address, realAmount);
                                alert("When approving transaction is complete, please sell it again for the same amount.");
                            }
                            else {
                                const price = prompt("Please enter price (ETH).");
                                if (price !== null) {
                                    await VirtualNewLibertyStandardContract_1.default.sell(realAmount, ethers_1.utils.parseEther(price));
                                }
                            }
                        }
                    }
                }
            },
        }), skynode_1.el("table", skynode_1.el("thead", skynode_1.el("tr", skynode_1.el("td.seller", "Seller"), skynode_1.el("td", "Amount"), skynode_1.el("td", ""), skynode_1.el("td", "Price"), skynode_1.el("td", { colspan: "2" }))), this.tbody = skynode_1.el("tbody")));
        this.loadSales();
        VirtualBitcoinContract_1.default.on("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract_1.default.on("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract_1.default.on("Sell", this.sellHandler);
        VirtualNewLibertyStandardContract_1.default.on("RemoveSale", this.removeSaleHandler);
    }
    addSale(saleId, seller, amount, price) {
        this.tbody.append(new SaleV1_1.default(saleId, seller, amount, price));
    }
    async loadSales() {
        var _a, _b;
        (_a = this.loading) === null || _a === void 0 ? void 0 : _a.delete();
        this.loading = skynode_1.el(".loading", "Loading...").appendTo(this);
        const count = await VirtualNewLibertyStandardContract_1.default.getSaleCount();
        this.tbody.empty();
        for (let saleId = 0; saleId < count.toNumber(); saleId += 1) {
            (async () => {
                const [seller, amount, price] = await VirtualNewLibertyStandardContract_1.default.getSale(saleId);
                if (price.eq(0) !== true) {
                    this.addSale(ethers_1.BigNumber.from(saleId), seller, amount, price);
                }
            })();
        }
        (_b = this.loading) === null || _b === void 0 ? void 0 : _b.delete();
        this.loading = undefined;
    }
    delete() {
        VirtualBitcoinContract_1.default.off("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract_1.default.off("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract_1.default.off("Sell", this.sellHandler);
        VirtualNewLibertyStandardContract_1.default.off("RemoveSale", this.removeSaleHandler);
        super.delete();
    }
}
exports.default = SaleList;
//# sourceMappingURL=SaleList.js.map