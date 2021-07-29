import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { VNLSBuyOrderBook } from "../VNLSBuyOrderBook";
export declare class VNLSBuyOrderBook__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_vbtc: string, overrides?: Overrides): Promise<VNLSBuyOrderBook>;
    getDeployTransaction(_vbtc: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): VNLSBuyOrderBook;
    connect(signer: Signer): VNLSBuyOrderBook__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): VNLSBuyOrderBook;
}
//# sourceMappingURL=VNLSBuyOrderBook__factory.d.ts.map