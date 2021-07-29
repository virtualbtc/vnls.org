import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import VirtualBitcoinContract from "./contracts/VirtualBitcoinContract";
import NetworkProvider from "./ethereum/NetworkProvider";
import Wallet from "./ethereum/Wallet";

export default class Balance extends DomNode {

    private vbtcAmount: DomNode;
    private ethAmount: DomNode;

    private loading: DomNode | undefined;

    constructor() {
        super(".balance");
        this.append(
            el(".vbtc-amount", "Your VBTC: ", this.vbtcAmount = el("span", "Loading...")),
            el(".eth-amount", "Your ETH: ", this.ethAmount = el("span", "Loading...")),
        );

        this.loadVBTCAmount();
        this.loadETHAmount();

        Wallet.on("connect", this.connectHandler);
        VirtualBitcoinContract.on("wrongNetwork", this.wrongNetworkHandler);
        VirtualBitcoinContract.on("Transfer", this.transferHandler);
    }

    private connectHandler = () => {
        this.loadVBTCAmount();
        this.loadETHAmount();
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

    private async loadVBTCAmount() {
        const owner = await Wallet.loadAddress();
        if (owner === undefined) {
            this.vbtcAmount.empty().append(el("p", "Please Connect. ", el("a", "Connect", {
                click: () => Wallet.connect(),
            })));
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

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        VirtualBitcoinContract.off("wrongNetwork", this.wrongNetworkHandler);
        VirtualBitcoinContract.off("Transfer", this.transferHandler);
        super.delete();
    }
}
