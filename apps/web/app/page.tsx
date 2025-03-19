import HomeButton from "../Components/Landing/HomeButton";
import JoinButton from "../Components/Landing/JoinButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col justify-center items-center text-center p-6">
      {/* Hero Section */}
      <div className="max-w-3xl">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Lief Workforce Management
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          A seamless solution for healthcare workers to clock in, track hours,
          and manage shifts effortlessly.
        </p>
        <div className="mt-6 flex space-x-4 justify-center">
          <JoinButton
            type="primary"
            label="Join as Manager"
            className="hover:bg-blue-600"
          />
          <JoinButton
            type="default"
            label="Join as Worker"
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          />
        </div>
        <div className="m-3">
          <HomeButton />
        </div>
      </div>

      {/* Features Section */}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 shadow-xl rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="text-gray-300 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-400 text-sm">
        &copy; 2025 Lief. All rights reserved.
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Location-Based Clock-In",
    description: "Ensure accurate time tracking with geo-fencing.",
  },
  {
    title: "Manager Dashboard",
    description: "Monitor workforce activities and manage shifts efficiently.",
  },
  {
    title: "PWA Support",
    description: "Access your dashboard seamlessly on any device.",
  },
];
