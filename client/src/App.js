import React, { useState } from "react";
import "./global.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndiaMap from "./components/IndiaMap";
import AllContributionsPage from "./pages/AllContributionsPage";
import ContactDevPage from "./pages/ContactDevPage";
import ContributePage from "./pages/ContributePage";
import YourContributionsPage from "./pages/YourContributionsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProvider from "./context/UserContext";

function App() {
  const [selectedState, setSelectedState] = useState(null);

  return (
    <>
      <Router>
        <UserProvider>
          <Navbar selectedState={selectedState} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <IndiaMap
                  selectedState={selectedState}
                  setSelectedState={setSelectedState}
                />
              }
            />
            <Route
              exact
              path="/your-contributions"
              element={<YourContributionsPage />}
            />
            <Route exact path="/contact-dev" element={<ContactDevPage />} />
            <Route exact path="/contribute" element={<ContributePage />} />
            <Route
              exact
              path="/all-contributions"
              element={<AllContributionsPage />}
            />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
