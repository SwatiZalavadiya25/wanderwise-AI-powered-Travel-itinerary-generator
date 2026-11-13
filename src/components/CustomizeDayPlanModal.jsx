import {
  X,
  MapPin,
  Coffee,
  Utensils,
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useState } from "react";

const schedule = [
  {
    id: 1,
    time: "09:00 AM",
    title: "Tea Garden Visit",
    type: "Place",
    duration: "1.5 hours",
    description: "Enjoy scenic tea garden views",
    icon: MapPin,
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=200",
  },
  {
    id: 2,
    time: "10:30 AM",
    title: "Relax & Refresh",
    type: "Break",
    duration: "30 minutes",
    description: "Take a short break",
    icon: Coffee,
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=200",
  },
  {
    id: 3,
    time: "12:30 PM",
    title: "Local Restaurant",
    type: "Lunch",
    duration: "1 hour",
    description: "Enjoy local Kerala cuisine",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200",
  },
  {
    id: 4,
    time: "02:00 PM",
    title: "Echo Point",
    type: "Place",
    duration: "1 hour",
    description: "Beautiful mountain views",
    icon: MapPin,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200",
  },
];

const recommendations = {
  Place: [
    {
      id: 1,
      name: "Mattupetty Dam",
      duration: "1.5 hours",
      description: "Lake views and boating",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300",
    },
    {
      id: 2,
      name: "Top Station",
      duration: "2 hours",
      description: "Panoramic mountain views",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300",
    },
    {
      id: 3,
      name: "Tea Museum",
      duration: "1 hour",
      description: "Discover tea history",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300",
    },
  ],

  Lunch: [
    {
      id: 4,
      name: "Saravana Bhavan",
      duration: "1 hour",
      description: "South Indian vegetarian food",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=300",
    },
    {
      id: 5,
      name: "Garden Restaurant",
      duration: "1 hour",
      description: "Relaxed lunch with a view",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300",
    },
  ],

  Break: [
    {
      id: 6,
      name: "Coffee & Snack Break",
      duration: "30 minutes",
      description: "Enjoy tea or coffee",
      image:
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=300",
    },
    {
      id: 7,
      name: "Visit a Local Café",
      duration: "45 minutes",
      description: "Relax and enjoy refreshments",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300",
    },
  ],
};

export default function CustomizeDayPlanModal({ isOpen, onClose }) {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {/* Modal */}
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Customize Day Plan
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Make changes to your Munnar day schedule.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="max-h-[65vh] space-y-5 overflow-y-auto px-6 py-5">
          {/* Schedule Heading */}
          <div>
            <h3 className="font-semibold text-gray-800">Your daily schedule</h3>
            <p className="mt-1 text-sm text-gray-500">
              Change places, meal stops or breaks as you prefer.
            </p>
          </div>

          {/* Schedule Items */}
          <div className="space-y-3">
            {schedule.map((item, index) => {
              const Icon = item.icon;

              return (
                <>
                  <div className="flex flex-col rounded-xl border border-gray-200 ">
                    <div
                      key={item.id}
                      className="flex flex-col gap-3   p-3 sm:flex-row sm:items-center"
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-full rounded-lg object-cover sm:w-24"
                      />

                      {/* Activity Details */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium text-violet-700">
                            {item.time}
                          </span>

                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                            {item.type}
                          </span>
                        </div>

                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </p>

                        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={13} />
                          {item.duration}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setExpandedId(expandedId === item.id ? null : item.id)
                        }
                        className="rounded-lg border border-violet-200 px-4 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50"
                      >
                        {expandedId === item.id ? "Close" : "Change"}
                      </button>
                    </div>
                    <div
                      className={`grid transition-all duration-300 ease-in-out  ${
                        expandedId === item.id
                          ? "grid-rows-[1fr] opacity-100 mt-2"
                          : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden min-h-0">
                        <div className="p-4  border-t-1 border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-800">
                            Recommended alternatives
                          </h4>

                          <p className="mt-1 text-xs text-gray-500">
                            Choose an option to replace {item.title}.
                          </p>

                          <div className="mt-3 space-y-2">
                            {(recommendations[item.type] || []).map(
                              (option) => (
                                <button
                                  key={option.id}
                                  onClick={() =>
                                    setSelectedOptions((prev) => ({
                                      ...prev,
                                      [item.id]: option.id,
                                    }))
                                  }
                                  className={`flex w-full items-center gap-3 rounded-lg
              border bg-white p-2 text-left transition
              ${
                selectedOptions[item.id] === option.id
                  ? "border-violet-500 ring-2 ring-violet-100"
                  : "border-gray-200 hover:border-violet-300"
              }`}
                                >
                                  <img
                                    src={option.image}
                                    alt={option.name}
                                    className="h-14 w-14 rounded-lg object-cover"
                                  />

                                  <div className="min-w-0 flex-1">
                                    <h5 className="text-sm font-medium text-gray-800">
                                      {option.name}
                                    </h5>
                                    <p className="text-xs text-gray-500">
                                      {option.duration} · {option.description}
                                    </p>
                                  </div>

                                  {selectedOptions[item.id] === option.id ? (
                                    <span className="text-xs font-semibold text-violet-700">
                                      Selected ✓
                                    </span>
                                  ) : (
                                    <span className="text-xs text-violet-700">
                                      Select
                                    </span>
                                  )}
                                </button>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          {/* Reorder Section */}
          <div className="rounded-xl bg-violet-50/70 p-4">
            <h3 className="font-medium text-gray-800">
              Want to change the order?
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Move activities earlier or later in your schedule.
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <ArrowUp size={16} />
                Move Up
              </button>

              <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <ArrowDown size={16} />
                Move Down
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
