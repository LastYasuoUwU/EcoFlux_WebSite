import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Dashboard from "./pages/Dashboard/Dashboard";
import AboutUs from "./pages/AboutUs";
import Workshops from "./pages/Workshops";
// import MachinesPage from "./pages/Machines";
import PageUnderConstruction from "./pages/PageUnderCosntruction";
import AuthenticationPage from "./pages/Authentication";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthenticationPage />} />
      <Route element={<App />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="workshops" element={<Workshops />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="machines" element={<PageUnderConstruction />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
