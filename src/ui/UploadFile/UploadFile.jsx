import Icon from "./Icon";

import { fileToArrayBuffer } from "@/lib/helpers";
import generateFileSignatureMessage from "@/lib/util/generateFileSignatureMessage";

import { createOpenPopupTl, createClosePopupTl } from "@/lib/util/animations";

import gsap from "gsap";
import $ from "jquery";

import { useUser } from "@/modules/user/context/UserContext";

import { useSignMessage } from "wagmi";

import { encryptFile } from "@/lib/util/cryption";
import { uploadFiles } from "@/modules/files/api";

import { memo } from "react";

export default memo(function UploadFile({ onUpload }) {
  const { user } = useUser();

  const { signMessageAsync } = useSignMessage();

  const handleChange = async (event) => {
    const files = event.target.files;
    const file = files[0];
    const fileName = file.name;
    let finalFileName;
    const fileSize = file.size / (1024 * 1024); // convert bytes to megabytes
    let fileSizeRounded =
      fileSize > 1 ? fileSize.toFixed(2) : fileSize.toFixed(6);
    if (fileName.length > 32) {
      // max symbols of file name
      finalFileName = fileName.slice(0, 9) + " ... " + fileName.slice(-9);
    } else {
      finalFileName = fileName;
    }

    let successCloseTl = createClosePopupTl("success");

    let uploadProgressResetTl = gsap.timeline({ paused: true });
    uploadProgressResetTl.to(
      [
        "[data-upload-item]",
        "[data-upload-caption]",
        "[data-upload-dot]",
        "[data-upload-icon]",
      ],
      {
        opacity: 0,
        duration: 0.1,
      }
    );

    let errorSizeOpenTl = createOpenPopupTl(
      "error-size",
      uploadProgressResetTl
    );

    if (fileSize <= 10) {
      let successOpenTl = createOpenPopupTl("success", uploadProgressResetTl);
      let uploadCloseTl = createClosePopupTl("upload");
      let uploadProgressTl = gsap.timeline({ paused: true });
      let uploadItems = $("[data-upload-item]");
      let durations = [0.2, 0.25, 0.4, 0.5];
      uploadItems.each((index, _item) => {
        let randomIndex = Math.floor(Math.random() * durations.length);
        let curDuration = durations[randomIndex];
        let item = $(_item);
        let caption = item.find("[data-upload-caption]");
        let dots = item.find("[data-upload-dot]");
        let icon = item.find("[data-upload-icon]");
        uploadProgressTl
          .to(item, {
            opacity: 1,
            duration: curDuration,
          })
          .to(caption, {
            opacity: 0.5,
            duration: curDuration / 2,
          })
          .set(caption, {
            opacity: 1,
            delay: curDuration / 2,
          })
          .set(dots, {
            opacity: 1,
            stagger: {
              each: 0.1,
            },
          })
          .to(dots, {
            opacity: 0,
            delay: 0.15,
            duration: 0.05,
          })
          .to(
            icon,
            {
              opacity: 1,
              duration: curDuration,
            },
            "<"
          );
      });
      let uploadOpenTl = createOpenPopupTl("upload", uploadProgressTl);

      let errorSizeCloseTl = createClosePopupTl("error-size");
      let errorOpenTl = createOpenPopupTl("error", uploadProgressResetTl);
      let errorCloseTl = createClosePopupTl("error");

      $('[data-popup-overlay="error-size"]').on("click", function (e) {
        if (!errorSizeCloseTl.isActive()) {
          errorSizeCloseTl.restart();
        }
      });
      $('[data-popup-overlay="error"]').on("click", function (e) {
        if (!errorCloseTl.isActive()) {
          errorCloseTl.restart();
        }
      });
      $('[data-popup-overlay="success"]').on("click", function (e) {
        if (!successCloseTl.isActive()) {
          successCloseTl.restart();
        }
      });

      $("[data-file-size]").each(function (i, _el) {
        $(_el).text(fileSizeRounded);
      });
      $("[data-file-name]").each(function (i, _el) {
        $(_el).text(finalFileName);
      });

      // TODO validate files
      const formData = new FormData();
      const emcryptUid = new Date().getTime();
      const message = generateFileSignatureMessage(
        user.wallet.publicKey,
        emcryptUid
      );

      const signature = await signMessageAsync({
        message,
        account: user.wallet.publicKey,
      });

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const fileBuffer = await fileToArrayBuffer(file);
        const encryptedUint8Array = await encryptFile(fileBuffer, signature);
        const encryptedBlob = new Blob([encryptedUint8Array], {
          type: file.type,
        });
        console.log(encryptedBlob);
        uploadOpenTl.restart();
        formData.append(`files[${index}][encryptedBlob]`, encryptedBlob);
        formData.append(`files[${index}][originalName]`, file.name);
        formData.append(`files[${index}][encryptUid]`, emcryptUid);
        formData.append(`files[${index}][mimeType]`, file.type);
      }
      try {
        const files = await uploadFiles(formData);

        setTimeout(() => {
          uploadCloseTl.restart();
          successOpenTl.restart();

          onUpload(files[0]);

          setTimeout(() => {
            if (!successCloseTl.isActive()) {
              successCloseTl.restart();
            }
          }, 2000);
        }, uploadProgressTl.totalDuration() * 1000);
      } catch (error) {
        uploadCloseTl.restart();
        errorOpenTl.restart();
        console.error("Error uploading file: ", error);
      }
    } else {
      errorSizeOpenTl.restart();
    }
  };

  return user ? (
    <form className="upload-button_component">
      <input
        onChange={handleChange}
        id="fileInput"
        type="file"
        name="upload"
        className="upload-button_input"
      />
      <label htmlFor="fileInput" className="upload-button_label">
        <Icon />
        <div>Upload</div>
        <div className="upload-button_label_subcaption">
          Browse to choose a file
        </div>
      </label>
    </form>
  ) : null;
});
