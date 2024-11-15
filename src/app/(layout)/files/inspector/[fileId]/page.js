"use client";

import {
  getFileById,
  shareFile,
  transferFile,
  deleteFile,
} from "@/modules/files/api";

import { useRouter } from "next/navigation";

import { decryptFile } from "@/lib/util/cryption";
import { downloadFile } from "@/lib/util/downloadFile";

import { byteToMegabyte, timestampToDate } from "@/lib/helpers";

import { useParams, redirect } from "next/navigation";

import { useEffect, useState } from "react";

import Loader from "@/ui/Loader/Loader";
import ButtonIcon from "@/modules/files/components/icons/ButtonIcon";
import PopupCloseIcon from "@/modules/files/components/icons/PopupCloseIcon";

import Link from "next/link";

export default function FileInspectorPage() {
  const params = useParams();
  const router = useRouter();

  const [file, setFile] = useState(null);

  useEffect(() => {
    getFileById(params.fileId)
      .then((file) => {
        console.log(file);
        setFile(file);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleShareFile = async (shareWalletPublicKey, file) => {
    const { fileBase64, sharedKey } = await decryptFile(file);
    shareFile(shareWalletPublicKey, file.id, fileBase64, sharedKey).then(
      (res) => {
        // if (!res.ok) {
        //   sharedTransferErrorOpenTl.restart();
        // } else {
        //   sharedSuccessOpenTl.restart();
        // }
      }
    );
  };

  const handleTransferFile = async (transferWalletPublicKey, file) => {
    const { fileBase64, sharedKey } = await decryptFile(file);

    transferFile(transferWalletPublicKey, file.id, fileBase64, sharedKey).then(
      (res) => {
        // if (!res.ok) {
        //   sharedTransferErrorOpenTl.restart();
        // } else {
        //   sharedSuccessOpenTl.restart();
        // }
      }
    );
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
    if (file) {
      await downloadFile(file);
    } else {
      console.error("File not found");
    }
  };

  return (
    <div className="page-wrapper">
      
      <Loader />

      <main className="main-wrapper">
        <header className="header_component">
          <button id="history-back" onClick={() => router.back()} onClickclassName="header_back">
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
                className="inspector_icon"
              ></div>
              <h1 data-field-content="file-name" className="inspector_heading">
                {file?.name ? file.name : "-"}
              </h1>
              <div className="inspector_info">
                <div className="inspector_info_row">
                  <span>Kind: </span>
                  <span> </span>
                  <span data-field-content="file-type">
                    {file?.mimetype ? file.mimetype : "-"}
                  </span>
                </div>
                <div className="inspector_info_row">
                  <span>Size: </span>
                  <span> </span>
                  <span data-field-content="file-size">
                    {file?.size ? byteToMegabyte(file.size) : "-"}
                  </span>
                  <span> Mb</span>
                </div>
                <div className="inspector_info_row">
                  <span>Uploaded: </span>
                  <span> </span>
                  <span data-field-content="file-date">
                    {file?.createdAt ? timestampToDate(file.createdAt) : "-"}
                  </span>
                </div>
              </div>
            </div>
            <div id="action-buttons" className="inspector_buttons">
              <button
                type="button"
                id="step-1-share-button"
                className="button is-inspector"
                onClick={handleShareFile}
              >
                Share
              </button>
              <button
                type="button"
                id="step-1-transfer-button"
                className="button is-inspector"
                onClick={handleTransferFile}
              >
                Transfer
              </button>
              <button
                type="button"
                id="burn-button"
                className="button is-inspector"
                onClick={handleDeleteFile}
              >
                Burn
              </button>
              <button
                onClick={handleDownloadFile}
                type="button"
                id="download-button"
                className="button is-only-icon is-inspector"
              >
                <ButtonIcon />
                <div className="hide">Download file</div>
              </button>
            </div>
          </div>
        </div>
        <div data-popup="step-1-share" className="popup_component">
          <div
            data-popup-overlay="step-1-share"
            className="popup_overlay"
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
              <div
                data-field-content="file-name"
                className="text-weight-medium"
              >
                image.png
              </div>
              <div className="popup_share_button">
                <button
                  type="button"
                  id="step-2-share-button"
                  className="button"
                >
                  <span>Share</span>
                  <span>to...</span>
                </button>
              </div>
            </div>
            <button
              type="button"
              data-popup-close="step-1-share"
              className="popup_close"
            >
              <PopupCloseIcon />
            </button>
          </div>
        </div>
        <div data-popup="step-1-transfer" className="popup_component">
          <div
            data-popup-overlay="step-1-transfer"
            className="popup_overlay"
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
              <div
                data-field-content="file-name"
                className="text-weight-medium"
              >
                image.png
              </div>
              <div className="popup_share_button">
                <button
                  type="button"
                  id="step-2-transfer-button"
                  className="button"
                >
                  <span>Transfer </span>
                  <span>to...</span>
                </button>
              </div>
            </div>
            <button
              type="button"
              data-popup-close="step-1-transfer"
              className="popup_close"
            >
              <PopupCloseIcon />
            </button>
          </div>
        </div>
        <div data-popup="step-2-share" className="popup_component">
          <div
            data-popup-overlay="step-2-share"
            className="popup_overlay"
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
              <div
                data-field-content="file-name"
                className="text-weight-medium"
              >
                image.png
              </div>
              <div className="popup_transfer">
                <input
                  type="text"
                  placeholder="Contact address"
                  id="share-input"
                  className="form_input"
                />
                <button button="submit" id="share-button" className="button">
                  Share
                </button>
              </div>
            </div>
            <button
              type="button"
              data-popup-close="step-2-share"
              className="popup_close"
            >
              <PopupCloseIcon />
            </button>
          </div>
        </div>
        <div data-popup="step-2-transfer" className="popup_component">
          <div
            data-popup-overlay="step-2-transfer"
            className="popup_overlay"
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
              <div
                data-field-content="file-name"
                className="text-weight-medium"
              >
                image.png
              </div>
              <div className="popup_transfer">
                <input
                  type="text"
                  placeholder="Contact address"
                  id="transfer-input"
                  className="form_input"
                />
                <button button="submit" id="transfer-button" className="button">
                  Transfer
                </button>
              </div>
            </div>
            <button
              type="button"
              data-popup-close="step-2-transfer"
              className="popup_close"
            >
              <PopupCloseIcon />
            </button>
          </div>
        </div>
        <div data-popup="burn" className="popup_component">
          <div data-popup-overlay="burn" className="popup_overlay"></div>
          <div data-popup-content="burn" className="popup_content">
            <h2 className="popup_heading">
              <span>Burn </span>
              <span data-field-content="file-name"></span>
              <span>?</span>
            </h2>
            <div className="popup_burn_text">This action cannot be undone.</div>
            <div className="popup_burn">
              <button type="button" id="confirm-burn-button" className="button">
                Confirm
              </button>
            </div>
            <button
              type="button"
              data-popup-close="burn"
              className="popup_close"
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
          ></div>
          <div data-popup-content="success-shared" className="popup_content">
            <div className="success_component">
              <div className="success_icon"></div>
              <div
                data-field-content="file-name"
                data-file-name=""
                className="text-style-muted"
              >
                file-name.png
              </div>
              <div className="text-style-muted">Successfully shared</div>
            </div>
          </div>
        </div>
        <div data-popup="success-transfered" className="popup_component">
          <div
            data-popup-overlay="success-transfered"
            className="popup_overlay"
          ></div>
          <div
            data-popup-content="success-transfered"
            className="popup_content"
          >
            <div className="success_component">
              <div className="success_icon"></div>
              <div
                data-field-content="file-name"
                data-file-name=""
                className="text-style-muted"
              >
                file-name.png
              </div>
              <div className="text-style-muted">Successfully transfered</div>
            </div>
          </div>
        </div>
        <div data-popup="error" className="popup_component">
          <div data-popup-overlay="error" className="popup_overlay"></div>
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
