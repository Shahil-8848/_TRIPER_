import React from "react";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import Layout from "./Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusHub from "./pages/Search/BusHub/BusHub";
import { ThemeProvider } from "./Context/ThemeContext";
import Places from "./pages/Places/Places";
import { AuthProvider } from "./Context/AuthContext";
import UserDashboard from "./pages/UserInfo/UserDashboard/UserDashboard";
import UserProfile from "./pages/UserInfo/UserProfile/UserProfile";
import Form from "./pages/Form/Form";
import { ProtectedRoute, SignInPage } from "./pages/Auth/Login/Login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/search" element={<BusHub />} />
              <Route path="/places/:id" element={<Places />} />
              <Route path="/form" element={<Form />} />
            </Route>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route
              path="/user_dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user_profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
