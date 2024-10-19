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
import ContributionProvider from "./context/ContributionContext";

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedStateId, setSelectedStateId] = useState(null);

  return (
    <>
      <Router>
        <UserProvider>
          <ContributionProvider>
            <Navbar
              setSelectedState={setSelectedState}
              selectedState={selectedState}
              selectedStateId={selectedStateId}
            />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <IndiaMap
                    setSelectedState={setSelectedState}
                    setSelectedStateId={setSelectedStateId}
                  />
                }
              />
              <Route
                exact
                path="/your-contributions"
                element={<YourContributionsPage />}
              />
              <Route exact path="/contact-dev" element={<ContactDevPage />} />
              <Route
                exact
                path={`/contribute/${selectedStateId}`}
                element={
                  <ContributePage
                    selectedState={selectedState}
                    selectedStateId={selectedStateId}
                  />
                }
              />
              <Route
                exact
                path={`/all-contributions/${selectedStateId}`}
                element={
                  <AllContributionsPage
                    selectedStateId={selectedStateId}
                    selectedState={selectedState}
                  />
                }
              />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/signup" element={<SignupPage />} />
            </Routes>
          </ContributionProvider>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
