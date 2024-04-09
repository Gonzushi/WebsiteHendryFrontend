import { Link } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="container mx-auto mt-12 max-w-screen-xl bg-white p-4 md:p-8 lg:p-10">
      <div className="text-center">
        <Link
          to="/"
          className="flex items-center justify-center text-2xl font-semibold text-gray-900"
        >
          <SparklesIcon className="me-2 h-8 w-8 text-primary-600 hover:cursor-pointer hover:text-primary-800" />
          Hendry
        </Link>
        <p className="my-6 text-gray-500">
          The capacity to learn is a gift; the ability to learn is a skill; the
          willingness to learn is a choice
        </p>
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
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
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
