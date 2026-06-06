import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { atlanticTestnet } from './lib/chains'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

const { connectors } = getDefaultWallets({
  appName: 'LawIntel',
  projectId,
})

const config = createConfig({
  chains: [mainnet, polygon, atlanticTestnet],
  connectors,
  transports: {
    [mainnet.id]: http('https://cloudflare-eth.com'),      // CORS-friendly
    [polygon.id]: http('https://polygon-rpc.com'),         // reliable Polygon RPC
    [atlanticTestnet.id]: http(),                          // uses your defined RPC
  },
})
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)