const INFURA_ID = "c76984765f1e41879c0e1cafacd7b134";

export default {

    // Kovan
    //chainId: 42,
    // Mainnet
    chainId: 1,

    infuraId: INFURA_ID,

    // Kovan
    //rpc: `https://kovan.infura.io/v3/${INFURA_ID}`,

    // Mainnet
    rpc: `https://mainnet.infura.io/v3/${INFURA_ID}`,

    contracts: {
        // Kovan
        //VirtualBitcoin: "0xfe6D468bB4DD530E0f5eE98b58e37e11DaAAaF31",
        //VirtualNewLibertyStandard: "0x92EC0194BC2Fd60fa1833Ac106749aaA8D22C05c",
        // Mainnet
        VirtualBitcoin: "0x84e7ae4897b3847b67f212aff78bfbc5f700aa40",
        VirtualNewLibertyStandard: "0x9C71228aAE840d19d3a4447071A7D6708C9046A9",
    },
};
