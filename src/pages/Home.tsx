import { Link } from "react-router-dom";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

function home() {
  return (
    <div className="mt-12 p-6 text-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Welcome to my website!
      </h1>
      <p className="mb-6 mt-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
        Here at my website, I showcase my personal project to learn new
        technology. I am passionate to learn web development and data science.
        Currently, I am pursuing my Master in Data Science at University of
        Texas Austin. Enjoy!!!
      </p>
      <Link
        to="/about"
        className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Learn more about me
        <ArrowRightCircleIcon className="ms-3 h-8 w-8 text-white" />
      </Link>
    </div>
  );
}

export default home;
