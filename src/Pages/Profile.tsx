import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../Store/UserStore";
import { uploadAvatar } from "../Utils/Utils";
import ConfirmModal from "../Modal/ConfirmModal";

const Profile = (): JSX.Element => {
  const {
    dataUser,
    updateUser,
    confirmDelete,
    openModalDelete,
    setConfirmDelete,
    setOpenModalDelete,
    deleteAccount,
  } = useUserStore();
  const [avatarRender, setAvatarRender] = useState<string>(dataUser.avatar);
  const [nameUser, setNameUser] = useState<string>(dataUser.nameUser);
  const [email, setEmail] = useState<string>(dataUser.email);
  const [password, setPassword] = useState<string>("");
  const [profile, setProfile] = useState<File | null>(null);

  const navigate = useNavigate();

  const statusAsignadoRef = useRef<boolean>(confirmDelete);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const render = URL.createObjectURL(file);
      setProfile(file);
      setAvatarRender(render);
    }
  };

  const handleClickChangeAvatar = (): void => {
    setProfile(null);
    setAvatarRender(dataUser.avatar);
  };

  useEffect(() => {
    statusAsignadoRef.current = confirmDelete;
  }, [confirmDelete]);

  const handleClickDelete = async (id: string) => {
    setOpenModalDelete(true);
    setTimeout(async () => {
      if (statusAsignadoRef.current) {
        await deleteAccount(id);
        setConfirmDelete(false);
        navigate("/");
      }
    }, 5000);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    let avatar = "";
    if (profile !== null) {
      avatar = await uploadAvatar(profile);
    }
    updateUser(dataUser.id, {
      nameUser,
      email,
      password,
      avatar,
    });
  };
  return (
    <>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] justify-center ">
        <main className="w-full min-h-screen py-1 md:w-10/12 lg:w-3/4">
          <div className="p-2 md:p-4 relative flex justify-center">
            <form
              className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg"
              onSubmit={handleSubmit}
            >
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                Public Profile
              </h2>
              <Link
                to={`/dashboard/${dataUser.id}`}
                className=" absolute right-1 min-w-14 min-h-5 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 flex justify-center items-center"
              >
                <i className="fas fa-arrow-left text-xl"></i>
              </Link>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={avatarRender}
                    alt="Bordered avatar"
                  />
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <label
                      htmlFor="file-input"
                      className="py-2 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Foto perfil
                    </label>
                    <input
                      type="file"
                      name="foto"
                      className="hidden"
                      id="file-input"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      className="py-2 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                      onClick={handleClickChangeAvatar}
                    >
                      Delete picture
                    </button>
                  </div>
                </div>
                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your first name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your first name"
                        value={nameUser}
                        onChange={(e) => setNameUser(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6 flex justify-end">
                    <button
                      type="button"
                      className="py-2 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-red-900 rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                      onClick={() => handleClickDelete(dataUser.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
      {openModalDelete && <ConfirmModal message="to delete your account" />}
    </>
  );
};

export default Profile;
