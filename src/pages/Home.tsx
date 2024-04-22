import { Link } from "react-router-dom";
import {
  ArrowRightCircleIcon,
  CpuChipIcon,
  CogIcon,
  BookOpenIcon,
  GlobeAsiaAustraliaIcon,
  CloudIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import ProfilePicture from "../assetts/hendry_profile_picture.jpg";

function home() {
  return (
    <>
      <div className="mt-10 p-6 text-center md:mb-5 md:mt-20">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Welcome to my website!
        </h1>
        <p className="mb-6 mt-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
          Here at my website, I showcase my personal projects to learn new
          technology. I am passionate to learn web development and data science.
        </p>
        <Link
          to="/portfolio"
          className="m-3 inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Check my Work
          <ArrowRightCircleIcon className="ms-3 h-8 w-8 text-white" />
        </Link>
        <Link
          to="/resume"
          className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Learn more about me
          <ArrowRightCircleIcon className="ms-3 h-8 w-8 text-white" />
        </Link>
      </div>

      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="mb-8 max-w-screen-md lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Relevant Skill
            </h2>
            {/* <p className="text-gray-500 dark:text-gray-400 sm:text-xl">Empty</p> */}
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <CogIcon className="h-12 w-12 rounded-full bg-blue-100 p-3 text-blue-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Language
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Python, Javascipt, Typescript, Matlab, HTML, CSS
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <BookOpenIcon className="h-12 w-12 rounded-full bg-blue-100 p-3 text-blue-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Python Library
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                pandas, selenium, scikit-learn, FastAPI, django, matplotlib,
                numpy
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <GlobeAsiaAustraliaIcon className="h-12 w-12 rounded-full bg-blue-100 p-3 text-blue-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Web Framework
              </h3>
              <p className="text-gray-500 dark:text-gray-400">React JS</p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <CloudIcon className="h-12 w-12 rounded-full bg-blue-100 p-3 text-blue-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Cloud Solution
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Microsoft Azure
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <ArchiveBoxIcon className="h-12 w-12 rounded-full bg-blue-100 p-3 text-blue-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Business Inteligence Tools
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Power BI, Tableau, Qlik Sense
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 bg-white md:mt-">
        <div className="mx-auto px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-12">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
              My current work
            </h2>
            <p className="font-light text-gray-500 sm:text-xl">
              I am still learning everyday, and here are my most current
              projects.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-1">
            <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
              <div className="mb-5 flex items-center justify-between text-gray-500">
                <span className="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-200 dark:text-primary-800">
                  <svg
                    className="mr-2 h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                  </svg>
                  API, SQL, FastAPI
                </span>
                {/* <span className="text-sm">14 days ago</span> */}
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Build CRUD application from scratch</a>
              </h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                I create a simple application to build two tables for product
                pricing. The data is stored in MS SQL Server database that is
                hosted in Microsoft Azure. To interact with the database, I
                build an API using FastAPI. Then, I use this site as my frontend
                to display the data and interact with the API.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={ProfilePicture} className="h-7 w-7 rounded-full" />
                  <span className="font-medium dark:text-white">
                    Hendry Widyanto
                  </span>
                </div>
                <Link
                  to="/portfolio/project-crud"
                  className="inline-flex items-center font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Read more
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* <section className="mt-10 bg-white md:mt-0">
        <div className="mx-auto max-w-screen-xl items-center gap-16 px-4 py-8 lg:grid lg:grid-cols-2 lg:px-6 lg:py-16">
          <div className="font-normal text-gray-500 dark:text-gray-400 sm:text-lg">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              This site is also one of my project
            </h2>
            <p className="mb-4">
              This site is a living project which will be updated whenever I
              work with new personal project. I build this site from scract
              using React JS. All components on this site were made by me.
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
      </section> */}
    </>
  );
}

export default home;
