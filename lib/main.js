"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const SaleList_1 = __importDefault(require("./SaleList"));
const exchange = new skynode_1.DomNode(document.getElementById("exchange"));
exchange.append(new SaleList_1.default());
//# sourceMappingURL=main.js.map