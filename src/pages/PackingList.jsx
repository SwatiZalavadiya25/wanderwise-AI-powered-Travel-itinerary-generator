import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PackingList = () => {
  const navigate = useNavigate();

  const clothing = [
    "4-5 Tops / T-shirts",
    "1-2 Pairs of Pants",
    "1 Pair of Shorts (optional)",
    "1 Jacket",
    "Raincoat / Umbrella",
    "Comfortable Shoes",
    "Socks",
    "Underwear",
    "Pajamas",
  ];

  const toiletries = [
    "Travel-size Shampoo",
    "Travel-size Conditioner",
    "Toothbrush & Toothpaste",
    "Deodorant",
    "Face Wash",
    "Moisturizer",
    "Sunscreen",
    "Lip Balm",
    "Small Towel",
  ];

  const essentials = [
    "Passport & Visa (if required)",
    "Travel Insurance",
    "Flight & Hotel Confirmations",
    "Credit/Debit Cards",
    "Local Currency",
    "Medications",
    "First-Aid Kit",
  ];

  const electronics = [
    "Phone & Charger",
    "Portable Power Bank",
    "Travel Adapter",
    "Headphones",
  ];

  return (
    <div className="mx-auto px-6 py-16 text-left max-w-4xl">
      <span
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm cursor-pointer mb-3 text-gray-600 hover:text-violet-600 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Itinerary</span>
      </span>
      <div className="flex justify-between">
        <h1 className="text-2xl sm:text-5xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Packing List
        </h1>
        <button className="border border-gray-300 text-violet-600 px-4 py-2 rounded-lg">
          Download
        </button>
      </div>
      <p className="font-dm text-md md:text-md text-gray-600 mt-2 leading-relaxed">
        Based on your destination and the time of year, here's a suggested
        packing list to get you started.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-lg border border-gray-300 clothing-category">
          <h2 className="text-md font-bold text-gray-900 mb-3">
            Clothing (Per Person)
          </h2>
          <div>
            {clothing.map((item, index) => (
              <div key={index} className="flex items-center p-1">
                <input
                  type="checkbox"
                  className="accent-violet-600 w-4 h-4"
                  defaultChecked
                />
                <span className="text-sm text-gray-700 pl-2">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg border border-gray-300 toiletries-category">
          <h2 className="text-md font-bold text-gray-900 mb-3">
            Toiletries (Per Person)
          </h2>
          <div>
            {toiletries.map((item, index) => (
              <div key={index} className="flex items-center p-1">
                <input
                  type="checkbox"
                  className="accent-violet-600 w-4 h-4"
                  defaultChecked
                />
                <span className="text-sm text-gray-700 pl-2">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg border border-gray-300 essentials-category">
          <h2 className="text-md font-bold text-gray-900 mb-3">
            Essentials (Per Person)
          </h2>
          <div>
            {essentials.map((item, index) => (
              <div key={index} className="flex items-center p-1">
                <input
                  type="checkbox"
                  className="accent-violet-600 w-4 h-4"
                  defaultChecked
                />
                <span className="text-sm text-gray-700 pl-2">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-300 electronics-category">
          <h2 className="text-md font-bold text-gray-900 mb-3">
            Electronics (Per Person)
          </h2>
          <div>
            {electronics.map((item, index) => (
              <div key={index} className="flex items-center p-1">
                <input
                  type="checkbox"
                  className="accent-violet-600 w-4 h-4"
                  defaultChecked
                />
                <span className="text-sm text-gray-700 pl-2">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="bg-violet-600 text-white mt-6 py-3 px-4 w-full rounded-lg">
        Save List
      </button>
    </div>
  );
};

export default PackingList;
