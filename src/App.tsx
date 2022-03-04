import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet(),
      getMathWallet(),
    ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button">
          <img src="/icons/close.svg" alt="" onClick={toggleMenu} />
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="candymachine-v2-boiler-mint-site-noFLP/public/logo.png" alt="" />
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
              Welcome
            </a>
          </li>
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              About Us
            </a>
          </li>
          <li>
            <a href="/#link3" onClick={toggleMenu}>
              NFT holder perks
            </a>
          </li>
          <li>
            <a href="/#link4" onClick={toggleMenu}>
              Minting FAQ
            </a>
          </li>
          <li>
            <div className="social-icons">
              <a href="https://twitter.com/cryptonautsla" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              <a href="https://discord.gg/DNZdMY4dzg" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/discord.svg" alt="" />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo.png" alt="" />
          <a className="hide-800" href="/#link1">
            Welcome
          </a>
          <a className="hide-800" href="/#link2">
            About Us
          </a>
          <a className="hide-800" href="/#link3">
            NFT Holder Perks
          </a>
          <a className="hide-800" href="/#link4">
            Minting FAQ
          </a>
          <div className="social-icons hide-800">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <header className="card" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            <h3 className="text-secondary-color">Save the metaverse</h3>
            <h1 className="pb-3">Become a Cryptonaut</h1>
            <p className="text-secondary-color">
              Congrats, you have gained access to Cryptonauts minting site. Make sure your phantom wallet is loaded with SOL.
              If you need help with the minting process please refer to our minting FAQ above.
            </p>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletDialogProvider>
                    <Minter
                      candyMachineId={candyMachineId}
                      connection={connection}
                      startDate={startDateSeed}
                      txTimeout={txTimeout}
                      rpcHost={rpcHost}
                    />
                  </WalletDialogProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ThemeProvider>
          </div>
        </header>

        <div id="link2" className="container">
          The Cryptonauts are the first team of multiverse heroes to save the metaverse
        </div>

        <div id="link3" className="container card">
          <h1 className="pb-3">
            Everyone who mints a Cryptonaut will receive:
            A FREE Cryptonauts hoodie, abiltiy to resell your nft on MagicEden, 10% of all profit from the launch redistributed to all minters.
          </h1>
        </div>

        <div id="link4" className="container faq">
          <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
          <div>
            <h4>Funding your Phantom wallet</h4>
            <p>
              You can purchase SOL directly in your phantom wallet, however, to avoid fees we recommend
              signing up or signing into your coinbase account, purchasing 1 SOL, and sending it to your phantom wallet address.
              From there you will be able to mint a Cryptonaut. 
            </p>

            <hr />
          </div>

          <div>
            <h4>Minting on your phone</h4>
            <p>
              You will not be able to mint directly from the safari, instead, download the phantom wallet app from the app store, 
              sign up or log in to your phantom wallet, ensure you have 1 SOL, from there, click on the globe in the
              bottom right corner of your screen. Type cryptonauts.zone in the search bar, click connect, select your wallet,
              verify, and then you are all set, click mint and you have yourself a Cryptonaut in your wallet!
            </p>

            <hr />
          </div>

          <div>
            <h4>Minting on PC</h4>
            <p>
              We recommend chrome for this process, first, ensure you have the phantom wallet extension downloaded, sign up or log in to your phantom wallet, 
              ensure you have 1 SOL, from there search www.cryptonauts.zone in your search bar, if you are not automatically prompted
              to connect your phantom wallet, click on connect, follow the phantom extensions prompts, once connected you will be redirected
              to our site, from there you are all set, click mint and you have yourself a Cryptonaut in your wallet!
            </p>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

