import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import VirtualBitcoinContract from "../contracts/VirtualBitcoinContract";
import VirtualNewLibertyStandardContract from "../contracts/VirtualNewLibertyStandardContract";
import Wallet from "../ethereum/Wallet";
import Sale from "./Sale";

export default class SaleList extends DomNode {

    private loading: DomNode | undefined;
    private tbody: DomNode;

    constructor() {
        super(".sale-list");
        this.append(
            el("a#sell-button", "Sell Your Virtual Bitcoin", {
                click: async () => {
                    const owner = await Wallet.loadAddress();
                    if (owner !== undefined) {
                        const amount = prompt("Please enter VBTC amount.");
                        if (amount !== null) {
                            const allowance = await VirtualBitcoinContract.allowance(owner, VirtualNewLibertyStandardContract.address);
                            if (allowance !== undefined) {
                                const realAmount = utils.parseUnits(amount, VirtualBitcoinContract.decimals);
                                if (allowance.lt(realAmount) === true) {
                                    alert("You need to approve VBTC for Virtual New Liberty Standard.");
                                    await VirtualBitcoinContract.approve(VirtualNewLibertyStandardContract.address, realAmount);
                                    alert("When approving transaction is complete, please sell it again for the same amount.");
                                } else {
                                    const price = prompt("Please enter price (ETH).");
                                    if (price !== null) {
                                        await VirtualNewLibertyStandardContract.sell(realAmount, utils.parseEther(price));
                                    }
                                }
                            }
                        }
                    }
                },
            }),
            el("table",
                el("thead",
                    el("tr",
                        el("td.seller", "Seller"),
                        el("td", "Amount"),
                        el("td", ""),
                        el("td", "Price"),
                        el("td", { colspan: "2" }),
                    ),
                ),
                this.tbody = el("tbody"),
            ),
        );

        this.loadSales();

        VirtualBitcoinContract.on("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract.on("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract.on("Sell", this.sellHandler);
        VirtualNewLibertyStandardContract.on("RemoveSale", this.removeSaleHandler);
    }

    private wrongNetworkHandler = () => {
        alert("Wrong Network");
    };

    private sellHandler = (saleId: BigNumber, seller: string, amount: BigNumber, price: BigNumber) => {
        this.addSale(saleId, seller, amount, price);
    };

    private removeSaleHandler = (saleId: BigNumber) => {
        for (const sale of this.tbody.children) {
            if (sale instanceof Sale && sale.saleId.eq(saleId) === true) {
                sale.delete();
            }
        }
    };

    private addSale(saleId: BigNumber, seller: string, amount: BigNumber, price: BigNumber) {
        this.tbody.append(new Sale(saleId, seller, amount, price));
    }

    private async loadSales() {

        this.loading?.delete();
        this.loading = el(".loading", "Loading...").appendTo(this);

        const count = await VirtualNewLibertyStandardContract.getSaleCount();
        this.tbody.empty();

        for (let saleId = 0; saleId < count.toNumber(); saleId += 1) {
            (async () => {
                const [seller, amount, price] = await VirtualNewLibertyStandardContract.getSale(saleId);
                if (price.eq(0) !== true) {
                    this.addSale(BigNumber.from(saleId), seller, amount, price);
                }
            })();
        }

        this.loading?.delete();
        this.loading = undefined;
    }

    public delete(): void {
        VirtualBitcoinContract.off("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract.off("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract.off("Sell", this.sellHandler);
        VirtualNewLibertyStandardContract.off("RemoveSale", this.removeSaleHandler);
        super.delete();
    }
}
