import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import AboutUs from "./pages/ContactUs";
import Workshops from "./pages/Workshops";
import PageUnderConstruction from "./pages/PageUnderCosntruction";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="workshops" element={<PageUnderConstruction />} />
        <Route path="about" element={<AboutUs />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
