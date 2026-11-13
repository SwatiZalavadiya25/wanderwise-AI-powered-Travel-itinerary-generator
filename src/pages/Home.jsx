import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [tripFormData, setTripFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    noOfAdult: 1,
    noOfChild: 1,
    travelStyle: "budget",
    budget: 0,
  });
  const [errors, setErrors] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  const handleCreateTrip = () => {
    navigate("/trip-summary");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(name, value);
    setTripFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { destination, startDate, endDate, budget, noOfAdult, noOfChild } =
      tripFormData;

    // Store all validation errors here
    const newErrors = {};

    // Destination validation
    if (!destination.trim()) {
      newErrors.destination = "Enter your destination";
    }

    // Start date validation
    if (!startDate) {
      newErrors.startDate = "Enter start date";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedStartDate = new Date(`${startDate}T00:00:00`);

      if (selectedStartDate < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }
    }

    // End date validation
    if (!endDate) {
      newErrors.endDate = "Enter end date";
    } else if (startDate && endDate <= startDate) {
      newErrors.endDate = "End date must be after start date";
    }

    // Budget validation
    if (
      budget === "" ||
      Number(budget) <= 0 ||
      !Number.isFinite(Number(budget))
    ) {
      newErrors.budget = "Please enter a valid budget";
    }

    // // Adult validation
    // if (noOfAdult < 1 || !Number.isInteger(noOfAdult)) {
    //   newErrors.noOfAdult = "At least one adult is required";
    // }

    // // Child validation
    // if (noOfChild < 0 || !Number.isInteger(noOfChild)) {
    //   newErrors.noOfChild = "Please enter a valid child count";
    // }

    // Update all errors together
    setErrors(newErrors);

    console.log(newErrors);
    // Stop submission if validation fails
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // All validations passed
    console.log("Trip Form Data:", tripFormData);

    navigate("/trip-summary");
  };

  return (
    <div className="mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
        Plan your next trip,
        <span className="block text-violet-600">Your way.</span>
      </h1>
      <p className="font-dm text-lg md:text-xl text-gray-600 mt-4 leading-relaxed">
        Tell us where you are going, how you want to travel,{" "}
        <span className="block">
          and let AI create a personalized itinerary for you.
        </span>
      </p>
      <div className="trip-details-form mt-8 max-w-xl m-auto">
        <form onSubmit={handleSubmit}>
          <div className="form-container flex flex-col gap-5 rounded-lg border border-gray-300 bg-white p-5 shadow-lg text-left">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="destination"
                className="text-sm font-semibold text-gray-700"
              >
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={tripFormData.destination}
                onChange={handleInputChange}
                placeholder="e.g. Paris, Tokyo, New York"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
              />
              {errors.destination !== "" && tripFormData.destination == "" && (
                <p className="text-red-600 text-xs">{errors.destination}</p>
              )}
            </div>
            <div className="flex flex-row gap-2 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="startDate"
                  className="text-sm font-semibold text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={tripFormData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
                />
                {errors.startDate !== "" && tripFormData.startDate == "" && (
                  <p className="text-red-600 text-xs">{errors.startDate}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="endDate"
                  className="text-sm font-semibold text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={tripFormData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
                />
                {errors.endDate !== "" && tripFormData.endDate == "" && (
                  <p className="text-red-600 text-xs">{errors.endDate}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-700">
                No. of Travelers
              </span>
              <div className="flex flex-row gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <label
                    htmlFor="adults"
                    className="text-xs font-medium text-gray-500"
                  >
                    Adults (12+ yrs)
                  </label>
                  <input
                    type="number"
                    id="adults"
                    name="noOfAdult"
                    min="0"
                    placeholder="1"
                    value={tripFormData.noOfAdult}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
                  />
                  {errors.noOfAdult < 1 ||
                    (Number.isInteger(errors.noOfAdult) &&
                      tripFormData.noOfAdult <= 0 && (
                        <p className="text-red-600 text-xs">
                          {errors.noOfAdult}
                        </p>
                      ))}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label
                    htmlFor="children"
                    className="text-xs font-medium text-gray-500"
                  >
                    Children (0-11 yrs)
                  </label>
                  <input
                    type="number"
                    id="children"
                    name="noOfChild"
                    min="0"
                    placeholder="0"
                    value={tripFormData.noOfChild}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
                  />
                  {errors.noOfChild !== "" && tripFormData.noOfChild <= 0 && (
                    <p className="text-red-600 text-xs">{errors.noOfChild}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-700">
                Travel Style
              </span>
              <div className="flex flex-row gap-2 w-full">
                <label htmlFor="style-budget" className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="travelStyle"
                    id="style-budget"
                    value="budget"
                    className="peer sr-only"
                    checked={tripFormData.travelStyle === "budget"}
                    required
                    onChange={handleInputChange}
                  />
                  <span className="block w-full py-2 px-3 text-xs sm:text-sm font-medium text-center rounded-full border border-gray-300 bg-transparent text-gray-700 transition peer-checked:border-violet-600 peer-checked:bg-violet-600 peer-checked:text-white hover:border-gray-400">
                    Budget
                  </span>
                </label>
                <label
                  htmlFor="style-moderate"
                  className="flex-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="travelStyle"
                    id="style-moderate"
                    value="moderate"
                    className="peer sr-only"
                    checked={tripFormData.travelStyle === "moderate"}
                    onChange={handleInputChange}
                  />
                  <span className="block w-full py-2 px-3 text-xs sm:text-sm font-medium text-center rounded-full border border-gray-300 bg-transparent text-gray-700 transition peer-checked:border-violet-600 peer-checked:bg-violet-600 peer-checked:text-white hover:border-gray-400">
                    Moderate
                  </span>
                </label>
                <label htmlFor="style-luxury" className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="travelStyle"
                    id="style-luxury"
                    value="luxury"
                    className="peer sr-only"
                    checked={tripFormData.travelStyle === "luxury"}
                    onChange={handleInputChange}
                  />
                  <span className="block w-full py-2 px-3 text-xs sm:text-sm font-medium text-center rounded-full border border-gray-300 bg-transparent text-gray-700 transition peer-checked:border-violet-600 peer-checked:bg-violet-600 peer-checked:text-white hover:border-gray-400">
                    Luxury
                  </span>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="budget"
                className="text-sm font-semibold text-gray-700"
              >
                Your Budget (INR)
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                placeholder="e.g. $1000"
                value={tripFormData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
              />
              {errors.budget !== "" && tripFormData.budget == 0 && (
                <p className="text-red-600 text-xs">{errors.budget}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-violet-600 text-white font-semibold border border-violet-600 cursor-pointer"
            >
              Create My Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
