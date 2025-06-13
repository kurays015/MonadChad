import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import { monadTestnet } from "@wagmi/core/chains";

// export const monadTestnet = defineChain({
//   id: 10143,
//   name: "Monad Testnet",
//   network: "monad-testnet",
//   nativeCurrency: {
//     name: "MON",
//     symbol: "MON",
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: [`https://monad-testnet.rpc.hypersync.xyz`],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: "MonVision",
//       url: "https://testnet.monadexplorer.com/",
//     },
//   },
// });

export const config = getDefaultConfig({
  appName: "Monad Testnet dApp",
  projectId: "3e849aa687238170aa7c7fa04f21e1bb",
  chains: [monadTestnet],
  ssr: true,
});
