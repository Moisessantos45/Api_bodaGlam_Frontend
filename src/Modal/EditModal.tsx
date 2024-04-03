import { useEffect, useState } from "react";
import useUserStore from "../Store/UserStore";
import useUserStorePost from "../Store/UserStorePost";
import toatifySuccess, { uploadAvatar } from "../Utils/Utils";
import { TypePost } from "../Types/types";
import close from "../Img/cerrar.png";
import UseStateSocket from "../Store/useStateSocket";

const EditModal = () => {
  const {
    dataUser,
    dataPost,
    setPost,
    setFilterDataSearch,
    dataPosEdit,
    setPostEdit,
    setOpenModal,
  } = useUserStore();
  const { updatePost, addPost } = useUserStorePost();
  const { emitir } = UseStateSocket();
  const [tipo, setTipo] = useState<string>("");
  const [imgRender, setImgRender] = useState<File | null>(null);
  const [imagenRender, setImagenRender] = useState<string>("");
  const [descripcion, setdDscripcion] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (dataPosEdit?.id) {
      setAuthor(dataPosEdit.author);
      setTipo(dataPosEdit.tipo);
      setTitulo(dataPosEdit.titulo);
      setStatus(JSON.stringify(dataPosEdit.status));
      setdDscripcion(dataPosEdit.descripcion);
      setImagenRender(dataPosEdit.imagen);
      setId(dataPosEdit.id);
    }
  }, [dataPosEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const renderImg = URL.createObjectURL(file);
      setImgRender(file);
      setImagenRender(renderImg);
    }
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imagen = dataPosEdit.id ? dataPosEdit.imagen : "";
      const { idUser, ...rest } = {
        author,
        descripcion,
        imagen,
        status: JSON.parse(status),
        tipo,
        titulo,
        idUser: dataUser.id,
      };
      const verifyValues = Object.values(rest).some(
        (item) => JSON.stringify(item).trim() === ""
      );
      if (verifyValues === true) {
        toatifySuccess("All fields are required", false);
        return;
      }

      if (imgRender !== null) {
        imagen = await uploadAvatar(imgRender);
      }

      if (id) {
        const newPost: TypePost = await updatePost(id, { ...rest, imagen });
        const newPostUpdates: TypePost[] = dataPost.map((item) =>
          item.id === id ? newPost : item
        );
        setPost(newPostUpdates);
        setFilterDataSearch(newPostUpdates);
        emitir("updatePost", newPostUpdates);
      } else {
        const newPost: TypePost = await addPost({ ...rest, idUser, imagen });
        const newPostAdd = [...dataPost, newPost];
        setPost(newPostAdd);
        setFilterDataSearch(newPostAdd);
        emitir("newAddPost", newPostAdd);
      }
      setPostEdit({} as TypePost);
      setOpenModal(false);
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
  };

  const handleClickClose = () => {
    setOpenModal(false);
    setAuthor("");
    setTipo("");
    setTitulo("");
    setStatus("");
    setdDscripcion("");
    setImagenRender("");
    setId(null);
    setPostEdit({} as TypePost);
  };

  return (
    <section className="flex md:p-3 p-2 justify-center top-0 left-0 fixed h-screen w-full z-20">
      <form
        className="md:flex relative bg-white shadow-lg rounded-lg mx-2 md:w-7/12 lg:w-6/12 w-12/12 overflow-y-auto scrollbar items-start"
        onSubmit={handelSubmit}
      >
        <img
          src={close}
          alt=""
          className="absolute w-6 h-6 sm:top-2 sm:right-[4%] right-3 top-5 cursor-pointer"
          onClick={handleClickClose}
        />
        <div className="w-full p-4 px-5 py-2">
          <div className="flex flex-row text-center">
            <h4 className="text-2xl text-green-400 font-semibold">
              {id ? "Actualizar Post" : "Agregar Post"}
            </h4>
          </div>
          <div className="pb-1">
            <input
              type="text"
              className="border rounded h-10 w-full focus:outline-none text-gray-600 focus:text-slate-700 focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Title de post"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-4 md:gap-2">
            <input
              type="text"
              className="border rounded h-10 w-full text-gray-600 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm sm:col-start-1"
              placeholder="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
            <input
              type="text"
              className="border rounded sm:col-start-2 col-span-2 h-10 w-full text-gray-600 focus:text-slate-700  focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Nombre del author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-full text-gray-600 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm sm:col-start-4"
              placeholder="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="w-full mt-5">
            <textarea
              className="block h-36 py-2 px-3 w-full text-sm text-gray-600 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 focus:border-green-500 rounded-lg resize-none scrollbar"
              id="formInput1-9"
              placeholder="Lorem ipsum dolor sit amet"
              value={descripcion}
              onChange={(e) => setdDscripcion(e.target.value)}
            />
          </div>
          <div className="w-full md:w-full px-3 mt-3">
            {imagenRender !== "" && (
              <img
                src={imagenRender}
                className="h-24 w-24 rounded-full shadow-lg flex self-center m-auto bg-transparent object-cover"
              />
            )}
            <div className=" p-2 mt-1 flex justify-center items-center w-full">
              <label
                htmlFor="file-input"
                className="text-white h-8 w-10/12 outline-dotted flex justify-center items-center rounded-lg bg-indigo-600"
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
            </div>
          </div>
          <div className="flex justify-center items-center pt-2">
            <button
              type="submit"
              value="Actualizar el volumen"
              className="h-10 w-48 rounded font-medium text-xs bg-blue-500 text-white"
            >
              {id ? "Actualizar Post" : "Agregar Post"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditModal;
