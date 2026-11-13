import { useEffect, useRef, useState } from "react";
import {
  X,
  Send,
  Sparkles,
  MapPin,
  Utensils,
  Clock,
  MessageCircle,
  Bot,
  User,
  ArrowRight,
} from "lucide-react";

const quickPrompts = [
  {
    icon: MapPin,
    text: "Suggest nearby places",
  },
  {
    icon: Clock,
    text: "Make my day more relaxed",
  },
  {
    icon: Utensils,
    text: "Find vegetarian restaurants",
  },
];

const getDummyReply = (message) => {
  const text = message.toLowerCase();

  if (
    text.includes("vegetarian") ||
    text.includes("restaurant") ||
    text.includes("lunch") ||
    text.includes("food")
  ) {
    return "I'd suggest exploring local vegetarian restaurants near your planned route. You could add a traditional local restaurant for lunch and keep a lighter café stop for the evening. Would you like me to suggest a few options?";
  }

  if (
    text.includes("relaxed") ||
    text.includes("slow") ||
    text.includes("less") ||
    text.includes("busy")
  ) {
    return "Here's an idea for a more relaxed day: start your morning a little later, keep just 2–3 main activities, allow enough travel time between places, and include a longer lunch break. This will make your itinerary feel less rushed!";
  }

  if (
    text.includes("place") ||
    text.includes("visit") ||
    text.includes("nearby") ||
    text.includes("activity")
  ) {
    return "You can explore a nearby viewpoint, a local market, a garden, or a cultural attraction. I'd recommend choosing a place close to your existing activities to avoid unnecessary travel. You can also use Customize Day Plan to change your schedule.";
  }

  if (text.includes("budget") || text.includes("cheap")) {
    return "To make your trip more budget-friendly, consider local food spots, public transport where practical, free viewpoints, and grouping nearby attractions together. You can also reduce paid activities without making the day feel empty.";
  }

  return "That's a great question! I can help you improve your WanderWise itinerary, find places to visit, change meal stops, manage your daily schedule, or make your trip more relaxed. What would you like to explore?";
};

const AskAIPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const sendMessage = (messageText = input) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Dummy response for UI demonstration.
    // Replace this later with your actual AI API call.
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: getDummyReply(trimmedMessage),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Ask AI Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 ${
          isOpen
            ? "pointer-events-none translate-y-5 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <Sparkles size={19} />
        Ask AI
      </button>

      {/* Background Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/30 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Sliding Chat Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Sparkles size={22} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-800">
                WanderWise AI
              </h2>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-500">
                  Your travel assistant
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              title="Start a new chat"
              className="rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-violet-600"
            >
              New chat
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 px-5 py-5">
          {/* Welcome Message */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Bot size={17} />
            </div>

            <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-sm leading-6 text-slate-700">
                Hi there! 👋 I'm your WanderWise travel assistant.
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Need help planning your day, finding interesting places, or
                making your itinerary better? I'm here to help!
              </p>

              <span className="mt-2 block text-[10px] text-slate-400">
                WanderWise Assistant
              </span>
            </div>
          </div>

          {/* Quick Prompts - Show before first message */}
          {messages.length === 0 && (
            <div className="pl-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Try asking
              </p>

              <div className="space-y-2">
                {quickPrompts.map((prompt) => {
                  const Icon = prompt.icon;

                  return (
                    <button
                      key={prompt.text}
                      onClick={() => sendMessage(prompt.text)}
                      className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-left text-sm text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon size={16} />
                        {prompt.text}
                      </span>

                      <ArrowRight size={15} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2.5 ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                  message.sender === "user"
                    ? "bg-slate-200 text-slate-600"
                    : "bg-violet-100 text-violet-600"
                }`}
              >
                {message.sender === "user" ? (
                  <User size={16} />
                ) : (
                  <Bot size={17} />
                )}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.sender === "user"
                    ? "rounded-tr-sm bg-violet-600 text-white"
                    : "rounded-tl-sm border border-slate-100 bg-white text-slate-700"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-6">
                  {message.text}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Bot size={17} />
              </div>

              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-4">
                <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-4">
          <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your trip..."
              className="max-h-28 min-h-[42px] flex-1 resize-none bg-transparent px-2 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </div>

          <p className="mt-2 text-center text-[10px] text-slate-400">
            AI suggestions are for planning assistance. Always verify travel
            details.
          </p>
        </div>
      </aside>
    </>
  );
};

export default AskAIPanel;
