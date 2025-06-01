import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { monadTestnet } from "@wagmi/core/chains";

export const config = getDefaultConfig({
  appName: "Monad Testnet dApp",
  projectId: "3e849aa687238170aa7c7fa04f21e1bb", // Add to .env
  chains: [monadTestnet],
  ssr: true, // Enable SSR for Next.js
});
