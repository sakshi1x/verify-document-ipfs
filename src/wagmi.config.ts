import { hederaTestnet } from "viem/chains";
import { createConfig, http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [hederaTestnet],
    transports: {
      // RPC URL for each chain
      [hederaTestnet.id]: http(),
    },
    walletConnectProjectId: "your-wallet-connect-project-id",

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);
