import { DomNode, el } from "@hanul/skynode";
import Balance from "./Balance";
import SaleList from "./exchange-v1/SaleList";
import BuyOrderList from "./exchange-v2/BuyOrderList";
import SellOrderList from "./exchange-v2/SellOrderList";

const balance = new DomNode(document.getElementById("balance")!);
balance.append(new Balance());

const exchangeV1 = new DomNode(document.getElementById("exchange-v1")!);
exchangeV1.append(new SaleList());

const exchangeV2 = new DomNode(document.getElementById("exchange-v2")!);
exchangeV2.append(
    el("h3", "Buy Orders"),
    new BuyOrderList(),
    el("h3", "Sell Orders"),
    new SellOrderList(),
);
