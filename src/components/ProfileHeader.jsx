import ScrambleText from "./ScrambleText";
import Tagline from "./Tagline";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col justify-center gap-6 mb-8">
      <div className="relative mx-auto mb-8">
        <div className="w-60 h-60 rounded-full overflow-hidden border-2 border-gray-700">
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQF6d0kSFY_exw/profile-displayphoto-scale_200_200/B56ZjlQ7D0HUAg-/0/1756193077114?e=1772064000&v=beta&t=DTQ5Ad2ItcTnzneFWGNjkHV7_WjIuD01sL6Se8-fau8"
            alt="Profile"
            className="w-full h-full object-cover filter contrast-125"
          />
        </div>
        <div className="absolute -bottom-11.25 -right-10.5">
          <span
            className="text-white text-9xl font-bold drop-shadow-md"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Hi.
          </span>
        </div>
      </div>
      <div>
        <h1
          className="text-4xl font-bold text-white tracking-tight mb-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <ScrambleText text={"Ayan Kumar"} />
        </h1>
        <div className="flex items-center gap-3">
          <p
            className="text-xl text-gray-400 font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Tagline />
          </p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for work
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
