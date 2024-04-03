import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../Store/UserStore";

const ChangePassword = (): JSX.Element => {
  const { retrievePassword } = useUserStore();
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await retrievePassword(token as string, password);
    navigate("/");
  };

  return (
    <main className=" w-full justify-center items-center flex h-[80vh] sm:h-[85vh] lg:h-[70vh] xl:h-[80vh]">
      <form
        className=" flex flex-col lg:w-4/12 md:w-6/12 w-10/12 gap-2"
        onSubmit={handleSubmit}
      >
        <h1 className="sm:text-xl text-4xl font-bold lg:text-3xl gradient-text text-center p-2">
          Retrieve password
        </h1>
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
          Recover
        </button>
      </form>
    </main>
  );
};

export default ChangePassword;
