import { Link } from "react-router-dom";
import "../Css/StyleForm.css";

const Register = (): JSX.Element => {
  return (
    <div className="m-5">
      <form className="relative space-y-3 max-w-screen-md mx-auto rounded-md p-6 lg:p-5 flex flex-col">
        <h1 className="mb-3 sm:text-xl text-4xl font-bold lg:text-3xl gradient-text flex h-10">
          Register
        </h1>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-neutral-700"> First Name </label>
            <input
              type="text"
              placeholder="Your Name"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label className="text-neutral-700"> Last Name </label>
            <input
              type="text"
              placeholder="Last  Name"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
        </div>
        <div>
          <label className="text-neutral-700"> Username </label>
          <input
            type="text"
            placeholder="Username"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
        </div>
        <div>
          <label className="text-neutral-700"> Email Address </label>
          <input
            type="email"
            placeholder="Info@example.com"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
        </div>
        <div>
          <label className="text-neutral-700"> Password </label>
          <input
            type="password"
            placeholder="******"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
        </div>
        <Link to="/" className="flex p-2">
          <p className="text-center text-blue-500">Already have an account?</p>
        </Link>
        <div>
          <button
            type="button"
            className="mt-8 w-full rounded-md bg-gradient-to-r from-violet-700 to-fuchsia-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
