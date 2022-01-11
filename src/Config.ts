const INFURA_ID = "96ce12f4a29c44699587732ebf110b75";

export default {

    // Kovan
    //chainId: 42,

    // Mainnet
    chainId: 1,

    infuraId: INFURA_ID,

    // Kovan
    //endpoint: `wss://kovan.infura.io/ws/v3/${INFURA_ID}`,

    // Mainnet
    endpoint: `wss://mainnet.infura.io/ws/v3/${INFURA_ID}`,

    contracts: {

        // Kovan
        //VirtualBitcoin: "0xfe6D468bB4DD530E0f5eE98b58e37e11DaAAaF31",
        //VirtualNewLibertyStandard: "0x92EC0194BC2Fd60fa1833Ac106749aaA8D22C05c",
        //VNLSBuyOrderBook: "0x589B7F77e38009Bcd47fE1101338F1fA5C74ab0D",
        //VNLSSellOrderBook: "0xbD2C4E0c2b3Fc6f6167A7d30F8527798C3874a36",

        // Mainnet
        VirtualBitcoin: "0x84e7ae4897b3847b67f212aff78bfbc5f700aa40",
        VirtualNewLibertyStandard: "0x9C71228aAE840d19d3a4447071A7D6708C9046A9",
        VNLSBuyOrderBook: "0x14e90440d54014B8A85ff9F25734B1f2c51d16cc",
        VNLSSellOrderBook: "0x36fBC9482449BeFE6F8c5d7d802Cae806c6826bf",
    },
};
