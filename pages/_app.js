import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, sepolia, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, bscTestnet, bsc } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Layout from "@/components/Layout";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, bscTestnet, bsc],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider modalSize="compact" chains={chains} theme={midnightTheme()}>
        <Layout provider={provider}>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
