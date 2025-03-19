import { Outlet } from "react-router";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { createTheme } from "@mui/material/styles";
import { Home, Users, Wrench, Zap } from "lucide-react";
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
  colorSchemes: { light: true, dark: true },
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
          logo: <Zap width={30} height={40} />,
          title: "Eco-flux",
          homeUrl: "/dashboard",
        }}
      >
        <DashboardLayout>
          <Outlet />
          {/* todo: add a footer component and remove it from all pages if exist */}
        </DashboardLayout>
      </AppProvider>
    </SnackbarProvider>
  );
}

export default App;
