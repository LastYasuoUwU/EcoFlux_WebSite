import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Dashboard from "./pages/Dashboard/Dashboard";
import AboutUs from "./pages/AboutUs";
import Workshops from "./pages/Workshops";
import PageUnderConstruction from "./pages/PageUnderCosntruction";
import AuthenticationPage from "./pages/Authentication";
import { ClerkProvider } from "@clerk/clerk-react";
import { frFR } from "@clerk/localizations";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} localization={frFR}>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route element={<App />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="workshops" element={<Workshops />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="machines" element={<PageUnderConstruction />} />
        </Route>
      </Routes>
    </ClerkProvider>
  </BrowserRouter>
);
