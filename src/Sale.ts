import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import VirtualBitcoinContract from "./contracts/VirtualBitcoinContract";
import VirtualNewLibertyStandardContract from "./contracts/VirtualNewLibertyStandardContract";

export default class Sale extends DomNode {

    constructor(
        public saleId: BigNumber,
        seller: string,
        amount: BigNumber,
        price: BigNumber,
    ) {
        super("tr.sale");
        this.append(
            el("td.seller", seller),
            el("td", `${utils.formatUnits(amount, VirtualBitcoinContract.decimals)} VBTC`),
            el("td", "="),
            el("td", `${utils.formatEther(price)} ETH`),
            el("td", el("a", "Buy", {
                click: () => VirtualNewLibertyStandardContract.buy(saleId, price),
            })),
            el("td", el("a", "Cancel", {
                click: () => VirtualNewLibertyStandardContract.cancelSale(saleId),
            })),
        );
    }
}
