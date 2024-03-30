import { Link } from "react-router-dom";
import "../Css/Header.css";
const Navbar = (): JSX.Element => {
  return (
    <header className=" w-full p-2 text-center relative flex md:justify-center">
      <h1 className="text-indigo-900 font-bold text-3xl">BodaGlam</h1>
      <Link
        to="profile"
        className="bg-blue-600 p-1 rounded-md absolute right-3 top-3 min-w-20 text-white"
      >
        Perfil
      </Link>
    </header>
  );
};

export default Navbar;
