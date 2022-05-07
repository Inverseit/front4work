import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Menu from "./components/Menu";
import AuthProvider, { authContext } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import ProtectedRoute from "./utils/ProtectedRoute";
import TimeEntry from "./pages/TimeEntry";

function App() {
  const { auth } = useContext(authContext);
  return (
    <AuthProvider>
      <Menu />
      <div className="mt-5 flex justify-content-center">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<ProtectedRoute auth={auth} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/entry" element={<TimeEntry />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
