"use client"
import React from 'react';
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react';
import { Navbar } from './ui/Navbar';
import { ethers } from "ethers";
import abi from "../utils/abi.json";

interface ContextType {
  contract: ethers.Contract | null
  provider: ethers.providers.Web3Provider| null
  signer: ethers.providers.JsonRpcSigner| null
  getAccount?: () => void | null
}
export const StateContext = React.createContext<ContextType>({
  contract:null,
  provider:null,
  signer:null,
  // getAccount:null
});

export function StateContextProvider({ children }: { children: React.ReactNode }) {
  const [contract, setContract] = React.useState<ethers.Contract | null>(null)
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider | null>(null)
  const [signer, setSigner] = React.useState<ethers.providers.JsonRpcSigner | null >(null)

  async function getAccount() {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err: { code: number; }) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    const account = accounts[0];
    console.log("connected account",account);
  }

  React.useEffect(() => {
    console.log("Use effect from Provider")
    getAccount()
    const newProvider = new ethers.providers.Web3Provider(window.ethereum, )

    const newSigner = newProvider?.getSigner()
    setSigner(newSigner)
    setProvider(newProvider)

    const verifierContract = new ethers.Contract("0x37fbc86e0c055E775Eb3de2ef84BD3044F8D9a06", abi, newSigner)
    setContract(verifierContract)
    // }
    // verifierContract.baseURI()
  }, [])
  

  return (
    <StateContext.Provider value={
      {
        contract,
        provider,
        signer,
        // getAccount
      }
    }>
      {children}
    </StateContext.Provider>
  )
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      clientId="f627aa72d7690c9f3800594841b42767"
      // activeChain="sepolia"
      // supportedChains={[Sepolia]}
      supportedWallets={[
        metamaskWallet(),
      ]}
    >
      {/* <Navbar /> */}
      <StateContextProvider>
      {children}
      </StateContextProvider>
      
    </ThirdwebProvider>
  );
};