"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const VirtualBitcoinContract_1 = __importDefault(require("./contracts/VirtualBitcoinContract"));
const NetworkProvider_1 = __importDefault(require("./ethereum/NetworkProvider"));
const Wallet_1 = __importDefault(require("./ethereum/Wallet"));
class Balance extends skynode_1.DomNode {
    constructor() {
        super(".balance");
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
        this.append(skynode_1.el(".vbtc-amount", "Your VBTC: ", this.vbtcAmount = skynode_1.el("span", "Loading...")), skynode_1.el(".eth-amount", "Your ETH: ", this.ethAmount = skynode_1.el("span", "Loading...")));
        this.loadVBTCAmount();
        this.loadETHAmount();
        Wallet_1.default.on("connect", this.connectHandler);
        VirtualBitcoinContract_1.default.on("wrongNetwork", this.wrongNetworkHandler);
        VirtualBitcoinContract_1.default.on("Transfer", this.transferHandler);
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
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        VirtualBitcoinContract_1.default.off("wrongNetwork", this.wrongNetworkHandler);
        VirtualBitcoinContract_1.default.off("Transfer", this.transferHandler);
        super.delete();
    }
}
exports.default = Balance;
//# sourceMappingURL=Balance.js.map