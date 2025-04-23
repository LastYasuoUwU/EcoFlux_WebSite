import { Outlet } from "react-router";
import { Bolt, Home, Users, Wrench } from "lucide-react";
import { SnackbarProvider } from "notistack";
import Footer from "./pages/layout/footer";
import { Header } from "./pages/layout/header";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Tableau du board",
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
    title: "Qui nous?",
    icon: <Users />,
  },
];

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Header />
      <Outlet />
      <Footer />
    </SnackbarProvider>
  );
}

export default App;
