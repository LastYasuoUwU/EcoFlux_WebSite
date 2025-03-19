import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <p className="text-bold">Hello</p>
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
