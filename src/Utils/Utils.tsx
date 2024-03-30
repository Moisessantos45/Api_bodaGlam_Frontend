import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const toatifySuccess = (message: string, status: boolean) => {
  Toastify({
    text: `${message}`,
    duration: 3000,
    newWindow: true,
    // close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: status
        ? "linear-gradient(to right, #00b09b, #96c93d)"
        : "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
      borderRadius: "10px",
    },
  }).showToast();
};

const uploadAvatar = async (file: File): Promise<string> => {
  const presset = import.meta.env.VITE_PRESSET_API;
  const name = import.meta.env.VITE_NAME_API;
  try {
    const api = `https://api.cloudinary.com/v1_1/${name}/image/upload`;
    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("upload_preset", presset);
    const response = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const responseData = response.data ? response.data.secure_url : "";
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      toatifySuccess(error.message, false);
      return "";
    }
  }
  return "";
};

export { uploadAvatar };

export default toatifySuccess;
