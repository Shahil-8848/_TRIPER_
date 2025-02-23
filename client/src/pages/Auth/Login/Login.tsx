import React from "react";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import "./Login.css";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
};

export const SignInPage: React.FC = () => {
  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <SignIn routing="path" path="/sign-in" />
      </div>
    </div>
  );
};
