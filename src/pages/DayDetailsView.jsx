import {
  ArrowLeft,
  Clock,
  Notebook,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomizeDayPlanModal from "../components/CustomizeDayPlanModal";
import AskAiPanel from "../components/AskAIPanel";

const DayDetailsView = () => {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const defaultDay = {
    day: 1,
    place: "Eiffel Tower & Seine River Cruise",
    description:
      "Ascend the iconic Eiffel Tower for panoramic city vistas, followed by a scenic evening boat cruise along the Seine.",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
  };

  const dayData = location.state?.dayData || defaultDay;

  const dailySchedules = {
    1: [
      {
        time: "08:30 AM – 09:30 AM",
        category: "Breakfast",
        categoryColor: "bg-orange-50 text-orange-700 border-orange-200",
        title: "Parisian Bakery Breakfast & Espresso",
        description:
          "Sip fresh espresso and savor flaky butter croissants and pain au chocolat at a sidewalk café.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
      },

      {
        time: "11:00 AM – 01:00 PM",
        category: "Sightseeing",
        categoryColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        title: "Eiffel Tower Summit Ascent",
        description:
          "Ride the glass elevator to the highest observation deck for breathtaking 360° panoramas across Paris.",
        image:
          "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80",
      },
      {
        time: "01:00 PM – 02:30 PM",
        category: "Lunch Time",
        categoryColor: "bg-amber-50 text-amber-700 border-amber-200",
        title: "French Bistro Lunch at Café Branly",
        description:
          "Relax over a classic 2-course meal with steak frites, savory quiche, and wine on a sunlit terrace.",
        image:
          "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80",
      },
      {
        time: "02:30 PM – 04:00 PM",
        category: "Rest Time",
        categoryColor: "bg-teal-50 text-teal-700 border-teal-200",
        title: "Hotel Siesta & Afternoon Rest",
        description:
          "Head back to recharge your devices, rest your feet, freshen up, or take a quick rejuvenating nap.",
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
      },
    ],
  };

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Tea Museum Visit",
      time: "10:00 AM",
      description: "Discover the history of tea in Munnar.",
    },
    {
      id: 2,
      title: "Lunch at Local Restaurant",
      time: "1:00 PM",
      description: "Enjoy authentic Kerala cuisine.",
    },
  ]);

  const schedule = dailySchedules[dayData.day] || dailySchedules[1];

  return (
    <div className="mx-auto px-6 py-16 text-left max-w-4xl">
      <span
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm cursor-pointer mb-5 text-gray-600 hover:text-violet-600 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Itinerary</span>
      </span>

      <div className="w-full h-70 rounded-xl overflow-hidden shadow-sm border border-gray-200/80 bg-gray-100 relative group">
        <img
          src={dayData.image}
          alt={dayData.place}
          className="w-full h-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="day-details-content mt-6">
        <h1 className="text-2xl sm:text-5xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Day {dayData.day} – {dayData.place}
        </h1>
        <p className="font-dm text-lg md:text-md text-gray-600 mt-2 leading-relaxed">
          {dayData.description}
        </p>

        {/* Schedule & Activities Section */}
        <div className="itinerary-section mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Today's Schedule & Activities
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Curated timeline with sightseeing, meals, and rest breaks for Day{" "}
              {dayData.day}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {schedule.map((activity, index) => (
              <div
                key={index}
                className="p-2 group flex flex-col sm:flex-row items-stretch bg-white rounded-xl border border-gray-300 overflow-hidden"
              >
                <div className="size-25 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover rounded-xl object-center"
                  />
                </div>

                <div className="flex-1 px-5 flex flex-col justify-center min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="flex items-center gap-1 text-xs font-semibold text-violet-600">
                      <Clock size={13} />
                      {activity.time}
                    </span>
                    <span
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${activity.categoryColor}`}
                    >
                      {activity.category}
                    </span>
                  </div>
                  <h3 className="text-md font-bold text-gray-900 truncate">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-row gap-4 mt-4">
            <button
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-green-600 transition hover:bg-slate-50"
              onClick={() => setIsCustomizeOpen(true)}
            >
              <SlidersHorizontal size={18} />
              <span>Customize Day Plan</span>
            </button>
            <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-slate-50">
              <Trash2 size={18} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>

      <CustomizeDayPlanModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
      />

      <AskAiPanel />
    </div>
  );
};

export default DayDetailsView;
