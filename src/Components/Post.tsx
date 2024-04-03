import { useEffect, useRef } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import useUserStore from "../Store/UserStore";
import EditModal from "../Modal/EditModal";
import { TypePost } from "../Types/types";
import useUserStorePost from "../Store/UserStorePost";
import { MagicMotion } from "react-magic-motion";
import PostNavigation from "../Store/UserNavigation";
import UseStateSocket from "../Store/useStateSocket";

const Post = (): JSX.Element => {
  const {
    dataPost,
    filterDataSearch,
    confirmDelete,
    setPost,
    setPostEdit,
    setFilterDataSearch,
    setConfirmDelete,
    openModal,
    openModalDelete,
    setOpenModal,
    setOpenModalDelete,
  } = useUserStore();
  const { emitir } = UseStateSocket();
  const { changeStatus, deletePost } = useUserStorePost();
  const { page, nextPageNavigation, prevPageNavigation } = PostNavigation();
  // const api = `${import.meta.env.VITE_HOST_API}/img/`;

  const statusAsignadoRef = useRef<boolean>(confirmDelete);

  const itemsPerPage = PostNavigation.getState().itemsPerPage;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filterDataSearch.length);

  const visibleItems = filterDataSearch.slice(startIndex, endIndex);

  useEffect(() => {
    statusAsignadoRef.current = confirmDelete;
  }, [confirmDelete]);

  const handleClickEdit = (item: TypePost) => {
    setPostEdit(item);
    setOpenModal(true);
  };

  const handleClickStatus = (id: string) => {
    setOpenModalDelete(true);
    setTimeout(() => {
      if (statusAsignadoRef.current) {
        changeStatus(id);
        const updateStatus: TypePost[] = dataPost.map((item) =>
          item.id === id ? { ...item, status: !item.status } : item
        );
        setPost(updateStatus);
        setFilterDataSearch(updateStatus);
        emitir("postStatusEmit", updateStatus);
        setConfirmDelete(false);
      }
    }, 5000);
  };

  const handleClickDetele = (id: string) => {
    setOpenModalDelete(true);
    setTimeout(() => {
      if (statusAsignadoRef.current) {
        deletePost(id);
        const newPost = dataPost.filter((item) => item.id !== id);
        setFilterDataSearch(newPost);
        setPost(newPost);
        emitir("deletePostEmit", newPost);
        setConfirmDelete(false);
      }
    }, 5000);
  };

  return (
    <>
      <div className=" py-4 overflow-x-auto w-full">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Options
                </th>
              </tr>
            </thead>
            <MagicMotion>
              <tbody>
                {visibleItems.map((iten) => (
                  <tr key={iten.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src={`${iten.imagen}`}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {iten.titulo}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {iten.author}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {iten.fecha}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {iten.tipo}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 cursor-pointer ${
                          iten.status ? "text-green-900" : "text-red-900"
                        } font-semibold  leading-tight`}
                        onClick={() => handleClickStatus(iten.id)}
                      >
                        <span
                          className={`absolute inset-0 ${
                            iten.status ? "bg-green-200" : "bg-red-200"
                          }  opacity-50 rounded-full`}
                        />
                        <span className="relative">
                          {JSON.stringify(iten.status)}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className=" flex gap-3 justify-evenly">
                        <button
                          className="flex h-10 w-9 justify-center items-center bg-blue-500 text-white p-2 rounded-lg"
                          onClick={() => handleClickEdit(iten)}
                        >
                          <i className="fa-solid fa-pencil text-base text-yellow-500" />
                        </button>
                        <button
                          className="text-white rounded-lg h-10 p-2 w-9 flex justify-center items-center bg-red-500"
                          onClick={() => handleClickDetele(iten.id)}
                        >
                          <i className="fa-solid bg-transparent text-base fa-trash rounded-l"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </MagicMotion>
          </table>
          {filterDataSearch.length > 7 && (
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing 1 to 6 of {filterDataSearch.length} Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0 gap-2">
                {page > 1 && (
                  <button
                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"
                    onClick={prevPageNavigation}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                )}

                {endIndex < filterDataSearch.length && (
                  <button
                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"
                    onClick={nextPageNavigation}
                    disabled={endIndex >= filterDataSearch.length}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {openModalDelete && <ConfirmModal />}
      {openModal && <EditModal />}
    </>
  );
};

export default Post;
