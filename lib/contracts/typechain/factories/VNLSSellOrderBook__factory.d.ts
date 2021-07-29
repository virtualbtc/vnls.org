import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { VNLSSellOrderBook } from "../VNLSSellOrderBook";
export declare class VNLSSellOrderBook__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_vbtc: string, overrides?: Overrides): Promise<VNLSSellOrderBook>;
    getDeployTransaction(_vbtc: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): VNLSSellOrderBook;
    connect(signer: Signer): VNLSSellOrderBook__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): VNLSSellOrderBook;
}
//# sourceMappingURL=VNLSSellOrderBook__factory.d.ts.map