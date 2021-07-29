import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import VirtualBitcoinContract from "../contracts/VirtualBitcoinContract";
import VNLSSellOrderBookContract from "../contracts/VNLSSellOrderBookContract";
import Wallet from "../ethereum/Wallet";
import SellOrder from "./SellOrder";

export default class SellOrderList extends DomNode {

    private loading: DomNode | undefined;
    private tbody: DomNode;

    constructor() {
        super(".sell-order-list");
        this.append(
            el("a#sell-button", "Sell Virtual Bitcoin", {
                click: async () => {
                    const owner = await Wallet.loadAddress();
                    if (owner !== undefined) {
                        const amount = prompt("Please enter VBTC amount.");
                        if (amount !== null) {
                            const allowance = await VirtualBitcoinContract.allowance(owner, VNLSSellOrderBookContract.address);
                            if (allowance !== undefined) {
                                const realAmount = utils.parseUnits(amount, VirtualBitcoinContract.decimals);
                                if (allowance.lt(realAmount) === true) {
                                    alert("You need to approve VBTC for Virtual New Liberty Standard.");
                                    await VirtualBitcoinContract.approve(VNLSSellOrderBookContract.address, realAmount);
                                    alert("When approving transaction is complete, please sell it again for the same amount.");
                                } else {
                                    const price = prompt("Please enter price (ETH).");
                                    if (price !== null) {
                                        await VNLSSellOrderBookContract.sell(realAmount, utils.parseEther(price));
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

        this.loadOrders();

        VirtualBitcoinContract.on("wrongNetwork", this.wrongNetworkHandler);
        VNLSSellOrderBookContract.on("wrongNetwork", this.wrongNetworkHandler);
        VNLSSellOrderBookContract.on("Sell", this.sellHandler);
        VNLSSellOrderBookContract.on("Buy", this.buyHandler);
        VNLSSellOrderBookContract.on("Remove", this.removeHandler);
    }

    private wrongNetworkHandler = () => {
        alert("Wrong Network");
    };

    private sellHandler = (orderId: BigNumber, seller: string, amount: BigNumber, price: BigNumber) => {
        this.addOrder(orderId, seller, amount, price);
    };

    private buyHandler = async (orderId: BigNumber) => {
        for (const order of this.tbody.children) {
            if (order instanceof SellOrder && order.orderId.eq(orderId) === true) {
                const info = await VNLSSellOrderBookContract.get(orderId);
                order.amount = info.amount;
                order.price = info.price;
            }
        }
    };

    private removeHandler = (orderId: BigNumber) => {
        for (const order of this.tbody.children) {
            if (order instanceof SellOrder && order.orderId.eq(orderId) === true) {
                order.delete();
            }
        }
    };

    private addOrder(orderId: BigNumber, seller: string, amount: BigNumber, price: BigNumber) {
        this.tbody.append(new SellOrder(orderId, seller, amount, price));
    }

    private async loadOrders() {

        this.loading?.delete();
        this.loading = el(".loading", "Loading...").appendTo(this);

        const count = await VNLSSellOrderBookContract.count();
        this.tbody.empty();

        for (let orderId = 0; orderId < count.toNumber(); orderId += 1) {
            (async () => {
                const info = await VNLSSellOrderBookContract.get(orderId);
                if (info.price.eq(0) !== true) {
                    this.addOrder(BigNumber.from(orderId), info.seller, info.amount, info.price);
                }
            })();
        }

        this.loading?.delete();
        this.loading = undefined;
    }

    public delete(): void {
        VirtualBitcoinContract.off("wrongNetwork", this.wrongNetworkHandler);
        VNLSSellOrderBookContract.off("wrongNetwork", this.wrongNetworkHandler);
        VNLSSellOrderBookContract.off("Sell", this.sellHandler);
        VNLSSellOrderBookContract.off("Buy", this.buyHandler);
        VNLSSellOrderBookContract.off("Remove", this.removeHandler);
        super.delete();
    }
}
