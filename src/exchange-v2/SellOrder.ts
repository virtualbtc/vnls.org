import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import VirtualBitcoinContract from "../contracts/VirtualBitcoinContract";
import VNLSSellOrderBookContract from "../contracts/VNLSSellOrderBookContract";

export default class SellOrder extends DomNode {

    private amountPanel: DomNode;
    private pricePanel: DomNode;

    constructor(
        public orderId: BigNumber,
        seller: string,
        amount: BigNumber,
        price: BigNumber,
    ) {
        super("tr.sell-order");
        this.append(
            el("td.seller", seller),
            this.amountPanel = el("td", `${utils.formatUnits(amount, VirtualBitcoinContract.decimals)} VBTC`),
            el("td", "="),
            this.pricePanel = el("td", `${utils.formatEther(price)} ETH`),
            el("td", el("a", "Buy", {
                click: async () => {
                    const amountToBuy = prompt("How much amount to buy?");
                    if (amountToBuy !== null) {
                        console.log(utils.formatEther(price.mul(utils.parseUnits(amountToBuy, VirtualBitcoinContract.decimals)).div(amount)));
                        await VNLSSellOrderBookContract.buy(orderId, price.mul(utils.parseUnits(amountToBuy, VirtualBitcoinContract.decimals)).div(amount));
                        alert("A buying transaction has started. Please wait for the transaction to complete.");
                    }
                },
            })),
            el("td", el("a", "Cancel", {
                click: () => VNLSSellOrderBookContract.cancel(orderId),
            })),
        );
    }

    public set amount(amount: BigNumber) {
        this.amountPanel.empty().appendText(`${utils.formatUnits(amount, VirtualBitcoinContract.decimals)} VBTC`);
    }

    public set price(price: BigNumber) {
        this.pricePanel.empty().appendText(`${utils.formatEther(price)} ETH`);
    }
}
