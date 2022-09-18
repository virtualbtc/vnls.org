"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const eventcontainer_1 = __importDefault(require("eventcontainer"));
const Config_1 = __importDefault(require("../Config"));
class NetworkProvider extends eventcontainer_1.default {
    constructor() {
        super();
        this.ethereum = window.ethereum;
        if (this.existsInjectedProvider === true) {
            this.provider = new ethers_1.ethers.providers.Web3Provider(this.ethereum);
        }
        else {
            this.provider = new ethers_1.ethers.providers.JsonRpcProvider(Config_1.default.rpc);
        }
        this.signer = this.provider.getSigner(ethers_1.ethers.constants.AddressZero);
    }
    get existsInjectedProvider() { return this.ethereum !== undefined; }
    async getBlockNumber() {
        return await this.provider.getBlockNumber();
    }
    async getBalance(address) {
        return await this.provider.getBalance(address);
    }
}
exports.default = new NetworkProvider();
//# sourceMappingURL=NetworkProvider.js.map