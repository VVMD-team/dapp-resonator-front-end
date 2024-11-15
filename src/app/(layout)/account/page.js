"use client";

import {
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";

import Link from 'next/link';
import {shortenWalletAddress} from "@/lib/helpers"

import {
  getRsnBalance,
  getUserData
} from "@/modules/user/api";

import { redirect } from 'next/navigation'

import Loader from "@/ui/Loader/Loader";

import {byteToMegabyte} from "../../../lib/helpers";

import { useState, useEffect } from "react";

export default function AccountPage() {
  const { address } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  const [accountBalance, setAccountBalance] = useState(0);
  const [spaceUsed, setSpaceUsed] = useState(0);
  const [filesStore, setFilesStore] = useState(0);

  useEffect(() => {
    getRsnBalance().then((res) => {
      setAccountBalance(res);
    });

    getUserData().then(({numberOfFiles, totalSize}) => {
      setSpaceUsed(byteToMegabyte(totalSize));
      setFilesStore(numberOfFiles);
    })
  }, [])

  const handleDisconnect = async () => {
    await disconnect();
    redirect('/login');
  }

  return (
    <div class="page-wrapper">
    
    <Loader />

    <main class="main-wrapper">
      <header class="header_component is-vertical">
        <Link href="/" class="header_logo"><img src="images/logo.svg" loading="lazy"
            alt="Resonator logotype" class="header_logo_image"/></Link>
        <Link href="/account" aria-current="page" class="header_account is-vertical">
          <div class="header_account_avatar is-vertical"><img src="images/logo-square.svg" loading="lazy"
              alt="Resonator logotype" class="header_account_image"/></div>
          <div id="account-id" class="header_account_caption">{shortenWalletAddress(address) || 'xxxx...xxx'}</div>
        </Link>
        <div class="header_amount is-vertical"><img src="images/amount-icon.svg" loading="lazy"
            alt="three white circles are placed in the shape of a triangle" class="header_balance_icon"/>
          <div id="balance-amount" class="header_balance_amount">{accountBalance}</div>
          <div class="header_balance_units">RSN</div>
        </div>
      </header>
      <div class="content_component">
        <div class="nav_component">
          <Link href="/" class="nav_item"><img src="images/home.png" loading="lazy"
              alt="A white house on a black background." class="nav_icon"/><span class="hide">Home</span></Link>
          <Link href="files/all" class="nav_item"><img src="images/copy.png" loading="lazy"
              alt="A black and white photo of a book." class="nav_icon"/><span class="hide">All Files</span></Link><button type="button" class="nav_item"><img
              src="images/hands.png" loading="lazy" alt="A black and white image of a hand shaking another hand."
              class="nav_icon"/>
            <div class="nav_item_tooltip">Coming soon</div>
          </button><button type="button" class="nav_item"><img src="images/arrows.png" loading="lazy"
              alt="A black and white photo of an arrow." class="nav_icon"/>
            <div class="nav_item_tooltip">Coming soon</div>
          </button>
        </div>
        <div class="board_component">
          <h1 class="board_heading">Account</h1>
          <div class="account_component">
            <div class="account_header">
              <div class="account_header_top">
                <div class="account_header_item">
                  <div class="account_header_caption"><span id="total-size">{spaceUsed}</span><span
                      class="text-weight-light">mb</span></div>
                  <div>Space used</div>
                </div>
                <div class="account_header_item">
                  <div id="number-of-files" class="account_header_caption">{filesStore}</div>
                  <div>Files stored</div>
                </div>
              </div>
              <div class="account_header_button"><button type="button" id="logoutBtn" class="button">
                  <div onClick={handleDisconnect}>Disconnect</div>
                </button></div>
            </div>
            <div class="account_content">
              <div class="account_item">
                <div class="account_item_caption">
                  <div class="account_item_caption_text">
                    Support</div>
                  <div class="account_item_caption_line"></div>
                </div>
                <div class="account_item_text">
                  <div>
                    <Link href="http://t.me/resonator_help" rel="nofollow" target="_blank">Get help</Link>
                  </div>
                  <div>
                    <Link href="http://t.me/resonator_portal" rel="nofollow" target="_blank">Send feedback</Link>
                  </div>
                </div>
              </div>
              <div class="account_item">
                <div class="account_item_caption">
                  <div class="account_item_caption_text">
                    Resonator</div>
                  <div class="account_item_caption_line"></div>
                </div>
                <div class="account_item_text">
                  <div>dApp version 1.0a (changelog is coming soon)</div>
                  <div>
                    <Link href="/dapp-policy" target="_blank">Privacy Policy</Link>
                  </div>
                </div>
              </div>
              <div class="account_item">
                <div class="account_item_caption">
                  <div class="account_item_caption_text">
                    Support</div>
                  <div class="account_item_caption_line"></div>
                </div>
                <div class="account_item_text">
                  <div>
                    <Link href="/dapp-manual" target="_blank">Manual</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}
