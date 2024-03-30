import { Link, useNavigate } from "react-router-dom";
import "../Css/StyleForm.css";
import { useState } from "react";
import toatifySuccess from "../Utils/Utils";
import axios from "axios";
import UrlApi from "../Config/UrlApi";
import { uploadAvatar } from "../Utils/Utils";

const Register = (): JSX.Element => {
  const [avatarRender, setAvatarRender] = useState<string>("");
  const [nameUser, setNameUser] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profile, setProfile] = useState<File | null>(null);
  // const [avatar, setAvatar] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setProfile(file);
      const imgRender = URL.createObjectURL(file);
      setAvatarRender(imgRender);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const values: string[] = [email, password, nameUser];
    const verify = values.some((item) => item.trim() === "");
    if (verify) {
      return;
    }
    try {
      let avatar = "";
      if (profile !== null) {
        avatar = await uploadAvatar(profile);
      }
      await UrlApi.post("Users/register", {
        nameUser,
        password,
        email,
        avatar,
      });
      navigate(`/`);
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
        return;
      } else if (axios.isAxiosError(error)) {
        toatifySuccess(error.response?.data.msg, false);
        return;
      }
    }
  };
  return (
    <div className="m-5 py-5">
      <div className="lg:w-6/12 md:w-9/12 w-12/12 mx-auto rounded-md p-6 lg:p-1 lg:px-5">
        <h1 className="sm:text-xl text-4xl font-bold lg:text-3xl gradient-text flex h-10">
          Register
        </h1>
      </div>
      <form
        className="relative lg:w-6/12 md:w-9/12 w-12/12 mx-auto rounded-md p-6 lg:p-5 flex flex-col md:gap-4 lg:gap-1"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="text-neutral-700"> Username </label>
          <input
            type="text"
            placeholder="Username"
            value={nameUser}
            onChange={(e) => setNameUser(e.target.value)}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
        </div>
        <div>
          <label className="text-neutral-700"> Email Address </label>
          <input
            type="email"
            placeholder="Info@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
        </div>
        <div>
          <label className="text-neutral-700"> Password </label>
          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
        </div>
        <div className="w-full md:w-full px-3 mb-6">
          {avatarRender && (
            <img
              src={avatarRender}
              className="h-36 w-36 rounded-lg shadow-lg flex self-center m-auto"
            />
          )}
          <p className="text-sm text-neutral-700">
            Selecciona su foto de perfil
          </p>
          <div className=" p-2 mt-1 flex justify-center items-center w-full">
            <label
              htmlFor="file-input"
              className="text-white h-8 w-full outline-dotted flex justify-center items-center rounded-lg bg-indigo-600"
            >
              Foto perfil
            </label>
            <input
              type="file"
              name="foto"
              className="hidden"
              id="file-input"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <Link to="/" className="flex p-2 ml-auto">
          <p className="text-center text-blue-500">Already have an account?</p>
        </Link>
        <div>
          <button
            type="submit"
            className=" w-full rounded-md bg-gradient-to-r from-violet-700 to-fuchsia-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
