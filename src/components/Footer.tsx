import { Link } from "react-router-dom";
import IconHW from "../assetts/icons/IconHW";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="container mx-auto mt-12 max-w-screen-xl bg-white p-4 md:p-8 lg:p-10">
      <div className="text-center">
        <Link
          to="/"
          className="flex items-center justify-center text-2xl font-semibold text-gray-900"
        >
          <IconHW className="me-2 h-8 w-8 fill-primary-600 hover:fill-primary-800 hover:cursor-pointer" />
          Hendry
        </Link>
        <p className="mb-3 mt-6 text-gray-500">
          The capacity to learn is a gift; the ability to learn is a skill; the
          willingness to learn is a choice
        </p>
        <div className="mb-6 inline-flex font-semibold text-gray-700">
          Contact:{" "}
          <span className="ml-2 underline">hendrywidyanto97@gmail.com</span>
        </div>
        <ul className="mb-6 flex flex-wrap items-center justify-center space-x-4 text-gray-900 dark:text-white">
          <li>
            <Link to="/portfolio" className="hover:underline">
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/resume" className="hover:underline">
              Resume
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/Gonzushi"
              className="hover:underline"
              target="_blank"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/hendry-widyanto/"
              className="hover:underline"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <span className="text-sm text-gray-500">
          © {year}{" "}
          <a href="#" className="hover:underline">
            Hendry Widyanto
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
