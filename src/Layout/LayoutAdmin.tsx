import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import useUserStore from "../Store/UserStore";
import { useEffect } from "react";
import Loading from "../Components/Loading";
import UseStateSocket from "../Store/useStateSocket";

const LayoutAdmin = (): JSX.Element => {
  const { dataUser, getDataUserandPost, loading } = useUserStore();
  const { connect } = UseStateSocket();
  useEffect(() => {
    try {
      const getDataUserAndPosts = async () => {
        await getDataUserandPost();
        connect();
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
