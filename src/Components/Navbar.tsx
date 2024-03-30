import { Link, useNavigate } from "react-router-dom";
import "../Css/Header.css";
import { useState } from "react";
import useUserStore from "../Store/UserStore";

const Navbar = (): JSX.Element => {
  const { logoutUser } = useUserStore();
  const [profile, setProfile] = useState(false);

  const navigate = useNavigate();

  const handleProfile = () => {
    setProfile(!profile);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <header className=" w-full p-2 text-center relative flex md:justify-center">
      <h1 className="text-indigo-900 font-bold text-3xl">BodaGlam</h1>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ87ujTwkTXJCQjMYdykXuyDHOs2vitVA0BRQ&usqp=CAU"
        alt="logo"
        className="w-10 h-10 rounded-full right-3 top-2 absolute cursor-pointer"
        onClick={handleProfile}
      />
      <div
        className={`absolute right-2 top-full md:gap-2 gap-3 z-20 flex-col p-2 items-center justify-center bg-white rounded-md shadow-md ${
          profile ? "flex" : "hidden"
        } `}
      >
        <Link
          to="profile"
          className="bg-blue-600 p-1 rounded-md min-w-24 text-white text-sm"
        >
          <i className="fas fa-user text-sm"></i> Profile
        </Link>
        <button
          className="bg-blue-600 p-1 rounded-md min-w-24 text-white text-sm"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt text-sm"></i> Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
