import { useEffect, useState } from "react";

import {
  X,
  Sparkles,
  Flower2,
  Mountain,
  Wallet,
  Users,
  Car,
  Check,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Lightbulb,
} from "lucide-react";

const travelStyles = [
  {
    id: "relaxed",
    title: "More Relaxed",
    description: "Fewer activities, more free time",
    icon: Flower2,
  },
  {
    id: "adventure",
    title: "Adventurous",
    description: "More exciting experiences",
    icon: Mountain,
  },
  {
    id: "budget",
    title: "Budget Friendly",
    description: "Reduce travel expenses",
    icon: Wallet,
  },
  {
    id: "family",
    title: "Family Friendly",
    description: "Comfortable for everyone",
    icon: Users,
  },
  {
    id: "less-travel",
    title: "Less Travel",
    description: "Spend less time on the road",
    icon: Car,
  },
];

const sampleSuggestions = [
  {
    day: "Day 1",
    location: "Kochi",
    description: "Enjoy a relaxed Fort Kochi exploration.",
    change: "Reduced activities",
  },
  {
    day: "Day 2",
    location: "Munnar",
    description: "Explore tea gardens with more relaxation time.",
    change: "More free time",
  },
  {
    day: "Day 3",
    location: "Alleppey",
    description: "Enjoy a peaceful backwater experience.",
    change: "Improved schedule",
  },
];

function AdjustItineraryModal({ onClose, onApply }) {
  const [selectedStyle, setSelectedStyle] = useState("relaxed");
  const [customInstruction, setCustomInstruction] = useState("");
  const [step, setStep] = useState("preferences");
  const [loading, setLoading] = useState(false);

  // Close modal using Escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Temporary mock AI generation
  const handleGeneratePlan = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);
    setStep("results");
  };

  // Apply suggested plan
  const handleApplyPlan = () => {
    const updatedPlan = {
      preference: selectedStyle,
      instruction: customInstruction,
      suggestions: sampleSuggestions,
    };

    onApply?.(updatedPlan);
    onClose();
  };

  const selectedPreference = travelStyles.find(
    (style) => style.id === selectedStyle,
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4 rounded-lg"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="adjust-modal-title"
        className="w-full max-w-[650px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* ================= HEADER ================= */}

        <div className="flex items-start justify-between border-b border-slate-100 px-7 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Sparkles size={23} />
            </div>

            <div>
              <h2
                id="adjust-modal-title"
                className="text-xl font-bold text-slate-800"
              >
                {step === "preferences"
                  ? "Adjust Your Itinerary"
                  : "Your AI Suggestions"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {step === "preferences"
                  ? "Let AI personalize your travel experience."
                  : "Here's how we can improve your trip."}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-violet-100 hover:text-violet-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= PREFERENCES STEP ================= */}

        {step === "preferences" && (
          <div className="px-7 py-6">
            <h3 className="text-base font-semibold text-slate-800">
              How would you like to adjust your trip?
            </h3>

            <p className="mt-1 mb-5 text-sm text-slate-500">
              Choose the travel experience that suits you best.
            </p>

            {/* Travel Preference Cards */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {travelStyles.map((style) => {
                const Icon = style.icon;
                const isSelected = selectedStyle === style.id;

                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style.id)}
                    aria-pressed={isSelected}
                    className={`relative flex min-h-[130px] flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center transition duration-200 hover:-translate-y-0.5 hover:border-violet-300 ${
                      isSelected
                        ? "border-2 border-violet-500 bg-violet-50 shadow-sm"
                        : "border-slate-200 bg-white hover:bg-violet-50/40"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white">
                        <Check size={12} />
                      </span>
                    )}

                    <Icon
                      size={25}
                      className={
                        isSelected ? "text-violet-600" : "text-slate-500"
                      }
                    />

                    <strong className="text-sm font-semibold text-slate-800">
                      {style.title}
                    </strong>

                    <span className="text-xs leading-4 text-slate-500">
                      {style.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Instructions */}

            <div className="mt-6">
              <label
                htmlFor="custom-instruction"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Anything else you'd like AI to know?
                <span className="font-normal text-slate-400"> (Optional)</span>
              </label>

              <textarea
                id="custom-instruction"
                rows={3}
                maxLength={300}
                value={customInstruction}
                onChange={(e) => setCustomInstruction(e.target.value)}
                placeholder="e.g. Avoid long walks and include more relaxing activities..."
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />

              <p className="mt-1 text-right text-xs text-slate-400">
                {customInstruction.length}/300 characters
              </p>
            </div>

            {/* AI Information Box */}

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                <Sparkles size={21} />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-violet-900">
                  Let AI do the planning!
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your current trip details and preferences will be used to
                  suggest a better itinerary.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= RESULTS STEP ================= */}

        {step === "results" && (
          <div className="px-7 py-6">
            {/* Success Message */}

            <div className="mb-5 flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Sparkles size={22} />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-emerald-800">
                  Your updated plan is ready!
                </h4>

                <p className="mt-1 text-xs text-emerald-700">
                  AI has optimized your trip based on your preference.
                </p>
              </div>
            </div>

            {/* Selected Preference */}

            <div className="mb-6 flex items-center justify-between rounded-xl bg-violet-50 px-4 py-3">
              <span className="text-sm text-slate-600">
                Your selected preference
              </span>

              <strong className="text-sm text-violet-700">
                {selectedPreference?.title}
              </strong>
            </div>

            <h3 className="mb-4 text-base font-semibold text-slate-800">
              Suggested improvements
            </h3>

            {/* Suggestions */}

            <div className="space-y-3">
              {sampleSuggestions.map((item, index) => (
                <div
                  key={item.day}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-sm font-semibold text-violet-600">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <strong className="text-sm text-slate-800">
                        {item.day} – {item.location}
                      </strong>

                      <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                        {item.change}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Tip */}

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-violet-50 p-4 text-violet-600">
              <Lightbulb size={21} className="shrink-0" />

              <p className="text-xs leading-5 text-slate-600">
                Your schedule is now designed to provide a more enjoyable travel
                experience.
              </p>
            </div>
          </div>
        )}

        {/* ================= FOOTER ================= */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-7 py-5 sm:flex-row sm:justify-end">
          {step === "preferences" ? (
            <>
              <button
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleGeneratePlan}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <RefreshCw size={17} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Generate New Plan
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("preferences")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <ArrowLeft size={17} />
                Go Back
              </button>

              <button
                onClick={handleApplyPlan}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
              >
                <Check size={17} />
                Apply This Plan
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdjustItineraryModal;
