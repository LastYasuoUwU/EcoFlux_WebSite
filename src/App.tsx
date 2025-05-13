import { Outlet } from "react-router";
import { SnackbarProvider } from "notistack";
import Footer from "./pages/layout/footer";
import { Header } from "./pages/layout/header";
import ProtectedRoute from "./core/protected";

function App() {
  return (
    <ProtectedRoute>
      <SnackbarProvider maxSnack={3}>
        <Header />
        <Outlet />
        <Footer />
      </SnackbarProvider>
    </ProtectedRoute>
  );
}

export default App;
