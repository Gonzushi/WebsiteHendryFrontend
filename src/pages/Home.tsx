import { Link } from "react-router-dom";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

function home() {
  return (
    <>
      <div className="mt-10 p-6 text-center md:mb-5 md:mt-20">
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

      <section className="mt-10 bg-white dark:bg-gray-900 md:mt-0">
        <div className="mx-auto max-w-screen-xl items-center gap-16 px-4 py-8 lg:grid lg:grid-cols-2 lg:px-6 lg:py-16">
          <div className="font-normal text-gray-500 dark:text-gray-400 sm:text-lg">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              In case you are curious...
            </h2>
            <p className="mb-4">
              I build this website using React JS. I also use Tailwind CSS. It
              made my life so much easier to style my website. Other than that,
              I use Python and FastAPI for my backend. And, this website is
              hosted in Azure.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full rounded-lg lg:mt-10"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default home;
