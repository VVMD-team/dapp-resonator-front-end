"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppKitAccount } from "@reown/appkit/react";

import Link from "next/link";

import {
  getAllFiles,
  getFileById,
  getLasUploadedFiles,
} from "@/modules/files/api";
import { getAllBoxes } from "@/modules/box/api";

import { shortenWalletAddress } from "@/lib/helpers";

import Loader from "@/ui/Loader/Loader";
import Search from "@/ui/Search/Search";
import UploadFile from "@/ui/UploadFile/UploadFile";
import ListItem from "@/ui/ListItem/ListItem";
import { getRsnBalance } from "@/modules/user/api";

export default function Home() {
  const { address } = useAppKitAccount();

  const [files, setFiles] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);

  const onUpload = useCallback((file) => {
    setFiles((prevFiles) => [
      { item: file, id: file.id, type: "file" },
      ...prevFiles,
    ]);
  }, []);

  const loadAllBoxes = async () => {
    const { boxes } = await getAllBoxes();

    if (!boxes) return;

    setBoxes(boxes.map((box) => ({ item: box, id: box.id, type: "box" })));
  };

  const loadAllFiles = async () => {
    const files = await getAllFiles();

    if (!files) return;

    const fileDetailsPromises = files.map((file) =>
      getFileById(file.id).then((fileDetails) => ({
        fileDetails,
        fileId: file.id,
      }))
    );

    const fileDetailsWithIds = await Promise.all(fileDetailsPromises);

    setFiles(
      fileDetailsWithIds.map(({ fileDetails, fileId }) => ({
        item: fileDetails,
        id: fileId,
        type: "file",
      }))
    );
  };

  const loadLastFourFiles = async () => {
    const files = await getLasUploadedFiles();
    if (!files) return;

    const fileDetailsPromises = files.map((file) =>
      getFileById(file.id).then((fileDetails) => ({
        fileDetails,
        fileId: file.id,
      }))
    );

    const fileDetailsWithIds = await Promise.all(fileDetailsPromises);

    setFiles(
      fileDetailsWithIds.map(({ fileDetails, fileId }) => ({
        item: fileDetails,
        id: fileId,
        type: "file",
      }))
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const a = async () => {
      if (window.innerWidth > 767) {
        await Promise.all([loadAllBoxes(), loadAllFiles()]);
      } else {
        await loadLastFourFiles();
      }
    };

    a();

    getRsnBalance().then((res) => {
      setAccountBalance(res);
    });
  }, []);

  return (
    <div className="page-wrapper">
      <Loader />
      <main className="main-wrapper">
        <header className="header_component">
          <Link href="/" aria-current="page" className="header_logo">
            <img
              src="images/logo.svg"
              loading="lazy"
              alt="Resonator logotype"
              className="header_logo_image"
            />
          </Link>
          <Link href="/account" className="header_account">
            <div className="header_account_avatar">
              <img
                src="images/logo-square.svg"
                loading="lazy"
                alt="Resonator logotype"
                className="header_account_image"
              />
            </div>
            <div id="account-id" className="header_account_caption">
              {shortenWalletAddress(address) || "xxxx...xxx"}
            </div>
          </Link>
          <div className="header_amount">
            <img
              src="images/amount-icon.svg"
              loading="lazy"
              alt="three white circles are placed in the shape of a triangle"
              className="header_balance_icon"
            />
            <div id="balance-amount" className="header_balance_amount">
              {accountBalance}
            </div>
            <div className="header_balance_units">RSN</div>
          </div>
        </header>
        <div className="content_component">
          <div className="nav_component">
            <Link href="/" aria-current="page" className="nav_item is-current">
              <img
                src="images/home.png"
                loading="lazy"
                alt="A white house on a black background."
                className="nav_icon"
              />
              <span className="hide">Home</span>
            </Link>
            <Link href="files/all" className="nav_item">
              <img
                src="images/copy.png"
                loading="lazy"
                alt="A black and white photo of a book."
                className="nav_icon"
              />
              <span className="hide">All Files</span>
            </Link>
            <button type="button" className="nav_item">
              <img
                src="images/hands.png"
                loading="lazy"
                alt="A black and white image of a hand shaking another hand."
                className="nav_icon"
              />
              <div className="nav_item_tooltip">Coming soon</div>
            </button>
            <button type="button" className="nav_item">
              <img
                src="images/arrows.png"
                loading="lazy"
                alt="A black and white photo of an arrow."
                className="nav_icon"
              />
              <div className="nav_item_tooltip">Coming soon</div>
            </button>
          </div>
          <div className="board_component">
            <h1 className="board_heading">Home</h1>
            <div className="board_content">
              <div className="board_controls">
                <Search />
                <UploadFile onUpload={onUpload} />
              </div>
              <div className="board_files">
                <div className="board_files_header">
                  <h2 className="board_files_heading">
                    <span className="board_files_heading_text is-desktop">
                      All files
                    </span>
                    <span className="board_files_heading_text is-mobile">
                      Recent
                    </span>
                  </h2>
                  <div className="board_files_header_line"></div>
                  <Link href="files/all" className="board_files_see-all">
                    See all
                  </Link>
                </div>
                <div id="box-files-container" className="board_files_list">
                  {boxes.map(({ item, id, type }) => (
                    <ListItem item={item} id={id} type={type} key={id} />
                  ))}
                  {files.map(({ item, id, type }) => (
                    <ListItem item={item} id={id} type={type} key={id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div data-popup="upload" className="popup_component">
            <div data-popup-overlay="upload" className="popup_overlay"></div>
            <div data-popup-content="upload" className="popup_content">
              <div className="upload-progress_component">
                <div data-upload-item="" className="upload-progress_item">
                  <div
                    data-upload-caption=""
                    className="upload-progress_item_caption"
                  >
                    Encrypting
                  </div>
                  <div className="upload-progress_item_dots">
                    <span
                      data-upload-dot="1"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                    <span
                      data-upload-dot="2"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                    <span
                      data-upload-dot="3"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                  </div>
                  <div
                    data-upload-icon=""
                    className="upload-progress_item_icon"
                  ></div>
                </div>
                <div data-upload-item="" className="upload-progress_item">
                  <div
                    data-upload-caption=""
                    className="upload-progress_item_caption"
                  >
                    Sharding
                  </div>
                  <div className="upload-progress_item_dots">
                    <span
                      data-upload-dot="1"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                    <span
                      data-upload-dot="2"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                    <span
                      data-upload-dot="3"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                  </div>
                  <div
                    data-upload-icon=""
                    className="upload-progress_item_icon"
                  ></div>
                </div>
                <div data-upload-item="" className="upload-progress_item">
                  <div
                    data-upload-caption=""
                    className="upload-progress_item_caption"
                  >
                    Sign transaction
                  </div>
                  <div className="upload-progress_item_dots">
                    <span
                      data-upload-dot="1"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                    <span
                      data-upload-dot="2"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                    <span
                      data-upload-dot="3"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                  </div>
                  <div
                    data-upload-icon=""
                    className="upload-progress_item_icon"
                  ></div>
                </div>
                <div data-upload-item="" className="upload-progress_item">
                  <div
                    data-upload-caption=""
                    className="upload-progress_item_caption"
                  >
                    Uploading
                  </div>
                  <div className="upload-progress_item_dots">
                    <span
                      data-upload-dot="1"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                    <span
                      data-upload-dot="2"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                    <span
                      data-upload-dot="3"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                  </div>
                  <div
                    data-upload-icon=""
                    className="upload-progress_item_icon"
                  ></div>
                </div>
                <div data-upload-item="" className="upload-progress_item">
                  <div
                    data-upload-caption=""
                    className="upload-progress_item_caption"
                  >
                    Hash received
                  </div>
                  <div className="upload-progress_item_dots">
                    <span
                      data-upload-dot="1"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                    <span
                      data-upload-dot="2"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                    <span
                      data-upload-dot="3"
                      className="upload-progress_item_dot"
                    >
                      .
                    </span>
                  </div>
                  <div
                    data-upload-icon=""
                    className="upload-progress_item_icon"
                  ></div>
                </div>
              </div>
              <div className="popup_content_footer">
                <div data-file-name="">File.png</div>
                <div className="text-style-muted">
                  <span data-file-size="upload">0</span>
                  <span>mb</span>
                </div>
              </div>
            </div>
          </div>
          <div data-popup="success" className="popup_component">
            <div data-popup-overlay="success" className="popup_overlay"></div>
            <div data-popup-content="success" className="popup_content">
              <div className="success_component">
                <div className="success_icon"></div>
                <div
                  data-field-content="file-name"
                  data-file-name=""
                  className="text-style-muted"
                >
                  file-name.png
                </div>
                <div className="text-style-muted">Successfully uploaded</div>
              </div>
            </div>
          </div>
          <div data-popup="error-size" className="popup_component">
            <div
              data-popup-overlay="error-size"
              className="popup_overlay"
            ></div>
            <div data-popup-content="error-size" className="popup_content">
              <div className="error_component">
                <div className="error_icon"></div>
                <div className="text-style-muted">
                  Currently, a maximum file size is limited to 10 MB.
                </div>
                <div className="text-style-muted">
                  Please try a smaller file.
                </div>
              </div>
            </div>
          </div>
          <div data-popup="error" className="popup_component">
            <div data-popup-overlay="error" className="popup_overlay"></div>
            <div data-popup-content="error" className="popup_content">
              <div className="error_component">
                <div className="error_icon"></div>
                <div className="text-style-muted">Something went wrong.</div>
                <div className="text-style-muted">Please try again later.</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
