const Footer = (): JSX.Element => {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  return (
    <footer className="relative mt-20 bg-gray-900 px-4 pt-5">
      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-2 flex w-full flex-col sm:gap-10 gap-5 justify-center items-center sm:flex-row sm:text-left"
      >
        <a href="#" className="font-medium text-white">
          Demo
        </a>
        <a href="#" className="font-medium text-white">
          Support
        </a>
      </nav>
      <p className="py-5 text-center text-gray-300">
        © {anio} bodaGlam | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
