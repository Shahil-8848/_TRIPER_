// src/App.tsx
import React from "react";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import Layout from "./Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/Auth/Login/Login";
import BusHub from "./pages/Search/BusHub/BusHub";
import { ThemeProvider } from "./Context/ThemeContext";
import Places from "./pages/Places/Places";
import { AuthProvider } from "./Context/AuthContext";
import UserDashboard from "./pages/UserInfo/UserDashboard/UserDashboard";
import UserProfile from "./pages/UserInfo/UserProfile/UserProfile";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {" "}
      {/* Use only BrowserRouter here */}
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/search" element={<BusHub />} />
              <Route path="/places/:id" element={<Places />} />
            </Route>
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/user_dashboard" element={<UserDashboard />}></Route>
            <Route path="/user_profile" element={<UserProfile />}></Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
