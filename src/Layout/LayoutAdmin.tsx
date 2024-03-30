import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import useUserStore from "../Store/UserStore";
import { useEffect } from "react";
import Loading from "../Components/Loading";

const LayoutAdmin = () => {
  const { dataUser, getDataUserandPost, loading } = useUserStore();
  useEffect(() => {
    try {
      const getDataUserAndPosts = async () => {
        await getDataUserandPost();
      };
      getDataUserAndPosts();
    } catch (error) {
      return;
    }
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <Navbar />
      {dataUser?.id && dataUser.active ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default LayoutAdmin;
