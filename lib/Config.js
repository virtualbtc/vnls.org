"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INFURA_ID = "96ce12f4a29c44699587732ebf110b75";
exports.default = {
    chainId: 1,
    infuraId: INFURA_ID,
    endpoint: `wss://mainnet.infura.io/ws/v3/${INFURA_ID}`,
    contracts: {
        VirtualBitcoin: "0x84e7ae4897b3847b67f212aff78bfbc5f700aa40",
        VirtualNewLibertyStandard: "0x9C71228aAE840d19d3a4447071A7D6708C9046A9",
        VNLSBuyOrderBook: "0x14e90440d54014B8A85ff9F25734B1f2c51d16cc",
        VNLSSellOrderBook: "0x18177A4Ee92E71A835df362acAb125232D1ee7f0",
    },
};
//# sourceMappingURL=Config.js.map