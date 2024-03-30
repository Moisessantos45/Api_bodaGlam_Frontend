import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import useUserStore from "../Store/UserStore";
import { useEffect } from "react";

const LayoutAdmin = () => {
  const { getDataUserandPost } = useUserStore();
  useEffect(() => {
    try {
      const getDataUserAndPosts = async () => {
        await getDataUserandPost();
      };
      getDataUserAndPosts();
    } catch (error) {
      return;
    }
  });
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default LayoutAdmin;
