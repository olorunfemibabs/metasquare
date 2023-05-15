import Head from "next/head";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, sepolia, bscTestnet, bsc } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { chains, provider } = configureChains(
  [bscTestnet],

  [
    jsonRpcProvider({
      rpc: (chain) => ({
        // http: `https://eth-sepolia.g.alchemy.com/v2/5ShvcS43c_Wrsfk_jTMZOU0sXXBKaVXP`,
        http: `https://data-seed-prebsc-1-s1.binance.org:8545`,
        WebSocket: `wss://data-seed-prebsc-1-s1.binance.org:8545`,
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
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={midnightTheme()}
      >
        <>
        <Head>
          <title>MetaSquare</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        </>
        <Layout provider={provider}>
          <Component {...pageProps} />
          
          <ToastContainer />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
