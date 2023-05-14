import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, sepolia, bscTestnet, bsc } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const { chains, provider } = configureChains(
  [mainnet, sepolia],
  
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://eth-sepolia.g.alchemy.com/v2/qOB4YAZmOLO8b79gMjCzo5vunM0HyDvE`,
        WebSocket: `wss://eth-sepolia.g.alchemy.com/v2/qOB4YAZmOLO8b79gMjCzo5vunM0HyDvE`,
      }),
    }),
  ]
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
          <ToastContainer />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
