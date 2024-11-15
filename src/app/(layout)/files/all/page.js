"use client";

import { getRsnBalance } from "@/modules/user/api";
import Link from "next/link";
import { getAllBoxes } from "@/modules/box/api";

import Loader from "@/ui/Loader/Loader";
import Search from "@/ui/Search/Search";
import { getAllFiles, getFileById } from "@/modules/files/api";
import UploadFile from "@/ui/UploadFile/UploadFile";
import ListItem from "@/ui/ListItem/ListItem";
import { shortenWalletAddress } from "@/lib/helpers";

import PlusIcon from "../../../../ui/UploadFile/PlusIcon";

import { useEffect, useState, useCallback } from "react";
import { useAppKitAccount } from "@reown/appkit/react";

export default function AllFilesPage() {
  const { address } = useAppKitAccount();

  const [accountBalance, setAccountBalance] = useState(0);
  const [boxName, setBoxName] = useState("");

  const [files, setFiles] = useState([]);
  const [boxes, setBoxes] = useState([]);

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

  const createBox = async () => {
    createBox(boxName).then((res) => {
      loadAllBoxes();
    });
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
    <div class="page-wrapper">
      <Loader />

      <main class="main-wrapper">
        <header class="header_component">
          <Link href="/" class="header_logo">
            <img
              src="../images/logo.svg"
              loading="lazy"
              alt="Resonator logotype"
              class="header_logo_image"
            />
          </Link>
          <Link href="/account" class="header_account">
            <div class="header_account_avatar">
              <img
                src="../images/logo-square.svg"
                loading="lazy"
                alt="Resonator logotype"
                class="header_account_image"
              />
            </div>
            <div id="account-id" class="header_account_caption">
              {shortenWalletAddress(address) || "xxxx...xxx"}
            </div>
          </Link>
          <div class="header_amount">
            <img
              src="../images/amount-icon.svg"
              loading="lazy"
              alt="three white circles are placed in the shape of a triangle"
              class="header_balance_icon"
            />
            <div id="balance-amount" class="header_balance_amount">
              {accountBalance}
            </div>
            <div class="header_balance_units">RSN</div>
          </div>
        </header>
        <div class="content_component">
          <div class="nav_component">
            <Link href="/" class="nav_item">
              <img
                src="../images/home.png"
                loading="lazy"
                alt="A white house on a black background."
                class="nav_icon"
              />
              <span class="hide">Home</span>
            </Link>
            <Link
              href="/files/all"
              aria-current="page"
              class="nav_item is-current"
            >
              <img
                src="../images/copy.png"
                loading="lazy"
                alt="A black and white photo of a book."
                class="nav_icon"
              />
              <span class="hide">All Files</span>
            </Link>
            <button type="button" class="nav_item">
              <img
                src="../images/hands.png"
                loading="lazy"
                alt="A black and white image of a hand shaking another hand."
                class="nav_icon"
              />
              <div class="nav_item_tooltip">Coming soon</div>
            </button>
            <button type="button" class="nav_item">
              <img
                src="../images/arrows.png"
                loading="lazy"
                alt="A black and white photo of an arrow."
                class="nav_icon"
              />
              <div class="nav_item_tooltip">Coming soon</div>
            </button>
          </div>
          <div className="board_component">
            <h1 className="board_heading">All files</h1>
            <div className="board_content">
              <div className="board_controls is-small-gap-on-mobile">
                <Search />
                <div className="board_controls_row">
                  <UploadFile onUpload={onUpload} />
                  <button
                    type="button"
                    id="add-box"
                    className="add-box_component"
                  >
                    <PlusIcon />
                    <div>+ Box</div>
                  </button>
                </div>
              </div>
              <div class="board_files">
                <div class="board_files_header">
                  <h2 class="board_files_heading">
                    <span class="board_files_heading_text">Name</span>
                  </h2>
                </div>
                <div id="box-files-container" class="board_files_list">
                  {boxes.map(({ item, id, type }) => (
                    <ListItem item={item} id={id} type={type} />
                  ))}
                  {files.map(({ item, id, type }) => (
                    <ListItem item={item} id={id} type={type} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div data-popup="upload" class="popup_component">
            <div data-popup-overlay="upload" class="popup_overlay"></div>
            <div data-popup-content="upload" class="popup_content">
              <div class="upload-progress_component">
                <div data-upload-item="" class="upload-progress_item">
                  <div
                    data-upload-caption=""
                    class="upload-progress_item_caption"
                  >
                    Encrypting
                  </div>
                  <div class="upload-progress_item_dots">
                    <span data-upload-dot="1" class="upload-progress_item_dot">
                      .
                    </span>
                    <span data-upload-dot="2" class="upload-progress_item_dot">
                      .
                    </span>
                    <span data-upload-dot="3" class="upload-progress_item_dot">
                      .
                    </span>
                  </div>
                  <div
                    data-upload-icon=""
                    class="upload-progress_item_icon"
                  ></div>
                </div>
                <div data-upload-item="" class="upload-progress_item">
                  <div
                    data-upload-caption=""
                    class="upload-progress_item_caption"
                  >
                    Sharding
                  </div>
                  <div class="upload-progress_item_dots">
                    <span data-upload-dot="1" class="upload-progress_item_dot">
                      .
                    </span>
                    <span data-upload-dot="2" class="upload-progress_item_dot">
                      .
                    </span>
                    <span data-upload-dot="3" class="upload-progress_item_dot">
                      .
                    </span>
                  </div>
                  <div
                    data-upload-icon=""
                    class="upload-progress_item_icon"
                  ></div>
                </div>
                <div data-upload-item="" class="upload-progress_item">
                  <div
                    data-upload-caption=""
                    class="upload-progress_item_caption"
                  >
                    Sign transaction
                  </div>
                  <div class="upload-progress_item_dots">
                    <span data-upload-dot="1" class="upload-progress_item_dot">
                      .
                    </span>
                    <span data-upload-dot="2" class="upload-progress_item_dot">
                      .
                    </span>
                    <span data-upload-dot="3" class="upload-progress_item_dot">
                      .
                    </span>
                  </div>
                  <div
                    data-upload-icon=""
                    class="upload-progress_item_icon"
                  ></div>
                </div>
                <div data-upload-item="" class="upload-progress_item">
                  <div
                    data-upload-caption=""
                    class="upload-progress_item_caption"
                  >
                    Uploading
                  </div>
                  <div class="upload-progress_item_dots">
                    <span data-upload-dot="1" class="upload-progress_item_dot">
                      .
                    </span>
                    <span data-upload-dot="2" class="upload-progress_item_dot">
                      .
                    </span>
                    <span data-upload-dot="3" class="upload-progress_item_dot">
                      .
                    </span>
                  </div>
                  <div
                    data-upload-icon=""
                    class="upload-progress_item_icon"
                  ></div>
                </div>
                <div data-upload-item="" class="upload-progress_item">
                  <div
                    data-upload-caption=""
                    class="upload-progress_item_caption"
                  >
                    Hash received
                  </div>
                  <div class="upload-progress_item_dots">
                    <span data-upload-dot="1" class="upload-progress_item_dot">
                      .
                    </span>
                    <span data-upload-dot="2" class="upload-progress_item_dot">
                      .
                    </span>
                    <span data-upload-dot="3" class="upload-progress_item_dot">
                      .
                    </span>
                  </div>
                  <div
                    data-upload-icon=""
                    class="upload-progress_item_icon"
                  ></div>
                </div>
              </div>
              <div class="popup_content_footer">
                <div data-file-name="">File.png</div>
                <div class="text-style-muted">
                  <span data-file-size="upload">0</span>
                  <span>mb</span>
                </div>
              </div>
            </div>
          </div>
          <div data-popup="success" class="popup_component">
            <div data-popup-overlay="success" class="popup_overlay"></div>
            <div data-popup-content="success" class="popup_content">
              <div class="success_component">
                <div class="success_icon"></div>
                <div
                  data-field-content="file-name"
                  data-file-name=""
                  class="text-style-muted"
                >
                  file-name.png
                </div>
                <div class="text-style-muted">Successfully uploaded</div>
              </div>
            </div>
          </div>
          <div data-popup="error-size" class="popup_component">
            <div data-popup-overlay="error-size" class="popup_overlay"></div>
            <div data-popup-content="error-size" class="popup_content">
              <div class="error_component">
                <div class="error_icon"></div>
                <div class="text-style-muted">
                  Currently, a maximum file size is limited to 10 MB.
                </div>
                <div class="text-style-muted">Please try a smaller file.</div>
              </div>
            </div>
          </div>
          <div data-popup="error" class="popup_component">
            <div data-popup-overlay="error" class="popup_overlay"></div>
            <div data-popup-content="error" class="popup_content">
              <div class="error_component">
                <div class="error_icon"></div>
                <div class="text-style-muted">Something went wrong.</div>
                <div class="text-style-muted">Please try again later.</div>
              </div>
            </div>
          </div>
        </div>
        <div data-popup="create-box" class="popup_component">
          <div data-popup-overlay="create-box" class="popup_overlay"></div>
          <div data-popup-content="create-box" class="popup_content">
            <h2 class="popup_heading">New Box</h2>
            <div class="create-box_component">
              <input
                onChange={(e) => setBoxName(e.value)}
                value={boxName}
                type="text"
                placeholder="Name"
                id="boxNameInput"
                maxlength="50"
                class="form_input"
              />
              <button
                type="button"
                id="createBox"
                class="button"
                onClick={createBox}
              >
                Create
              </button>
            </div>
            <button
              type="button"
              data-popup-close="create-box"
              class="popup_close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewbox="0 0 18 18"
                fill="none"
                class="popup_close_icon"
              >
                <path
                  d="M17.1768 16.6651L17.3536 16.4883L17.1768 16.3116L9.86521 9L17.1768 1.68843L17.3536 1.51165L17.1768 1.33488L16.6651 0.823223L16.4883 0.646446L16.3116 0.823223L9 8.13479L1.68843 0.823223L1.51165 0.646447L1.33488 0.823223L0.823223 1.33488L0.646447 1.51165L0.823223 1.68843L8.13479 9L0.823223 16.3116L0.646447 16.4883L0.823223 16.6651L1.33488 17.1768L1.51165 17.3536L1.68843 17.1768L9 9.86521L16.3116 17.1768L16.4883 17.3536L16.6651 17.1768L17.1768 16.6651Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="0.5"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
