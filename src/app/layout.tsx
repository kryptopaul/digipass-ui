"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  lightTheme
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { avalancheFuji} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const { chains, publicClient } = configureChains(
  [avalancheFuji, mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "TravelPass",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> 
      <body className={`${inter.className} bg-gray-50`}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            theme={lightTheme({
              accentColor: "#b910ff",
              accentColorForeground: "white",
              borderRadius: "medium",
              overlayBlur: "small",
            })}
            chains={chains}
          >
            {children}{" "}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
