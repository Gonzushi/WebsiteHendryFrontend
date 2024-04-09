import ProfilePicture from "../assetts/hendry_profile_picture.jpg";
import AbbottLogo from "../assetts/abbott__logo.jpg";
import UOTLogo from "../assetts/theuniversityoftexasataustin__logo.jpg";
import UMNLogo from "../assetts/university_of_minnesota_logo.jpg";

function Resume() {
  return (
    <>
      <div className="mx-4 mt-6 min-h-96 rounded-lg bg-gray-200 tracking-tight md:mx-0">
        <section className="relative">
          <div className="min-h-56 rounded-t-lg bg-gray-400"></div>
          <div className="min-h-56 rounded-b-lg pb-8 md:grid md:grid-cols-2">
            <div className="mx-10 mt-24">
              <p className="text-2xl font-semibold">Hendry Widyanto</p>
              <p className="text-lg">Product Performance Engineer</p>
              <p className="text-lg">Bogor, Jawa Barat, Indonesia</p>
            </div>
            <div className="mx-10 mt-5 flex flex-col space-y-2 font-semibold md:ms-60 md:mt-24">
              <div className="inline-flex items-center text-lg">
                <img src={AbbottLogo} className="mr-3 size-6 rounded-full" />
                Abbott
              </div>
              <div className="inline-flex items-center text-lg">
                <img src={UOTLogo} className="mr-3 size-6 rounded-full" />
                University of Texas Austin
              </div>
              <div className="inline-flex items-center text-lg">
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
        </section>
      </div>
    </>
  );
}

export default Resume;
