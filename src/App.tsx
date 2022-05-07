import { Routes, Route } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Menu />
      <div className="mt-5 flex justify-content-center">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
