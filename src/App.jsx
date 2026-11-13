import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import TripSummary from "./pages/TripSummary";
import DayDetailsView from "./pages/DayDetailsView";
import PackagingList from "./pages/PackingList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trip-summary" element={<TripSummary />} />
        <Route path="/day-details" element={<DayDetailsView />} />
        <Route path="/packing-list" element={<PackagingList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
