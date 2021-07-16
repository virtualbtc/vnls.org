import { ContractInterface, ethers } from "ethers";
import EventContainer from "eventcontainer";
import Config from "../Config";
import NetworkProvider from "../ethereum/NetworkProvider";
import Wallet from "../ethereum/Wallet";

export default abstract class Contract<CT extends ethers.Contract> extends EventContainer {

    protected walletContract: CT | undefined;
    protected contract: CT;

    constructor(public address: string, private abi: ContractInterface, eventNames: string[]) {
        super();
        this.contract = new ethers.Contract(address, abi, NetworkProvider.provider).connect(NetworkProvider.signer) as CT;
        for (const eventName of eventNames) {
            this.contract.on(eventName, (...args) => {
                this.fireEvent(eventName, ...args);
            });
        }
        Wallet.on("chainChanged", () => this.walletContract = undefined);
    }

    public async loadWalletContract() {
        if (await Wallet.loadChainId() !== Config.chainId) {
            this.fireEvent("wrongNetwork");
            console.error("Wrong Network");
        } else {
            if (await Wallet.connected() !== true) {
                await Wallet.connect();
            }
            if (this.walletContract === undefined && Wallet.signer !== undefined) {
                this.walletContract = new ethers.Contract(this.address, this.abi, Wallet.provider).connect(Wallet.signer) as CT;
            }
            return this.walletContract;
        }
    }
}
