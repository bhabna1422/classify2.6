"use client";
import { t } from "@/utils";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { MdClose } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { HiOutlineUpload } from "react-icons/hi";
import toast from "react-hot-toast";
import { Tooltip } from "antd";

const ContentFour = ({
  uploadedImages,
  setUploadedImages,
  OtherImages,
  setOtherImages,
  handleImageSubmit,
  handleGoBack,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length == 0) {
      toast.error(t("wrongFile"));
    } else {
      setUploadedImages(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: false,
  });

  const removeImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const files = useMemo(
    () =>
      uploadedImages?.map((file, index) => (
        <div key={index} className="dropbox_img_div">
          <img
            className="dropbox_img"
            src={URL.createObjectURL(file)}
            alt={file.name}
          />
          <div className="dropbox_d">
            <button
              className="close_icon_cont img_upl_close"
              onClick={() => removeImage(index)}
            >
              <MdClose size={14} color="black" className="upd_img_rem_icon" />
            </button>
            <div className="dropbox_img_deatils">
              <span>{file.name}</span>
              <span>{Math.round(file.size / 1024)} KB</span>
            </div>
          </div>
        </div>
      )),
    [uploadedImages]
  );

  const onOtherDrop = useCallback(
    (acceptedFiles) => {
      const currentFilesCount = OtherImages.length; // Number of files already uploaded
      const remainingSlots = 5 - currentFilesCount; // How many more files can be uploaded

      if (remainingSlots === 0) {
        // Show error if the limit has been reached
        toast.error(t("imageLimitExceeded"));
        return;
      }

      if (acceptedFiles.length > remainingSlots) {
        // Show error if the number of new files exceeds the remaining slots
        toast.error(
          t("youCanUpload") + " " + remainingSlots + " " + t("moreImages")
        );
        return;
      }

      // Add the new files to the state
      setOtherImages((prevImages) => [...prevImages, ...acceptedFiles]);
    },
    [OtherImages]
  );

  const {
    getRootProps: getRootOtheProps,
    getInputProps: getInputOtherProps,
    isDragActive: isDragOtherActive,
  } = useDropzone({
    onDrop: onOtherDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: true,
  });

  const removeOtherImage = (index) => {
    setOtherImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const filesOther = useMemo(
    () =>
      OtherImages &&
      OtherImages?.map((file, index) => (
        <div key={index} className="dropbox_img_div multiple_images">
          <img
            className="dropbox_img"
            src={URL.createObjectURL(file)}
            alt={file.name}
          />
          <div className="dropbox_d">
            <button
              className="close_icon_cont img_upl_close"
              onClick={() => removeOtherImage(index)}
            >
              <MdClose size={14} color="black" className="upd_img_rem_icon" />
            </button>
            <div className="dropbox_img_deatils">
              <span>{file.name}</span>
              <span>{Math.round(file.size / 1024)} KB</span>
            </div>
          </div>
        </div>
      )),
    [OtherImages]
  );

  return (
    <>
      {/* main image upload  */}
      <div className="col-lg-6">
       
          <div className="picHeadDiv">
            <span className="picHeadline auth_label">{t("mainPicture")}</span>
            {/* FIX */}
            <Tooltip title={t("max")}>
              <span>
                <MdInfoOutline />
              </span>
            </Tooltip>
          </div>
          <div className="image-upload">
            <div
              className="dropbox"
              {...getRootProps()}
              style={{ display: uploadedImages.length > 0 ? "none" : "" }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <span>{t("dropFiles")}</span>
              ) : (
                <span className="img_text_wrap">
                  <span>{t("dragFiles")}</span>
                  <span className="or">{t("or")}</span>
                  <span className="upld_icon_text">
                    <HiOutlineUpload size={24} color="#00B2CA" />
                    <span className="imgUpload_text">{t("upload")}</span>
                  </span>
                </span>
              )}
            </div>
            <div>{files}</div>
          </div>
      </div>
      <div className="col-lg-6">
        <div className="picHeadDiv">
          <span className="picHeadline">{t("otherPicture")}</span>
          {/* FIX */}
          <Tooltip title="Max 12 Images">
            <span>
              <MdInfoOutline />
            </span>
          </Tooltip>
        </div>
        <div className="image-upload">
          <div
            className="dropbox"
            {...getRootOtheProps()}
            style={{ display: OtherImages.length >= 5 ? "none" : "" }}
          >
            <input {...getInputOtherProps()} />
            {isDragOtherActive ? (
              <span>{t("dropFiles")}</span>
            ) : (
              <span className="img_text_wrap">
                <span>{t("dragFiles")}</span>
                <span className="or">{t("or")}</span>
                <span className="upld_icon_text">
                  <HiOutlineUpload size={24} color="#00B2CA" />
                  <span className="imgUpload_text">{t("upload")}</span>
                </span>
              </span>
            )}
          </div>
          <div>{filesOther}</div>
        </div>
      </div>
      <div className="col-12">
        <div className="formBtns">
          <button className="backBtn" onClick={handleGoBack}>
            {t("back")}
          </button>
          <button className="nextBtn" onClick={handleImageSubmit}>
            {t("next")}
          </button>
        </div>
      </div>
    </>
  );
};

export default ContentFour;
