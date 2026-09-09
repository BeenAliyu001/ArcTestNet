// Official Arc Testnet Configuration Parameters
export const ARC_TESTNET_PARAMS = {
  chainId: '0x13882', // Hex format (80002 or Arc Testnet Chain ID)
  chainName: 'Arc Testnet',
  nativeCurrency: {
    name: 'USDC',
    symbol: 'USDC', // Arc uses USDC as native gas asset
    decimals: 18,
  },
  rpcUrls: ['https://rpc.testnet.arc.network'], // Replace with official Arc RPC URL
  blockExplorerUrls: ['https://explorer.testnet.arc.network'], // Replace with official Arc Explorer URL
};

// Token Contract Addresses on Arc Testnet
export const ARC_TOKENS = {
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x0000000000000000000000000000000000000000', // Insert official Arc Testnet USDC contract
    decimals: 6,
  },
  EURC: {
    symbol: 'EURC',
    name: 'Euro Coin',
    address: '0x0000000000000000000000000000000000000000', // Insert official Arc Testnet EURC contract
    decimals: 6,
  },
};

// Official Arc Swap Router Contract Address
export const ARC_ROUTER_ADDRESS = '0x0000000000000000000000000000000000000000'; // Insert official Arc App Kit / Swap Router address