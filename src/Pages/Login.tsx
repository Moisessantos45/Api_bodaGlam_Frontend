import { useState } from "react";
import "../Css/StyleForm.css";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard/1");
  };

  return (
    <main className=" flex justify-center items-center main__content-form bg-white">
      <form
        className="relative space-y-1 sm:h-88 h-[60vh] rounded-md bg-white p-3 lg:p-10 margin sm:w-auto w-11/12 flex flex-col gap-2"
        onSubmit={handelSubmit}
      >
        <p className="sm:text-xl text-4xl font-bold lg:text-3xl gradient-text text-center p-2">
          Inciar sesion
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
