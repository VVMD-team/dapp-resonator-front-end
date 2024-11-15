"use client";

import gsap from "gsap";

import {
    getBoxById
} from "@/modules/box/api";

import { useRouter } from "next/navigation";

import { downloadFile } from "@/lib/util/downloadFile";

import {
  byteToMegabyte,
  timestampToDate,
} from "@/lib/helpers";

import { useParams, redirect } from "next/navigation";

import { useEffect, useState, useRef } from "react";

import Loader from "@/ui/Loader/Loader";
import { createOpenPopupTl, createClosePopupTl } from "@/lib/util/animations";
import ButtonIcon from "@/modules/files/components/icons/ButtonIcon";
import PopupCloseIcon from "@/modules/files/components/icons/PopupCloseIcon";

import Link from "next/link";


const isBoxTransferedOrShared = (boxType) => {
    return boxType === 'transfered' || boxType === 'shared'
  }

export default function BoxInspectorPage() {
  const params = useParams();
  const router = useRouter();

  const [box, setBox] = useState(null);

  let resetDownloadProgressTlRef = useRef();
  let downloadProgressTlRef = useRef();

  let stepOneShareFileOpenTlRef = useRef(); 
  let stepOneShareFileCloseTlRef = useRef();
  let stepTwoTransferFileOpenTlRef = useRef();
  let stepTwoTransferFileCloseTlRef = useRef();
  let burnFilePopupOpenTlRef = useRef();
  let burnFilePopupCloseTlRef = useRef();
  let stepOneTransferFileOpenTlRef = useRef();
  let stepOneTransferFileCloseTlRef = useRef();
  let stepTwoShareFileOpenTlRef = useRef();
  let stepTwoShareFileCloseTlRef = useRef();
  let successSharedOpenTlRef = useRef();
  let successSharedCloseTlRef = useRef();
  let successTransferOpenTlRef = useRef();
  let successTransferCloseTlRef = useRef();
  let errorPopupOpenTlRef = useRef();
  let errorPopupCloseTlRef = useRef();
  

  useEffect(() => {
    getBoxById(params.boxId)
      .then((box) => {
        setBox(box);
      })
      .catch((error) => {
        console.log(error);
      });


      stepTwoTransferFileOpenTlRef.current = createOpenPopupTl("step-2-transfer");
      stepTwoTransferFileCloseTlRef.current = createClosePopupTl("step-2-transfer");
      burnFilePopupOpenTlRef.current = createOpenPopupTl("burn");
      burnFilePopupCloseTlRef.current = createClosePopupTl("burn");
      stepOneTransferFileOpenTlRef.current = createOpenPopupTl("step-1-transfer");
      stepOneTransferFileCloseTlRef.current = createClosePopupTl("step-1-transfer");
      stepTwoShareFileOpenTlRef.current = createOpenPopupTl("step-2-share");
      stepTwoShareFileCloseTlRef.current = createClosePopupTl("step-2-share");
      successSharedOpenTlRef.current = createOpenPopupTl("success-shared");
      successSharedCloseTlRef.current = createClosePopupTl("success-shared");
      successTransferOpenTlRef.current = createOpenPopupTl("success-transfer");
      successTransferCloseTlRef.current = createClosePopupTl("success-transfer");
      errorPopupOpenTlRef.current = createOpenPopupTl("error");
      errorPopupCloseTlRef.current = createClosePopupTl("error");

      stepOneShareFileOpenTlRef.current = createOpenPopupTl("step-1-share");
      stepOneShareFileCloseTlRef.current = createClosePopupTl("step-1-share");

      resetDownloadProgressTlRef.current = gsap.timeline({ paused: true });
      resetDownloadProgressTlRef.current.to("#download-progress", {
        duration: 0.1,
        width: "0%",
        onComplete: () => {
          const el = document.getElementById("download-percentage");
          el.textContent = "01";
        },
      });
  }, []);

  useEffect(() => {
    if (!downloadProgressTlRef?.current) return;

    let percentageCounter = {
      value: 0,
    };
    
    let firstSteps = [15, 27, 33, 42]; // percentage
    let randomFirstStepIndex = Math.floor(Math.random() * firstSteps.length);
    let firstStep = firstSteps[randomFirstStepIndex];
    let secondSteps = [63, 75, 83, 89]; // percentage
    let randomSecondStepIndex = Math.floor(Math.random() * secondSteps.length);
    let secondStep = secondSteps[randomSecondStepIndex];
    let downloadDurations = [0.3, 0.4, 0.5, 0.6, 0.7]; // seconds
    let randomFirsStepDurationIndex = Math.floor(
      Math.random() * downloadDurations.length
    );
    let randomSecondStDurationIndex = Math.floor(
      Math.random() * downloadDurations.length
    );
    let randomThirdStepDurationIndex = Math.floor(
      Math.random() * downloadDurations.length
    );

    let firsStepDuration = downloadDurations[randomFirsStepDurationIndex];
    let secondStepDuration = downloadDurations[randomSecondStDurationIndex];
    let thirdStepDuration = downloadDurations[randomThirdStepDurationIndex];

    downloadProgressTlRef.current
    .to("#download-progress", {
      duration: firsStepDuration,
      width: `${firstStep}%`,
    })
    .to(
      percentageCounter,
      {
        duration: firsStepDuration,
        value: firstStep,
        onUpdate: () => {
          const el = document.getElementById("download-percentage");
          el.textContent = percentageCounter.value.toFixed(0);
        },
      },
      "<"
    )
    .to("#download-progress", {
      delay: secondStepDuration / 3,
      duration: secondStepDuration,
      width: `${secondStep}%`,
    })
    .to(
      percentageCounter,
      {
        duration: secondStepDuration,
        value: secondStep,
        onUpdate: () => {
          const el = document.getElementById("download-percentage");
          el.textContent = percentageCounter.value.toFixed(0);
        },
      },
      "<"
    )
    .to("#download-progress", {
      delay: thirdStepDuration / 3,
      duration: thirdStepDuration,
      width: "100%",
    })
    .to(
      percentageCounter,
      {
        duration: thirdStepDuration,
        value: 100,
        onUpdate: () => {
          const el = document.getElementById("download-percentage");
          el.textContent = percentageCounter.value.toFixed(0);
        },
      },
      "<"
    );

    downloadFilePopupOpenTlRef.current = createOpenPopupTl(
      "download",
      downloadProgressTlRef.current
    )
  }, [downloadProgressTlRef.current])


  useEffect(() => {
    if (!resetDownloadProgressTlRef?.current) return;
    
    downloadFilePopupCloseTlRef.current = createClosePopupTl(
      "download",
      resetDownloadProgressTlRef.current
    );

    downloadProgressTlRef.current = gsap.timeline({
      paused: true,
      ease: "none",
      onComplete: () => {
        if (!downloadFilePopupCloseTlRef.current.isActive()) {
          downloadFilePopupCloseTlRef.current.restart();
        }
      },
    });
  }, [resetDownloadProgressTlRef.current])

  const openStepOneShareFilePopup = async () => {
    stepOneShareFileOpenTlRef.current.restart();
  };

  const closeStepOneShareFilePopup = async () => {
    if (!stepOneShareFileCloseTlRef.current.isActive()) {
      stepOneShareFileCloseTlRef.current.restart();
    }
  };

  const openStepTwoShareFilePopup = async () => {
    stepTwoShareFileOpenTlRef.current.restart();
  };

  const closeStepTwoShareFilePopup = async () => {
    if (!stepTwoShareFileCloseTlRef.current.isActive()) {
      stepTwoShareFileCloseTlRef.current.restart();
    }
  };

  const openStepOneTransferFilePopup = async () => {
    stepOneTransferFileOpenTlRef.current.restart();
  };

  const closeStepOneTransferFilePopup = async () => {
    if (!stepOneTransferFileCloseTlRef.current.isActive()) {
      stepOneTransferFileCloseTlRef.current.restart();
    }
  };

  const openStepTwoTransferFilePopup = async () => {
    stepTwoTransferFileOpenTlRef.current.restart();
  };

  const closeStepTwoTransferFilePopup = async () => {
    if (!stepTwoTransferFileCloseTlRef.current.isActive()) {
      stepTwoTransferFileCloseTlRef.current.restart();
    }
  };


  const openBurnFilePopup = async () => {
    burnFilePopupOpenTlRef.current.restart();
  };

  const closeBurnFilePopup = async () => {
    if (!burnFilePopupCloseTlRef.current.isActive()) {
      burnFilePopupCloseTlRef.current.restart();
    }
  };

  const downloadFilePopupOpenTlRef = useRef();
  const downloadFilePopupCloseTlRef = useRef();

  const openDownloadFilePopup = async () => {
    downloadFilePopupOpenTlRef.current.restart();
  };

  const closeDownloadFilePopup = async () => {
    if (!downloadFilePopupCloseTl.isActive()) {
      downloadFilePopupCloseTl.restart();
    }
  };

  const openSuccessSharedPopup = async () => {
    successSharedOpenTlRef.current.restart();
  };

  const closeSuccessSharedPopup = async () => {
    if (!successSharedCloseTlRef.current.isActive()) {
      successSharedCloseTlRef.current.restart();
    }
  };


  const openSuccessTransferPopup = async () => {
    successTransferOpenTlRef.current.restart();
  };

  const closeSuccessTransferPopup = async () => {
    if (!successTransferCloseTlRef.current.isActive()) {
      successTransferCloseTlRef.current.restart();
    }
  };

  const openErrorPopup = async () => {
    errorPopupOpenTlRef.current.restart();
  };

  const closeErrorPopup = async () => {
    if (!errorPopupCloseTlRef.current.isActive()) {
      errorPopupCloseTlRef.current.restart();
    }
  };

  const handleShareFile = async (shareWalletPublicKey, file) => {
    // const { fileBase64, sharedKey } = await decryptFile(file);
    // shareFile(shareWalletPublicKey, file.id, fileBase64, sharedKey).then(
    //   (res) => {
    //     if (!res.ok) {
    //       sharedTransferErrorOpenTl.restart();
    //     } else {
    //       sharedSuccessOpenTl.restart();
    //     }
    //   }
    // );
  };

  const handleTransferFile = async (transferWalletPublicKey, file) => {
    // const { fileBase64, sharedKey } = await decryptFile(file);
    // transferFile(transferWalletPublicKey, file.id, fileBase64, sharedKey).then(
    //   (res) => {
    //     if (!res.ok) {
    //       sharedTransferErrorOpenTl.restart();
    //     } else {
    //       sharedSuccessOpenTl.restart();
    //     }
    //   }
    // );
  };

  const handleDeleteFile = async (fileId) => {
    deleteFile(fileId).then((result) => {
      if (!result) {
        console.error("Error deleting file");
        return;
      }

      redirect("/files/all");
    });
  };

  const handleDownloadFile = async () => {
    if (box) {
      await downloadFile(box);
    } else {
      console.error("File not found");
    }
  };

  return (
    <div className="page-wrapper">
      <Loader />

      <main className="main-wrapper">
        <header className="header_component">
          <button onClick={() => router.back()} className="header_back">
            &lt; Back
          </button>
        </header>
        <div className="content_component is-inspector-page">
          <div className="nav_component">
            <Link href="/" className="nav_item w-inline-block">
              <img
                src="../../images/home.png"
                loading="lazy"
                alt="A white house on a black background."
                className="nav_icon"
              />
              <span className="hide">Home</span>
            </Link>
            <Link href="/files/all" className="nav_item w-inline-block">
              <img
                src="../../images/copy.png"
                loading="lazy"
                alt="A black and white photo of a book."
                className="nav_icon"
              />
              <span className="hide">All Files</span>
            </Link>

            <button type="button" className="nav_item">
              <img
                src="../../images/hands.png"
                loading="lazy"
                alt="A black and white image of a hand shaking another hand."
                className="nav_icon"
              />
              <div className="nav_item_tooltip">Coming soon</div>
            </button>
            <button type="button" className="nav_item">
              <img
                src="../../images/arrows.png"
                loading="lazy"
                alt="A black and white photo of an arrow."
                className="nav_icon"
              />
              <div className="nav_item_tooltip">Coming soon</div>
            </button>
          </div>
          <div className="inspector_component">
            <div className="inspector_content">
              <div
                data-field-content="file-icon"
                className="inspector_icon is-box"
              ></div>
              <h1 className="inspector_heading">
                {box?.name ? box.name : "-"}
              </h1>
              <div className="inspector_info">
                <div className="inspector_info_row">
                  <span>Kind: </span>
                  <span> </span>
                  <span data-field-content="file-type">
                    Box
                  </span>
                </div>
                <div className="inspector_info_row">
                  <span>Size: </span>
                  <span> </span>
                  <span data-field-content="file-size">
                    {box?.size ? byteToMegabyte(box.size) : 0}
                  </span>
                  <span> Mb</span>
                </div>
                <div className="inspector_info_row">
                  <span>Created: </span>
                  <span> </span>
                  <span data-field-content="file-date">
                    {box?.createdAt ? timestampToDate(box.createdAt) : "-"}
                  </span>
                </div>
              </div>
            </div>
            {!isBoxTransferedOrShared(box.type) ? <div id="action-buttons" className="inspector_buttons">
              <button
                type="button"
                className="button is-inspector"
                onClick={openStepOneShareFilePopup}
              >
                Share
              </button>
              {/*<button
                type="button"
                className="button is-inspector"
                onClick={openStepOneTransferFilePopup}
              >
                Transfer
              </button>*/}
              <button
                type="button"
                className="button is-inspector"
                onClick={openBurnFilePopup}
              >
                Burn
              </button>
            </div> : <></>}
          </div>
        </div>
        <div data-popup="step-1-share" className="popup_component">
          <div
            data-popup-overlay="step-1-share"
            className="popup_overlay"
            onClick={closeStepOneShareFilePopup}
          ></div>
          <div data-popup-content="step-1-share" className="popup_content">
            <h2 className="popup_heading">
              <span>Share </span>
            </h2>
            <div className="popup_share">
              <div
                data-field-content="file-icon"
                className="popup_share_icon"
              ></div>
              <div className="text-weight-medium">
                {box?.name ? box.name : "-"}
              </div>
              <div className="popup_share_button">
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    openStepTwoShareFilePopup();
                    closeStepOneShareFilePopup();
                  }}
                >
                  Share to...
                </button>
              </div>
            </div>
            <button
              type="button"
              className="popup_close"
              onClick={closeStepOneShareFilePopup}
            >
              <PopupCloseIcon />
            </button>
          </div>
        </div>
        <div data-popup="step-1-transfer" className="popup_component">
          <div
            data-popup-overlay="step-1-transfer"
            className="popup_overlay"
            onClick={closeStepOneTransferFilePopup}
          ></div>
          <div data-popup-content="step-1-transfer" className="popup_content">
            <h2 className="popup_heading">
              <span>Transfer </span>
            </h2>
            <div className="popup_share">
              <div
                data-field-content="file-icon"
                className="popup_share_icon"
              ></div>
              <div className="text-weight-medium">
                {box?.name ? box.name : "-"}
              </div>
              <div className="popup_share_button">
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    openStepTwoTransferFilePopup();
                    closeStepOneTransferFilePopup();
                  }}
                >
                  Transfer to...
                </button>
              </div>
            </div>
            <button
              type="button"
              className="popup_close"
              onClick={closeStepOneTransferFilePopup}
            >
              <PopupCloseIcon />
            </button>
          </div>
        </div>
        <div data-popup="step-2-share" className="popup_component">
          <div
            data-popup-overlay="step-2-share"
            className="popup_overlay"
            onClick={closeStepTwoShareFilePopup}
          ></div>
          <div data-popup-content="step-2-share" className="popup_content">
            <div className="popup_heading">
              <span>Share</span>
            </div>
            <div className="popup_share">
              <div
                data-field-content="file-icon"
                className="popup_share_icon"
              ></div>
              <div className="text-weight-medium">
                {box?.name ? box.name : "-"}
              </div>
              <div className="popup_transfer">
                <input
                  type="text"
                  placeholder="Contact address"
                  id="share-input"
                  className="form_input"
                />
                <button
                  button="submit"
                  className="button"
                  onClick={handleShareFile}
                >
                  Share
                </button>
              </div>
            </div>
            <button
              type="button"
              className="popup_close"
              onClick={closeStepTwoShareFilePopup}
            >
              <PopupCloseIcon />
            </button>
          </div>
        </div>
        <div data-popup="step-2-transfer" className="popup_component">
          <div
            data-popup-overlay="step-2-transfer"
            className="popup_overlay"
            onClick={closeStepTwoTransferFilePopup}
          ></div>
          <div data-popup-content="step-2-transfer" className="popup_content">
            <div className="popup_heading">
              <span>Transfer</span>
            </div>
            <div className="popup_share">
              <div
                data-field-content="file-icon"
                className="popup_share_icon"
              ></div>
              <div className="text-weight-medium">
                {box?.name ? box.name : "-"}
              </div>
              <div className="popup_transfer">
                <input
                  type="text"
                  placeholder="Contact address"
                  id="transfer-input"
                  className="form_input"
                />
                <button
                  button="submit"
                  id="transfer-button"
                  className="button"
                  onClick={handleTransferFile}
                >
                  Transfer
                </button>
              </div>
            </div>
            <button
              type="button"
              className="popup_close"
              onClick={closeStepTwoTransferFilePopup}
            >
              <PopupCloseIcon />
            </button>
          </div>
        </div>
        <div data-popup="burn" className="popup_component">
          <div
            data-popup-overlay="burn"
            className="popup_overlay"
            onClick={closeBurnFilePopup}
          ></div>
          <div data-popup-content="burn" className="popup_content">
            <h2 className="popup_heading">
              <span>Burn </span>
              <span>{box?.name ? box.name : "-"}?</span>
            </h2>
            <div className="popup_burn_text">This action cannot be undone.</div>
            <div className="popup_burn">
              <button
                type="button"
                className="button"
                onClick={handleDeleteFile}
              >
                Confirm
              </button>
            </div>
            <button
              type="button"
              className="popup_close"
              onClick={closeBurnFilePopup}
            >
              <PopupCloseIcon />
            </button>
          </div>
        </div>
        <div data-popup="download" className="popup_component">
          <div data-popup-overlay="download" className="popup_overlay"></div>
          <div data-popup-content="download" className="popup_content">
            <h2 className="popup_heading is-download">
              <span>Saving</span>
              <span> </span>
              <span data-field-content="file-name"></span>
            </h2>
            <div className="popup_download">
              <div className="popup_download_progress">
                <div
                  id="download-progress"
                  className="popup_download_progress_inner"
                ></div>
              </div>
              <div className="text-style-muted">
                <span id="download-percentage">00</span>
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
        <div data-popup="success-shared" className="popup_component">
          <div
            data-popup-overlay="success-shared"
            className="popup_overlay"
            onClick={closeSuccessSharedPopup}
          ></div>
          <div data-popup-content="success-shared" className="popup_content">
            <div className="success_component">
              <div className="success_icon"></div>
              <div className="text-style-muted">
                {box?.name ? box.name : "-"}
              </div>
              <div className="text-style-muted">Successfully shared</div>
            </div>
          </div>
        </div>
        <div data-popup="success-transfer" className="popup_component">
          <div
            data-popup-overlay="success-transfer"
            className="popup_overlay"
            onClick={closeSuccessTransferPopup}
          ></div>
          <div data-popup-content="success-transfer" className="popup_content">
            <div className="success_component">
              <div className="success_icon"></div>
              <div className="text-style-muted">
                {box?.name ? box.name : "-"}
              </div>
              <div className="text-style-muted">Successfully transfered</div>
            </div>
          </div>
        </div>
        <div data-popup="error" className="popup_component">
          <div
            data-popup-overlay="error"
            className="popup_overlay"
            onClick={closeErrorPopup}
          ></div>
          <div data-popup-content="error" className="popup_content">
            <div className="error_component">
              <div className="error_icon"></div>
              <div className="text-style-muted">Oops, something went wrong</div>
              <div className="text-style-muted">
                This wallet is not registered or something went wrong
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
