import { useState } from "react";
import useUserStore from "../Store/UserStore";

const EditModal = () => {
  const { setOpenModal } = useUserStore();
  const [tipo, setTipo] = useState<string>("");
  const [imgRender, setImgRender] = useState<File | null>(null);
  const [imagenRender, setImagenRender] = useState<string>("");
  const [descripcion, setdDscripcion] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [id, setId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const renderImg = URL.createObjectURL(file);
      setImgRender(file);
      setImagenRender(renderImg);
      console.log(imgRender);
    }
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setId("1");
  };
  return (
    <section className="flex md:p-3 p-2 justify-center top-0 left-0 fixed h-screen w-full overflow-y-auto scrollbar">
      <div className="bg-white shadow-lg rounded-lg mx-2 md:w-7/12 lg:w-6/12 w-12/12">
        <form className="md:flex relative" onSubmit={handelSubmit}>
          <img
            src=""
            alt=""
            className="absolute w-6 h-6 sm:top-2 sm:right-[4%] right-3 top-5 cursor-pointer"
            onClick={() => setOpenModal(false)}
          />
          <div className="w-full p-4 px-5 py-5">
            <div className="flex flex-row text-center mt-3 mb-3">
              <h2 className="text-3xl text-green-400 font-semibold">
                {id ? "Actualizar Post" : "Agregar Post"}
              </h2>
            </div>
            <div className="relative pb-1">
              <input
                type="text"
                className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Tipo de post"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
            </div>
            <div className="grid md:grid-cols-4 md:gap-2">
              <input
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm sm:col-start-1 col-span-2"
                placeholder="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <input
                type="text"
                className="border rounded sm:col-start-3 col-span-2 h-10 w-full text-slate-400 focus:text-slate-700  focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Nombre del author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <input
              type="text"
              className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <div className="w-full mt-5">
              <textarea
                className="block h-40 py-4 px-3 w-full text-sm text-gray-600 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 focus:border-green-500 rounded-lg resize-none scrollbar"
                id="formInput1-9"
                placeholder="Lorem ipsum dolor sit amet"
                value={descripcion}
                onChange={(e) => setdDscripcion(e.target.value)}
              />
            </div>
            <div className="w-full md:w-full px-3 mt-3">
              {imagenRender && (
                <img
                  src={imagenRender}
                  className="h-36 w-36 rounded-lg shadow-lg flex self-center m-auto"
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
      </div>
    </section>
  );
};

export default EditModal;
