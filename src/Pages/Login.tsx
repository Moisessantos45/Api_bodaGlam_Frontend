import { useState } from "react";
import "../Css/StyleForm.css";
import { Link, useNavigate } from "react-router-dom";
import toatifySuccess from "../Utils/Utils";
import axios from "axios";
import UrlApi from "../Config/UrlApi";
import useUserStore from "../Store/UserStore";

const Login = (): JSX.Element => {
  const { setUser, setLoading } = useUserStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await UrlApi.post("Users/login", {
        email,
        password,
      });
      const data = response.data ? response.data : {};
      setUser(data);
      localStorage.setItem("tokenUser", data.token);
      setLoading(true);
      navigate(`/dashboard/${data.id}`);
      toatifySuccess("Login successfully", true);
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      } else if (axios.isAxiosError(error)) {
        toatifySuccess(error.response?.data.msg, false);
      }
    }
  };

  return (
    <main className=" flex justify-center items-center main__content-form bg-white">
      <form
        className="relative space-y-1 sm:h-88 h-[60vh] rounded-md bg-white p-3 lg:p-10 margin sm:w-auto w-11/12 flex flex-col gap-2"
        onSubmit={handelSubmit}
      >
        <p className="sm:text-xl text-4xl font-bold lg:text-3xl gradient-text text-center p-2">
          Login
        </p>
        <div className="">
          <label className=" text-neutral-700"> Email Address </label>
          <input
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-10 w-full rounded-md text-gray-700 px-3 border border-slate-300 outline-none focus:ring"
          />
        </div>
        <div>
          <label className="text-neutral-700"> Password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-2 h-10 w-full rounded-md text-gray-700 px-3 border border-slate-300 outline-none focus:ring"
          />
        </div>
        <div className=" flex justify-evenly gap-2">
          <Link to="/register" className="text-center text-blue-500">
            Create an account
          </Link>
          <Link to="/change-password" className="text-center text-blue-500">
            Retrieve password
          </Link>
        </div>
        <button
          type="submit"
          className="mt-8 w-full rounded-md bg-gradient-to-r from-violet-700 to-fuchsia-600 p-2 text-center font-semibold text-white outline-none focus:ring"
        >
          Sign In
        </button>
      </form>
    </main>
  );
};

export default Login;
