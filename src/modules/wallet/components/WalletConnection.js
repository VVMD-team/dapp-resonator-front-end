"use client";

import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";

import { authMessage } from "@/lib/constants";

import { useSignMessage } from "wagmi";

import { authByWallet } from "@/modules/auth/api";

import { useUser } from "@/modules/user/context/UserContext";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function WalletConnection({
  buttonId,
  sourceSrcSet,
  walletType,
  title,
}) {
  const router = useRouter();
  const { updateUser } = useUser();

  const { signMessageAsync } = useSignMessage();
  const { address, status } = useAppKitAccount();
  const { open } = useAppKit();

  const handleSignMessage = async () => {
    const hexSignature = await signMessageAsync({
      message: authMessage,
      account: address,
    });
    console.log(hexSignature);
    const user = await authByWallet(address, hexSignature, walletType);

    updateUser(user);

    router.push("/");
  };

  const handleAuthByWallet = async () => {
    if (!address) {
      await open();

      return;
    }
  };

  useEffect(() => {
    if (status === "connected" && address) {
      setTimeout(() => {
        handleSignMessage(address);
      }, 1000);
    }
  }, [status, address]);

  return (
    <button
      type="button"
      data-popup-item=""
      id={buttonId}
      className="login_popup_item"
      onClick={handleAuthByWallet}
    >
      <picture className="login_popup_item_icon">
        <source srcSet={sourceSrcSet} type="image/webp" />
        <img
          src="images/meta-mask.png"
          loading="lazy"
          alt="Meta Mask logo"
          className="login_popup_item_icon"
        />
      </picture>
      <div className="login_popup_item_caption">{title}</div>
    </button>
  );
}
