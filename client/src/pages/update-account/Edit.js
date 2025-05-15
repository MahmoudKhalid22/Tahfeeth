import React, { useContext, useEffect, useRef, useState } from "react";
import Spinner from "../../ui/utils/Spinner";
import styles from "./edit.module.css";
import ReactCrop, {
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import useCanvasPreview from "../../utils/useCanvasPreview";
import BadRequest from "../../ui/utils/BadRequest";
import { AuthContext } from "../../utils/context";
import { useAvatar, useUser } from "../../features/user/useUser";
import { useUpdateUsername } from "./useUpdateUsername";
import Cookies from "js-cookie";
import { useUpdatePassword } from "./useUpdatePassword";
import { useUploadAvatar } from "./useUploadAvatar";

const ASPECT_RATION = 1;
const MIN_DIMENSION = 150;

function Edit() {
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  // const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [modal, setModal] = useState(false);
  // IMAGE CROP
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [imgUrl, setImgUrl] = useState("");
  const [imgError, setImgError] = useState(false);
  const [chosed, setChosed] = useState(false);

  // PASSWORD
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // NAME
  const [username, setUsername] = useState("");

  const { isLogin } = useContext(AuthContext);

  const token = Cookies.get("accessToken");
  // GET USER DATA
  let { data } = useUser(token);
  data = data ? data[0] : null;
  // GET AVATAR
  let { avatar: userAvatar, avatarErr, isPendingAvatar } = useAvatar(token);

  // HANDLE UPDATE USERNAME
  const { isUpdating, mutate } = useUpdateUsername();
  // HANDLE UPDATE PASSWORD
  const { isPending: isUpdatingPassword, updatePassword } = useUpdatePassword();
  // HANDLE UPDATE USER AVATAR
  const { isUploadingAvatar, uploadAvatar } = useUploadAvatar();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUpdateUsername = (e) => {
    e.preventDefault();
    mutate({
      name: username,
      token: token,
    });
  };

  const hanldeUpdatePassword = (e) => {
    e.preventDefault();
    updatePassword({
      token: token,
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    // // console.log(isUpdatingPassword);
  };

  const handleUploadAvatar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);

    uploadAvatar({
      formData: formData,
      token: token,
    });

    setChosed(false);
  };

  const imageCropper = (src) => {
    const file = src;
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageEl = new Image();

      const imageUrl = reader.result?.toString() || "";
      imageEl.src = imageUrl;
      imageEl.addEventListener("load", (e) => {
        const { naturalHeight, naturalWidth } = e.currentTarget;
        setImgError(false);
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          setImgError(true);
          return setImgUrl("");
        }
      });

      setImgUrl(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        // You don't need to pass a complete crop into
        // makeAspectCrop or centerCrop.
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATION,
      width,
      height
    );

    // const s = centerCrop(crop, width, height);

    setCrop(crop);
  }

  if (!isLogin) {
    return <BadRequest />;
  }

  return (
    <>
      {modal && (
        <div className={styles.modal} onClick={() => setModal(false)}></div>
      )}
      <div className="absolute left-0 md:mr-8 w-full mb-[11.5rem] md:mb-0 md:w-[80%]  mt-12 flex justify-center flex-col gap-6 items-center">
        <h2 className="text-lg md:text-3xl font-semibold">المعلومات الشخصية</h2>
        <div className="flex flex-col items-center">
          <img
            src={userAvatar ? userAvatar : "/assets/dummyImage.jpg"}
            alt="user img"
            className="rounded-full w-40 h-40 object-cover"
          />
          {avatar && !imgError && (
            <>
              {chosed && (
                <div
                  className="absolute left-0 top-0 w-full h-screen bg-[#000000c0] "
                  onClick={() => setChosed(false)}
                ></div>
              )}
              {chosed && (
                <div className="flex flex-col items-center absolute  bg-slate-600 z-10">
                  <ReactCrop
                    src={URL.createObjectURL(avatar)}
                    crop={crop}
                    onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                    circularCrop
                    keepSelection
                    aspect={1}
                    minWidth={MIN_DIMENSION}
                  >
                    <img
                      ref={imgRef}
                      src={imgUrl}
                      alt="upload"
                      onLoad={onImageLoad}
                      className="w-full h-1/2"
                      style={{ maxHeight: "70vh" }}
                    />
                  </ReactCrop>
                </div>
              )}
              {chosed && (
                <button
                  className="z-10 bg-slate-300 py-2 px-4 mt-[27rem]"
                  onClick={() => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useCanvasPreview(
                      imgRef.current, // HTMLImageElement
                      previewCanvasRef.current, // HTMLCanvasElement
                      convertToPixelCrop(
                        crop,
                        imgRef.current.width,
                        imgRef.current.height
                      )
                    );
                    previewCanvasRef.current.toBlob(async (blob) => {
                      if (blob) {
                        const file = new File([blob], avatar.name, {
                          type: blob.type,
                        });
                        setAvatar(file);
                      }
                    }, "image/jpeg");
                  }}
                >
                  Crop
                </button>
              )}
            </>
          )}
          {crop && chosed && (
            <canvas
              ref={previewCanvasRef}
              className="mt-4 object-contain w-[150px] h-[150px] border border-slate-900 z-10"
            />
          )}

          {/* {error && (
            <p className="mx-auto text-center text-red-600 text-2xl">
              حدث بعض الخطأ
            </p>
          )} */}
          <div className="flex gap-6 text-2xl justify-center mt-6">
            <button
              className="bg-[#8A7A5F] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md px-4 py-2 "
              onClick={() => {
                handleUploadClick();
                setChosed(true);
              }}
            >
              تغيير الصورة
            </button>
          </div>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              imageCropper(e.target.files[0]);
            }}
          />
          {imgError && (
            <p className="text-red-500 text-md">
              Image must be 150 x 150 at least
            </p>
          )}
          {avatar && !imgError && chosed && (
            <>
              <form
                className="flex gap-4 items-center mt-6"
                onSubmit={handleUploadAvatar}
              >
                <p className="text-2xl font-semibold z-10 block relative bg-white py-2 px-4">
                  أنت اخترت: {avatar.name}
                </p>
                <button
                  type="submit"
                  className="bg-[#9F8565] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md p-2 z-10 text-lg"
                >
                  تأكيد
                </button>
              </form>
            </>
          )}
          {isUploadingAvatar && <Spinner />}
        </div>
        <form onSubmit={handleUpdateUsername}>
          {isUpdating ? (
            <Spinner />
          ) : (
            <h2 className="mx-auto text-2xl text-center mt-6 mb-6">
              {data?.name}
            </h2>
          )}

          <div className="flex items-center justify-center gap-4">
            <input
              type="text"
              placeholder="تغيير الاسم"
              className="rounded-md px-4 py-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#8A7A5F] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md px-4 py-2"
            >
              تغيير{" "}
            </button>
          </div>
        </form>
        <button
          className="bg-[#8A7A5F] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md px-4 py-2"
          onClick={() => setModal((prev) => !prev)}
        >
          تغيير كلمة السر
        </button>
        {modal && (
          <form
            onSubmit={hanldeUpdatePassword}
            className={`absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
           flex flex-col gap-8 bg-[#ececec] rounded-md py-12 px-4 z-20 w-[80%] md:w-[50%] xl:w-[32rem] items-start justify-start
           ${styles.form}
           
           `}
          >
            <div className="w-full flex flex-wrap items-center justify-center gap-2">
              <label>كلمة السر القديمة</label>
              <input
                className="w-full md:w-2/3 p-2 rounded-md"
                autoFocus
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-wrap items-center justify-center gap-2">
              <label>كلمة السر الجديدة</label>
              <input
                className="w-full md:w-2/3 p-2 rounded-md"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            {/* {loadingPass && <Spinner />} */}
            {/* {errPass && (
              <p className="text-center text-2xl text-red-600 mx-auto">
                {errPass}
              </p>
            )} */}

            <button
              type="submit"
              className="bg-[#8A7A5F] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md px-4 py-2 mx-auto"
              disabled={isUpdatingPassword}
            >
              {isUpdatingPassword ? "تحميل..." : "تأكيد"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Edit;
