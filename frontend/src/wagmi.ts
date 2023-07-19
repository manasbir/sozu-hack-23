import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import mantleTestnet from './types/mantleTestnet'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [mantleTestnet],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'Mantle Multifaucet',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains,
})

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export { chains }
