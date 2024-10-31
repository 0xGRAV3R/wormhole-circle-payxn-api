export default () => ({
    ethereum: {
      rpc: process.env.ETH_RPC_URL,
      usdcAddress: process.env.ETH_USDC_ADDRESS,
    },
    solana: {
      rpc: process.env.SOLANA_RPC_URL,
      receiverAddress: process.env.SOLANA_RECEIVER_ADDRESS,
    },
    wormhole: {
      bridge: process.env.WORMHOLE_BRIDGE_ADDRESS,
    },
  });
  