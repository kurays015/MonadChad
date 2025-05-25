// import { Chain } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { monadTestnet } from "@wagmi/core/chains";

// export const monadTestnet: Chain = {
//   id: 10143, // Monad Testnet Chain ID
//   name: "Monad Testnet",
//   // network: 'monad-testnet',
//   nativeCurrency: {
//     name: "Monad Testnet MON",
//     symbol: "MON",
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://testnet-rpc.monad.xyz"], // Replace with official RPC if available
//     },
//     public: {
//       http: ["https://testnet-rpc.monad.xyz"],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: "Monad Testnet Explorer",
//       url: "https://testnet.monadexplorer.com", // Replace with official explorer if available
//     },
//   },
//   testnet: true,
// };

export const config = getDefaultConfig({
  appName: "Monad Testnet dApp",
  projectId: "3e849aa687238170aa7c7fa04f21e1bb", // Add to .env
  chains: [monadTestnet],
  ssr: true, // Enable SSR for Next.js
});
