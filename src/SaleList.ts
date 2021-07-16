import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import VirtualBitcoinContract from "./contracts/VirtualBitcoinContract";
import VirtualNewLibertyStandardContract from "./contracts/VirtualNewLibertyStandardContract";
import NetworkProvider from "./ethereum/NetworkProvider";
import Wallet from "./ethereum/Wallet";
import Sale from "./Sale";

export default class SaleList extends DomNode {

    private vbtcAmount: DomNode;
    private ethAmount: DomNode;

    private loading: DomNode | undefined;
    private pleaseConnect: DomNode | undefined;
    private tbody: DomNode;
    private loadCount = 0;

    constructor() {
        super(".sale-list");
        this.append(
            el(".vbtc-amount", "Your VBTC: ", this.vbtcAmount = el("span", "Loading...")),
            el(".eth-amount", "Your ETH: ", this.ethAmount = el("span", "Loading...")),
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
                                    alert("You need approve VBTC for Virtual New Liberty Standard.");
                                    await VirtualBitcoinContract.approve(VirtualNewLibertyStandardContract.address, realAmount);
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

        this.loadVBTCAmount();
        this.loadETHAmount();
        this.loadSales();

        Wallet.on("connect", this.connectHandler);
        VirtualBitcoinContract.on("wrongNetwork", this.wrongNetworkHandler);
        VirtualBitcoinContract.on("Transfer", this.transferHandler);
        VirtualNewLibertyStandardContract.on("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract.on("Sell", this.sellHandler);
        VirtualNewLibertyStandardContract.on("RemoveSale", this.removeSaleHandler);
    }

    private connectHandler = () => {
        this.loadVBTCAmount();
        this.loadETHAmount();
        this.loadSales();
    };

    private wrongNetworkHandler = () => {
        alert("Wrong Network");
    };

    private transferHandler = async (from: string, to: string, amount: BigNumber) => {
        const address = await Wallet.loadAddress();
        if (from === address || to === address) {
            this.loadVBTCAmount();
        }
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

    private async loadVBTCAmount() {
        const owner = await Wallet.loadAddress();
        if (owner === undefined) {
            this.vbtcAmount.empty().appendText("Load failed.");
        } else {
            const amount = utils.formatUnits(await VirtualBitcoinContract.balanceOf(owner), VirtualBitcoinContract.decimals);
            this.vbtcAmount.empty().appendText(amount);
        }
    }

    private async loadETHAmount() {
        const owner = await Wallet.loadAddress();
        if (owner === undefined) {
            this.ethAmount.empty().appendText("Load failed.");
        } else {
            const amount = utils.formatEther(await NetworkProvider.getBalance(owner));
            this.ethAmount.empty().appendText(amount);
        }
    }

    private addSale(saleId: BigNumber, seller: string, amount: BigNumber, price: BigNumber) {
        this.tbody.append(new Sale(saleId, seller, amount, price));
    }

    private async loadSales() {

        this.loadCount += 1;
        const currentLoadCount = this.loadCount;

        this.loading?.delete();
        this.loading = el(".loading", "Loading...").appendTo(this);

        this.pleaseConnect?.delete();
        this.pleaseConnect = undefined;

        const owner = await Wallet.loadAddress();
        if (this.loadCount === currentLoadCount) {

            if (owner === undefined) {
                this.tbody.empty();
                this.pleaseConnect = el("p", "Please Connect. ", el("a", "Connect", {
                    click: () => Wallet.connect(),
                })).appendTo(this);
            } else {

                const count = await VirtualNewLibertyStandardContract.getSaleCount();
                if (this.loadCount === currentLoadCount) {
                    this.tbody.empty();

                    for (let saleId = 0; saleId < count.toNumber(); saleId += 1) {
                        const [seller, amount, price] = await VirtualNewLibertyStandardContract.getSale(saleId);
                        if (this.loadCount !== currentLoadCount) {
                            break;
                        } else if (price.eq(0) !== true) {
                            this.addSale(BigNumber.from(saleId), seller, amount, price);
                        }
                    }
                }
            }
        }

        this.loading?.delete();
        this.loading = undefined;
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        VirtualBitcoinContract.off("wrongNetwork", this.wrongNetworkHandler);
        VirtualBitcoinContract.off("Transfer", this.transferHandler);
        VirtualNewLibertyStandardContract.off("wrongNetwork", this.wrongNetworkHandler);
        VirtualNewLibertyStandardContract.off("Sell", this.sellHandler);
        VirtualNewLibertyStandardContract.off("RemoveSale", this.removeSaleHandler);
        super.delete();
    }
}
