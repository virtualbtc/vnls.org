"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const VirtualBitcoinContract_1 = __importDefault(require("./contracts/VirtualBitcoinContract"));
const VirtualNewLibertyStandardContract_1 = __importDefault(require("./contracts/VirtualNewLibertyStandardContract"));
const NetworkProvider_1 = __importDefault(require("./ethereum/NetworkProvider"));
const Wallet_1 = __importDefault(require("./ethereum/Wallet"));
const Sale_1 = __importDefault(require("./Sale"));
class SaleList extends skynode_1.DomNode {
    constructor() {
        super(".sale-list");
        this.connectHandler = () => {
            this.loadVBTCAmount();
            this.loadETHAmount();
        };
        this.wrongNetworkHandler = () => {
            alert("Wrong Network");
        };
        this.transferHandler = async (from, to, amount) => {
            const address = await Wallet_1.default.loadAddress();
            if (from === address || to === address) {
                this.loadVBTCAmount();
            }
        };
        this.sellHandler = (saleId, seller, amount, price) => {
            this.addSale(saleId, seller, amount, price);
        };
        this.removeSaleHandler = (saleId) => {
            for (const sale of this.tbody.children) {
                if (sale instanceof Sale_1.default && sale.saleId.eq(saleId) === true) {
                    sale.delete();
                }
            }
        };
        this.append(skynode_1.el(".vbtc-amount", "Your VBTC: ", this.vbtcAmount = skynode_1.el("span", "Loading...")), skynode_1.el(".eth-amount", "Your ETH: ", this.ethAmount = skynode_1.el("span", "Loading...")), skynode_1.el("a#sell-button", "Sell Your Virtual Bitcoin", {
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
        this.loadVBTCAmount();
        this.loadETHAmount();
        this.loadSales();
        Wallet_1.default.on("connect", this.connectHandler);
        VirtualBitcoinContract_1.default.on("wrongNetwork", this.wrongNetworkHandler);
        VirtualBitcoinContract_1.default.on("Transfer", this.transferHandler);
        VirtualNewLibertyStandardContract_1.default.on("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract_1.default.on("Sell", this.sellHandler);
        VirtualNewLibertyStandardContract_1.default.on("RemoveSale", this.removeSaleHandler);
    }
    async loadVBTCAmount() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner === undefined) {
            this.vbtcAmount.empty().append(skynode_1.el("p", "Please Connect. ", skynode_1.el("a", "Connect", {
                click: () => Wallet_1.default.connect(),
            })));
        }
        else {
            const amount = ethers_1.utils.formatUnits(await VirtualBitcoinContract_1.default.balanceOf(owner), VirtualBitcoinContract_1.default.decimals);
            this.vbtcAmount.empty().appendText(amount);
        }
    }
    async loadETHAmount() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner === undefined) {
            this.ethAmount.empty().appendText("Load failed.");
        }
        else {
            const amount = ethers_1.utils.formatEther(await NetworkProvider_1.default.getBalance(owner));
            this.ethAmount.empty().appendText(amount);
        }
    }
    addSale(saleId, seller, amount, price) {
        this.tbody.append(new Sale_1.default(saleId, seller, amount, price));
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
        Wallet_1.default.off("connect", this.connectHandler);
        VirtualBitcoinContract_1.default.off("wrongNetwork", this.wrongNetworkHandler);
        VirtualBitcoinContract_1.default.off("Transfer", this.transferHandler);
        VirtualNewLibertyStandardContract_1.default.off("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract_1.default.off("Sell", this.sellHandler);
        VirtualNewLibertyStandardContract_1.default.off("RemoveSale", this.removeSaleHandler);
        super.delete();
    }
}
exports.default = SaleList;
//# sourceMappingURL=SaleList%20copy.js.map