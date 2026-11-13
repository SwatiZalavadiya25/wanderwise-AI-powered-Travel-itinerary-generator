import {
  ArrowLeft,
  Baby,
  Calendar,
  ChevronRight,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdjustItineraryModal from "../components/AdjustItineraryModal";

const TripSummary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToDayDetails = () => {
    navigate("/day-details");
  };

  const handleViewPacking = () => {
    navigate("/packing-list");
  };

  const itinerary = [
    {
      day: 1,
      place: "Eiffel Tower & Seine River Cruise",
      description:
        "Ascend the iconic Eiffel Tower for panoramic city vistas, followed by a scenic evening boat cruise along the Seine.",
      image:
        "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80",
    },
    {
      day: 2,
      place: "The Louvre & Tuileries Garden",
      description:
        "Discover world-renowned masterworks like the Mona Lisa, followed by a leisurely stroll through the historic Tuileries Garden.",
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
    },
    {
      day: 3,
      place: "Montmartre & Sacré-Cœur Basilica",
      description:
        "Wander bohemian cobblestone alleys, visit lively artists' squares, and take in the highest city views from the basilica.",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    },
    {
      day: 4,
      place: "Notre-Dame Cathedral & Latin Quarter",
      description:
        "Admire historic Gothic architecture on Île de la Cité, browse charming bookshops, and dine in authentic Latin Quarter bistros.",
      image:
        "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?auto=format&fit=crop&w=600&q=80",
    },
    {
      day: 5,
      place: "Palace of Versailles Day Trip",
      description:
        "Marvel at the dazzling Hall of Mirrors and wander through the legendary royal gardens and fountains of Versailles.",
      image:
        "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="mx-auto px-6 py-16 text-left max-w-4xl">
      <span
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-1.5 text-sm cursor-pointer mb-3 text-gray-600 hover:text-violet-600 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </span>
      <h1 className="text-2xl sm:text-5xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
        Your Trip to <span className="text-violet-600">Paris</span>
      </h1>
      <p className="font-dm text-lg md:text-md text-gray-600 mt-2 leading-relaxed">
        Planning from <span className="font-semibold">2023-10-01</span> to{" "}
        <span className="font-semibold">2023-10-07</span>
      </p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm text-gray-600">
        <span className="inline-flex align-items-center gap-1.5">
          <Calendar size={16} className="text-violet-600" />
          <span>5 Days</span>
        </span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Users size={16} className="text-violet-600" />
          <span>2 Adults</span>
        </span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Baby size={16} className="text-violet-600" />
          <span>1 Child</span>
        </span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Wallet size={16} className="text-violet-600" />
          <span>Approx. Budget: $1,000</span>
        </span>
      </div>
      <div className="itinerary-section my-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Itinerary</h2>
          <p className="text-sm text-gray-500 mt-1">
            A curated day-by-day exploration plan for Paris
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {itinerary.map((item) => (
            <div
              key={item.day}
              onClick={() => handleNavigateToDayDetails(item)}
              className="group flex flex-col sm:flex-row items-stretch bg-white rounded-xl border border-gray-300 overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer sm:h-40"
            >
              <div className="w-full sm:w-56 h-48 sm:h-full shrink-0 relative overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.place}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="flex-1 p-5 flex flex-col justify-center min-w-0">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-600 transition truncate">
                  Day {item.day} – {item.place}
                </h3>
                <p className="text-sm text-gray-600 mt-1.5 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="px-5 py-4 sm:py-0 flex items-center justify-end sm:justify-center border-t sm:border-t-0 sm:border-l border-gray-100 shrink-0 sm:h-full">
                <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-violet-600 flex items-center justify-center text-gray-400 group-hover:text-white transition duration-200 shadow-sm">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <button
          className="flex-1 bg-white text-violet-600 border border-violet-600 px-5 py-3 text-sm font-semibold  rounded-lg"
          onClick={handleViewPacking}
        >
          View Packaging list
        </button>
        <button
          className="flex-1 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={() => setIsModalOpen(true)}
        >
          Make Changes
        </button>
      </div>

      {isModalOpen && (
        <AdjustItineraryModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TripSummary;
