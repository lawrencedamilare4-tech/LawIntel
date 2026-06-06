import { defineChain } from 'viem'

export const atlanticTestnet = defineChain({
  id: 688689,
  name: 'Pharos Atlantic Testnet',
  network: 'atlantic-testnet',
  nativeCurrency: { name: 'PHRS', symbol: 'PHRS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://atlantic.dplabs-internal.com'] },
    public: { http: ['https://atlantic.dplabs-internal.com'] },
  },
  blockExplorers: {
    default: { name: 'Pharosscan', url: 'https://atlantic.pharosscan.xyz/' },
  },
})

export const pharosMainnet = defineChain({
  id: 1672,
  name: 'Pharos Mainnet',
  network: 'mainnet',
  nativeCurrency: { name: 'PROS', symbol: 'PROS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.pharos.xyz'] },
    public: { http: ['https://rpc.pharos.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Pharosscan', url: 'https://www.pharosscan.xyz/' },
  },
})