import { useEffect, useRef } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import useUserStore from "../Store/UserStore";
import EditModal from "../Modal/EditModal";

const Post = (): JSX.Element => {
  const {
    filterDataSearch,
    confirmDelete,
    setConfirmDelete,
    openModalDelete,
    setOpenModalDelete,
  } = useUserStore();
  const api = `${import.meta.env.VITE_HOST_API}/img/`;

  const statusAsignadoRef = useRef<boolean>(confirmDelete);

  useEffect(() => {
    statusAsignadoRef.current = confirmDelete;
  }, [confirmDelete]);

  const handleClickDetele = (id: string) => {
    setOpenModalDelete(true);
    setTimeout(() => {
      if (statusAsignadoRef.current) {
        console.log(id);
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
            <tbody>
              {filterDataSearch.map((iten) => (
                <tr key={iten.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={`${api}${iten.imagen}`}
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
                    {iten.status ? (
                      <>
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                          <span className="relative">
                            {JSON.stringify(iten.status)}
                          </span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                          <span className="absolute inset-0 bg-red-200 opacity-50 rounded-full" />
                          <span className="relative">
                            {" "}
                            {JSON.stringify(iten.status)}
                          </span>
                        </span>
                      </>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className=" flex gap-3 justify-evenly">
                      <button className="flex h-10 w-9 justify-center items-center bg-blue-500 text-white p-2 rounded-lg">
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
          </table>
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing 1 to 4 of 50 Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                Prev
              </button>
              &nbsp; &nbsp;
              <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModalDelete && <ConfirmModal />}
      {/* <EditModal/> */}
    </>
  );
};

export default Post;
