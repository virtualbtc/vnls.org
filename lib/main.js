"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Balance_1 = __importDefault(require("./Balance"));
const BuyOrderList_1 = __importDefault(require("./exchange-v2/BuyOrderList"));
const SellOrderList_1 = __importDefault(require("./exchange-v2/SellOrderList"));
const balance = new skynode_1.DomNode(document.getElementById("balance"));
balance.append(new Balance_1.default());
const exchangeV2 = new skynode_1.DomNode(document.getElementById("exchange-v2"));
exchangeV2.append(skynode_1.el("h3", "Buy Orders"), new BuyOrderList_1.default(), skynode_1.el("h3", "Sell Orders"), new SellOrderList_1.default());
//# sourceMappingURL=main.js.map