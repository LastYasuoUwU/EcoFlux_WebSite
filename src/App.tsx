import { Outlet } from "react-router";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { createTheme } from "@mui/material/styles";
import { Bolt, Home, Users, Wrench, Zap } from "lucide-react";
import { DashboardLayout } from "@toolpad/core";
import { SnackbarProvider } from "notistack";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <Home />,
  },
  {
    segment: "workshops",
    title: "Ateliers",
    icon: <Wrench />,
  },
  {
    segment: "machines",
    title: "Machines",
    icon: <Bolt />,
  },
  {
    segment: "about",
    title: "About us",
    icon: <Users />,
  },
];

const demoTheme = createTheme({
  typography: {
    fontFamily: "inter",
  },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  //* if you want to ativate the dark mode
  colorSchemes: { light: true, dark: false },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AppProvider
        navigation={NAVIGATION}
        theme={demoTheme}
        branding={{
          logo: (
            <Zap width={30} height={40} className="text-blue-700 opacity-80" />
          ),
          title: "Eco-flux",
          homeUrl: "/dashboard",
        }}
      >
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
        {/* Simplified Footer - Now sticks to the bottom */}
        <footer className="bg-gray-800 text-gray-300 py-4 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p>Made by FADWA BOUKACHABA</p>
          </div>
        </footer>
      </AppProvider>
    </SnackbarProvider>
  );
}

export default App;
