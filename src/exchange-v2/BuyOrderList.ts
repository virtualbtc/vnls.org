import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import VirtualBitcoinContract from "../contracts/VirtualBitcoinContract";
import VNLSBuyOrderBookContract from "../contracts/VNLSBuyOrderBookContract";
import Wallet from "../ethereum/Wallet";
import BuyOrder from "./BuyOrder";

export default class BuyOrderList extends DomNode {

    private loading: DomNode | undefined;
    private tbody: DomNode;

    constructor() {
        super(".buy-order-list");
        this.append(
            el("a#buy-button", "Buy Virtual Bitcoin", {
                click: async () => {
                    const owner = await Wallet.loadAddress();
                    if (owner !== undefined) {
                        const amount = prompt("Please enter VBTC amount.");
                        if (amount !== null) {
                            const realAmount = utils.parseUnits(amount, VirtualBitcoinContract.decimals);
                            const price = prompt("Please enter price (ETH).");
                            if (price !== null) {
                                await VNLSBuyOrderBookContract.buy(realAmount, utils.parseEther(price));
                            }
                        }
                    }
                },
            }),
            el("table",
                el("thead",
                    el("tr",
                        el("td.buyer", "Buyer"),
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
        VNLSBuyOrderBookContract.on("wrongNetwork", this.wrongNetworkHandler);
        VNLSBuyOrderBookContract.on("Buy", this.buyHandler);
        VNLSBuyOrderBookContract.on("Sell", this.sellHandler);
        VNLSBuyOrderBookContract.on("Remove", this.removeHandler);
    }

    private wrongNetworkHandler = () => {
        alert("Wrong Network");
    };

    private buyHandler = (orderId: BigNumber, buyer: string, amount: BigNumber, price: BigNumber) => {
        this.addOrder(orderId, buyer, amount, price);
    };

    private sellHandler = async (orderId: BigNumber) => {
        for (const order of this.tbody.children) {
            if (order instanceof BuyOrder && order.orderId.eq(orderId) === true) {
                const info = await VNLSBuyOrderBookContract.get(orderId);
                order.amount = info.amount;
                order.price = info.price;
            }
        }
    };

    private removeHandler = (orderId: BigNumber) => {
        for (const order of this.tbody.children) {
            if (order instanceof BuyOrder && order.orderId.eq(orderId) === true) {
                order.delete();
            }
        }
    };

    private addOrder(orderId: BigNumber, buyer: string, amount: BigNumber, price: BigNumber) {
        this.tbody.append(new BuyOrder(orderId, buyer, amount, price));
    }

    private async loadOrders() {

        this.loading?.delete();
        this.loading = el(".loading", "Loading...").appendTo(this);

        const count = await VNLSBuyOrderBookContract.count();
        this.tbody.empty();

        for (let orderId = 0; orderId < count.toNumber(); orderId += 1) {
            (async () => {
                const info = await VNLSBuyOrderBookContract.get(orderId);
                if (info.price.eq(0) !== true) {
                    this.addOrder(BigNumber.from(orderId), info.buyer, info.amount, info.price);
                }
            })();
        }

        this.loading?.delete();
        this.loading = undefined;
    }

    public delete(): void {
        VirtualBitcoinContract.off("wrongNetwork", this.wrongNetworkHandler);
        VNLSBuyOrderBookContract.off("wrongNetwork", this.wrongNetworkHandler);
        VNLSBuyOrderBookContract.off("Buy", this.buyHandler);
        VNLSBuyOrderBookContract.off("Sell", this.sellHandler);
        VNLSBuyOrderBookContract.off("Remove", this.removeHandler);
        super.delete();
    }
}
