import ProfilePicture from "../assetts/hendry_profile_picture.jpg";
import AbbottLogo from "../assetts/abbott__logo.jpg";
import UOTLogo from "../assetts/theuniversityoftexasataustin__logo.jpg";
import UMNLogo from "../assetts/university_of_minnesota_logo.jpg";
import EcowaterLogo from "../assetts/ecowater_systems_llc_logo.jpg";
import InkoteLogo from "../assetts/inkote_logo.jpg";
import PeninsulaLogo from "../assetts/peninsula_college_logo.jpg";
import RecisLogo from "../assetts/regina_pacis_logo.jpg";
import ResumePDF from "../assetts/Resume - Hendry - 2024 2.pdf";
// import clsx from "clsx";

function Resume() {
  // const currentDate = new Date();
  // const abbottStartDate = new Date(2021, 8, 1);
  // const monthDiff =
  //   14 -
  //   abbottStartDate.getMonth() +
  //   currentDate.getMonth() +
  //   12 * (currentDate.getFullYear() - abbottStartDate.getFullYear() - 1);
  // const years = Math.floor(monthDiff / 12);
  // const months = monthDiff % 12;
  // const period = clsx(years + " yrs", months > 0 && " " + months + " mos");

  return (
    <div className="text-md mx-auto max-w-5xl">
      <section className="mx-4 mt-6 min-h-96 overflow-hidden rounded-lg border border-gray-300 tracking-tight shadow-lg">
        <div className="relative">
          <div className="min-h-56  bg-gray-400"></div>
          <div className="min-h-56 rounded-b-lg pb-8 md:grid md:grid-cols-2">
            <div className="mx-10 mt-24">
              <p className="text-2xl font-semibold">Hendry Widyanto</p>
              <p className="mt-1">
                Data Analyst / Product Performance Engineer
              </p>
              <p className="mt-1">Bogor, West Java, Indonesia</p>
            </div>
            <div className="mx-10 mt-5 flex flex-col space-y-2 font-semibold md:mt-24">
              <div className="inline-flex items-center">
                <img src={AbbottLogo} className="mr-3 size-6 rounded-full" />
                Abbott
              </div>
              <div className="inline-flex items-center">
                <img src={UOTLogo} className="mr-3 size-6 rounded-full" />
                University of Texas Austin
              </div>
              <div className="inline-flex items-center">
                <img src={UMNLogo} className="mr-3 size-6 rounded-full" />
                University of Minnesota Twin Cities
              </div>
            </div>
          </div>
          <div className="absolute left-10 top-32 size-44 rounded-full border-8 border-white bg-white">
            <img
              src={ProfilePicture}
              className="size-42 mx-auto rounded-full"
            />
          </div>
        </div>
      </section>

      <section className=" mx-4 my-4 rounded-lg border border-gray-300 px-10 py-6 tracking-tight shadow-lg">
        <div className="text-2xl font-semibold">About Me</div>
        <p className="py-2">
          I worked as a Data Analyst / Product Performance Engineer
          at Abbott Laboratories. I joined Abbott as an engineer to analyze and
          handle product quality issues for medical devices. I applied my
          analytical skills to find pattern/trend within data history. I also
          created custom reports for the group to make a quick decision based on
          the given data.
        </p>
        <p className="py-2">
          I find joy in coding to solve the solution for myself and many people.
          I taught myself during my free time. I also just got accepted by
          University of Texas Austin to continue my master in Data Science. So,
          I will be a part time student while working in Indonesia.
        </p>
        <p className="py-2">Relevant Skills:</p>
        <ul className="ml-8 list-disc">
          <li>
            Language: Python, Javascipt, Typescript, Matlab, HTML, CSS, SQL
          </li>
          <li>
            Python Libray: pandas, selenium, scikit-learn, FastAPI, django,
            matplotlib, numpy, SQLAlchemy
          </li>
          <li>Web Framework: React JS</li>
          <li>Cloud Solution: Microsoft Azure</li>
          <li>BI Tools: Power BI, Tableau, Qlik Sense</li>
        </ul>
        <div className="mt-8 grid grid-cols-3 border-t border-gray-400 pb-2 pt-8 text-center font-semibold text-primary-700">
          <a href={ResumePDF}>
            <div className="rounded-full p-2 hover:cursor-pointer hover:bg-blue-700 hover:text-white">
              Resume
            </div>
          </a>
          <a href="https://github.com/Gonzushi" target="_blank">
            <div className="rounded-full p-2 hover:cursor-pointer hover:bg-blue-700 hover:text-white">
              Github
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/hendry-widyanto/"
            target="_blank"
          >
            <div className="rounded-full p-2 hover:cursor-pointer hover:bg-blue-700 hover:text-white">
              LinkedIn
            </div>
          </a>
        </div>
      </section>

      <section className="mx-4 my-4 min-h-96 overflow-hidden rounded-lg border border-gray-300 px-10 py-6 tracking-tight shadow-lg">
        <div className="text-2xl font-semibold">Experience</div>

        <div className="mt-4 inline-flex w-full items-start justify-start border-b border-gray-400 py-4">
          <img
            src={AbbottLogo}
            className="hidden size-10 rounded-lg md:block md:size-16"
          />
          <div className="w-full px-3 md:px-8 ">
            <p className="font-semibold">
              Data Analyst / Product Performance Engineer
            </p>
            <p>Abbott</p>
            <p className="font">Aug 2021 - May 2024 · 2 yrs 10 mos </p>
            <p>Temecula, California, United States</p>
            <div className="mx-4 my-4 ms-7">
              <ul className="list-disc">
                <li>
                  Build a website for internal use to publish custom report.
                  Technology used: backend (Python, FastAPI), frontend (React,
                  HTML, JS, CSS), database (Salesforce, MS SQL Server), and
                  cloud service (Azure)
                </li>
                <li>
                  Create an application to receive a complaint from the client
                  and sales team using PowerApps as the user interface and
                  Python (with FastAPI) as the backend. Then, transfer the data
                  to Salesforce
                </li>
                <li>
                  Build dashboard for the group using Power BI and Qlik Sense
                </li>
                <li>
                  Identify, analyze, investigate, monitor, and document
                  patterns/trends in post marketing surveillance data as part of
                  the CAPA system
                </li>
                <li>
                  Ensure that information and insight gained from the
                  investigations and corrective actions are fed back to the R&D
                  and marketing organizations as part of the risk management and
                  design input systems
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 inline-flex w-full items-start justify-start border-b border-gray-400 py-4">
          <img
            src={EcowaterLogo}
            className="hidden size-10 rounded-lg md:block md:size-16"
          />
          <div className="w-full px-3 md:px-8">
            <p className="font-semibold">Engineering Co-op</p>
            <p>Ecowater</p>
            <p className="font">Sep 2019 - Aug 2020 · 1 yr</p>
            <p>Woodbury, Minnesota, United States</p>
            <div className="mx-4 my-4 ms-7">
              <ul className="list-disc">
                <li>
                  Design and assemble automation stand to test the viability of
                  new brine valve prototype for water softener and the lifespan
                  of MgO block to produce alkaline water from the Reverse
                  Osmosis water
                </li>
                <li>
                  Install and program PLCs to control the system and collect
                  data for analysis
                </li>
                <li>
                  Operate and maintain pilot-scale equipment to analyze resin
                  capacity and optimize the resin in water softener to reduce
                  production cost and increase the efficiency of ion exchange
                </li>
                <li>
                  Develop Process Flow Diagram and improve manuals for existing
                  and new automation system
                </li>
                <li>
                  Design and assemble automation stand that includes heat
                  exchanger and pump sizing to test the strength of salt tank
                  for water softener at high temperature
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 inline-flex w-full items-start justify-start border-b border-gray-400 py-4">
          <img
            src={InkoteLogo}
            className="hidden size-10 rounded-lg md:block md:size-16"
          />
          <div className="w-full px-3 md:px-8">
            <p className="font-semibold">Research And Development Intern</p>
            <p>PT. Inkote Indonesia</p>
            <p className="font">Jun 2019 - Aug 2019 · 3 mos</p>
            <p>Bekasi, West Java, Indonesia</p>
            <div className="mx-4 my-4 ms-7">
              <ul className="list-disc">
                <li>
                  Formulate composition of industrial coating according to the
                  specification given by the clients
                </li>
                <li>
                  Reduce cost production by evaluating substitute raw materials
                  such as resin, pigment, and additives from suppliers
                </li>
                <li>
                  Demonstrate techniques to analyze the coating such as color
                  matching, testing pigment color strength, checking viscosity,
                  measuring solid content of paint, and paint spray application
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 inline-flex w-full items-start justify-start py-4">
          <img
            src={PeninsulaLogo}
            className="hidden size-10 rounded-lg md:block md:size-16"
          />
          <div className="w-full px-3 md:px-8">
            <p className="font-semibold">Math Tutor</p>
            <p>Peninsula College</p>
            <p className="font">Jan 2016 - Jun 2017 · 1 yr 6 mos</p>
            <p>Port Angeles, Washington, United States</p>
            <div className="mx-4 my-4 ms-7">
              <ul className="list-disc">
                <li>
                  One of the instructors of a federally funded college
                  preparatory program that aids low-income and first-generation
                  college-bound high school students
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 my-4 min-h-96 overflow-hidden rounded-lg border border-gray-300 px-10 py-6 tracking-tight shadow-lg">
        <div className="text-2xl font-semibold">Education</div>

        <div className="grid grid-cols-1">
          <div className="my-4 inline-flex items-center">
            <img
              src={UOTLogo}
              className="size-10 rounded-lg md:block md:size-16"
            />
            <div className="mx-6">
              <p className="font-semibold">University of Texas Austin </p>
              <p>Master in Data Science - M.S, Data Science</p>
              <p>Aug 2024 - Dec 2025 (Incoming Student)</p>
            </div>
          </div>

          <div className="my-4 inline-flex items-center">
            <img
              src={UMNLogo}
              className="size-10 rounded-lg md:block md:size-16"
            />
            <div className="mx-6">
              <p className="font-semibold">
                University of Minnesota Twin Cities
              </p>
              <p>
                Bachelor of Chemical Engineering - B.Ch.E, Chemical Engineering
              </p>
              <p>Aug 2017 - May 2021</p>
            </div>
          </div>

          <div className="my-4 inline-flex items-center">
            <img
              src={UMNLogo}
              className="size-10 rounded-lg md:block md:size-16"
            />
            <div className="mx-6">
              <p className="font-semibold">
                University of Minnesota Twin Cities
              </p>
              <p>Bachelor of Science - B.S, Chemistry</p>
              <p>Aug 2017 - May 2021</p>
            </div>
          </div>

          <div className="my-4 inline-flex items-center">
            <img
              src={PeninsulaLogo}
              className="size-10 rounded-lg md:block md:size-16"
            />
            <div className="mx-6">
              <p className="font-semibold">Peninsula College</p>
              <p>Associate in Science</p>
              <p>2015 - 2017</p>
            </div>
          </div>

          <div className="my-4 inline-flex items-center">
            <img
              src={RecisLogo}
              className="size-10 rounded-lg md:block md:size-16"
            />
            <div className="mx-6">
              <p className="font-semibold">SMA Regina Pacis Bogor</p>
              <p>High School</p>
              <p>2012 - 2015</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resume;
