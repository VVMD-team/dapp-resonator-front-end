"use client";

import { useEffect, useState } from "react";

import { defaultDuration } from "@/lib/constants";

import gsap from "gsap";
import $ from "jquery";

import { createOpenPopupTl, createClosePopupTl } from "@/lib/util/animations";

import SplitType from "split-type";

import WalletConnection from "@/modules/wallet/components/WalletConnection";

import { walletTypes } from "@/lib/constants";

import { checkAuth } from "@/modules/auth/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isRenderContent, setIsRenderContent] = useState(true);
  const router = useRouter();

  /*seEffect(() => {
    const a = async () => {
      const authenticated = await checkAuth();

      if (authenticated) {
        router.replace("/");
      } else {
        setIsRenderContent(true);
      }
    };

    a();
  }, [router, authenticated]);*/

  useEffect(() => {
    if (!isRenderContent) return;

    let errorWalletCloseTl = createClosePopupTl("error-wallet");
    let errorConnectionCloseTl = createClosePopupTl("error-connection");
    $('[data-popup-overlay="error-wallet"]').on("click", function (e) {
      if (!errorWalletCloseTl.isActive()) {
        errorWalletCloseTl.restart();
      }
    });
    $('[data-popup-overlay="error-connection"]').on("click", function (e) {
      if (!errorConnectionCloseTl.isActive()) {
        errorConnectionCloseTl.restart();
      }
    });
  }, [isRenderContent]);

  useEffect(() => {
    if (!isRenderContent) return;

    $(function () {
      gsap.defaults({
        duration: defaultDuration,
      });
      // text split
      let splitText;
      $("[data-split-text]").each(function (i, _el) {
        let elTypes = $(_el).data("types") || "lines, words, chars";
        let elTagName = $(_el).data("tag") || "span";
        splitText = new SplitType(_el, {
          types: elTypes,
          tagName: elTagName,
        });
      });
      //search/filtering on files - search pages
      if ($("#search").length) {
        $("#search").on("input", function () {
          let searchValue = $(this).val().toLowerCase();
          let searchChars = searchValue
            .split(" ")
            .filter((char) => char !== "");
          let isAnyVisible = false;
          $("[data-search-field]").each(function () {
            let textContent = $(this).text().toLowerCase();
            let wrapper = $(this).closest("[data-search-field-wrapper]");
            let matches = searchChars.some((char) =>
              textContent.includes(char)
            );
            if (!matches && searchValue !== "") {
              gsap.set(wrapper, { display: "none" });
            } else {
              gsap.set(wrapper, { display: "flex" });
              isAnyVisible = true;
            }
          });
          if (!isAnyVisible && searchValue !== "") {
            $("#box-files-container").addClass("is-empty");
          } else {
            $("#box-files-container").removeClass("is-empty");
          }
        });
      }
      // add/create box - box page
      if ($("#add-box").length) {
        let createBoxOpenTl = createOpenPopupTl("create-box");
        let createBoxCloseTl = createClosePopupTl("create-box");
        $("#add-box").on("click", function () {
          createBoxOpenTl.restart();
        });
        $(
          '[data-popup-overlay="create-box"], [data-popup-close="create-box"]'
        ).on("click", function () {
          if (!createBoxCloseTl.isActive()) {
            createBoxCloseTl.restart();
          }
        });
      }
    });

    $(function () {
      gsap.to("#connect-dash", {
        opacity: 0,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
      gsap.set("#connect-text .char", { display: "none" });
      gsap.set("#connect-text", { display: "block" });
      $("#loader-end-trigger").on("click", function () {
        gsap.to("#connect-text .char", {
          delay: 0.25,
          display: "inline-block",
          stagger: {
            delay: 0.075,
            each: 0.075,
          },
        });
      });
      gsap.set("[data-popup-item]", {
        x: 10,
        opacity: 0,
      });
      let popupInTl = gsap.timeline({ paused: true });
      popupInTl
        .to("#connect-text .char", {
          display: "none",
          stagger: {
            delay: 0.075,
            each: 0.075,
            from: "end",
          },
        })
        .to("#connect-button", {
          opacity: 0,
        })
        .set("#login-popup", { zIndex: 2 })
        .to("#login-popup", {
          delay: 0.25,
          opacity: 1,
        })
        .to(
          "[data-popup-item]",
          {
            x: 0,
            opacity: 1,
            duration: defaultDuration / 2,
            stagger: {
              delay: defaultDuration / 2,
              each: defaultDuration / 2,
            },
          },
          "<50%"
        );
      $("#connect-button").on("click", function () {
        popupInTl.play();
      });
    });

    $(function () {
      gsap.to("#connect-dash", {
        opacity: 0,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
      gsap.set("#connect-text .char", { display: "none" });
      gsap.set("#connect-text", { display: "block" });
      gsap.to("#connect-text .char", {
        delay: 0.25,
        display: "inline-block",
        stagger: {
          delay: 0.075,
          each: 0.075,
        },
      });
      gsap.set("[data-popup-item]", {
        x: 10,
        opacity: 0,
      });
      let popupInTl = gsap.timeline({ paused: true });
      popupInTl
        .to("#connect-text .char", {
          display: "none",
          stagger: {
            delay: 0.075,
            each: 0.075,
            from: "end",
          },
        })
        .to("#connect-button", {
          opacity: 0,
        })
        .set("#login-popup", { zIndex: 2 })
        .to("#login-popup", {
          delay: 0.25,
          opacity: 1,
        })
        .to(
          "[data-popup-item]",
          {
            x: 0,
            opacity: 1,
            duration: defaultDuration / 2,
            stagger: {
              delay: defaultDuration / 2,
              each: defaultDuration / 2,
            },
          },
          "<50%"
        );
      $("#connect-button").on("click", function () {
        popupInTl.play();
      });
    });
  }, [isRenderContent]);

  return isRenderContent ? (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <div className="login_component">
          <div className="login_content">
            <div className="login_connect">
              <div className="login_connect_background"></div>
              <button
                type="button"
                id="connect-button"
                className="login_connect_button"
              >
                <div className="login_connect_button_inner">
                  <div id="connect-text" data-split-text="" data-types="chars">
                    Connect
                  </div>
                  <div id="connect-dash">_</div>
                </div>
              </button>
            </div>

            <div id="login-popup" className="login_popup">
              <div className="login_popup_background"></div>
              <div className="login_popup_content">
                <WalletConnection
                  title="MetaMask"
                  walletType={walletTypes.METAMASK}
                  buttonId="metaMaskButton"
                  sourceSrcSet="https://cdn.prod.website-files.com/6718fd0cca76b8cb98982ac7/6724baa95b08694e6b9d99d3_meta-mask.webp"
                />
                {/* <WalletConnection
                  title="Trust Wallet"
                  walletType={walletTypes.TRUST_WALLET}
                  buttonId="trustWalletButton"
                  sourceSrcSet="https://cdn.prod.website-files.com/6718fd0cca76b8cb98982ac7/671a5fe7df5af840aa818268_trust-wallet.webp"
                />
                <WalletConnection
                  title="Rabby Wallet"
                  walletType={walletTypes.RABBY_WALLET}
                  buttonId="rabbyWalletButton"
                  sourceSrcSet="https://cdn.prod.website-files.com/6718fd0cca76b8cb98982ac7/671a5fe3b269b7ad860f1b69_rabby-wallet.webp"
                /> */}
              </div>
            </div>

            <video
              loop={true}
              autoPlay={true}
              playsInline={true}
              muted={true}
              className="login_background"
            >
              <source
                src="https://s3.us-east-1.amazonaws.com/assets.vvmd.team/resonator/assets/login-background%40compressed.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div data-popup="error-wallet" className="popup_component">
          <div
            data-popup-overlay="error-wallet"
            className="popup_overlay"
          ></div>
          <div data-popup-content="error-wallet" className="popup_content">
            <div className="error_component">
              <div className="error_icon"></div>
              <div className="text-style-muted">
                Oops, you don&#x27;t have wallet app
              </div>
              <div className="text-style-muted">
                Please install the wallet app to continue
              </div>
            </div>
          </div>
        </div>
        <div data-popup="error-connection" className="popup_component">
          <div
            data-popup-overlay="error-connection"
            className="popup_overlay"
          ></div>
          <div data-popup-content="error-connection" className="popup_content">
            <div className="error_component">
              <div className="error_icon"></div>
              <div className="text-style-muted">
                Oops, you don&#x27;t have a wallet connected
              </div>
              <div className="text-style-muted">
                Please connect your wallet to continue
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  ) : null;
}
