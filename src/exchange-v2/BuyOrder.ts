import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import VirtualBitcoinContract from "../contracts/VirtualBitcoinContract";
import VNLSBuyOrderBookContract from "../contracts/VNLSBuyOrderBookContract";
import Wallet from "../ethereum/Wallet";

export default class BuyOrder extends DomNode {

    private amountPanel: DomNode;
    private pricePanel: DomNode;

    constructor(
        public orderId: BigNumber,
        buyer: string,
        amount: BigNumber,
        price: BigNumber,
    ) {
        super("tr.buy-order");
        this.append(
            el("td.buyer", buyer),
            this.amountPanel = el("td", `${utils.formatUnits(amount, VirtualBitcoinContract.decimals)} VBTC`),
            el("td", "="),
            this.pricePanel = el("td", `${utils.formatEther(price)} ETH`),
            el("td", el("a", "Sell", {
                click: async () => {
                    const owner = await Wallet.loadAddress();
                    if (owner !== undefined) {
                        const amount = prompt("How much amount to sell?");
                        if (amount !== null) {
                            const allowance = await VirtualBitcoinContract.allowance(owner, VNLSBuyOrderBookContract.address);
                            if (allowance !== undefined) {
                                const realAmount = utils.parseUnits(amount, VirtualBitcoinContract.decimals);
                                if (allowance.lt(realAmount) === true) {
                                    alert("You need to approve VBTC for Virtual New Liberty Standard.");
                                    await VirtualBitcoinContract.approve(VNLSBuyOrderBookContract.address, realAmount);
                                    alert("When approving transaction is complete, please sell it again for the same amount.");
                                } else {
                                    await VNLSBuyOrderBookContract.sell(orderId, realAmount);
                                }
                            }
                        }
                    }
                },
            })),
            el("td", el("a", "Cancel", {
                click: () => VNLSBuyOrderBookContract.cancel(orderId),
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
