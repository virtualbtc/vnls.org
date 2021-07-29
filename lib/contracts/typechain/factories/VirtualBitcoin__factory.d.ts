import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { VirtualBitcoin } from "../VirtualBitcoin";
export declare class VirtualBitcoin__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<VirtualBitcoin>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): VirtualBitcoin;
    connect(signer: Signer): VirtualBitcoin__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): VirtualBitcoin;
}
//# sourceMappingURL=VirtualBitcoin__factory.d.ts.map