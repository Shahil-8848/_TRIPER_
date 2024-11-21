import React from "react";
import { useAuth } from "../../../Context/AuthContext";
import "./UserProfile.css";
import {
  FaCamera,
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt,
  FaCalendar,
} from "react-icons/fa";

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p className="login-message">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        {/* Header Card */}
        <div className="profile-header-card">
          <div className="profile-header-content">
            <div className="profile-image-container">
              <img
                src={user.avatar_url}
                alt={`${user.username}'s profile`}
                className="profile-image"
              />
              <button className="camera-button">
                <FaCamera />
              </button>
            </div>

            <div className="profile-header-info">
              <h1 className="profile-name">{user.username}</h1>
              <p className="profile-email">
                <FaEnvelope />
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Details Cards */}
        <div className="profile-details-grid">
          {/* Personal Information */}
          <div className="profile-card">
            <div className="card-header">
              <h2 className="card-title">
                <FaUser />
                Personal Information
              </h2>
            </div>
            <div className="card-content">
              <div className="info-group">
                <div className="info-item">
                  <label>Username</label>
                  <p>{user.username}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className="info-item">
                  <label>Member ID</label>
                  <p>{user.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Activity */}
          <div className="profile-card">
            <div className="card-header">
              <h2 className="card-title">
                <FaCalendar />
                Account Activity
              </h2>
            </div>
            <div className="card-content">
              <div className="info-group">
                <div className="info-item">
                  <label>Total Bookings</label>
                  <p>0</p>
                </div>
                <div className="info-item">
                  <label>Member Since</label>
                  <p>2024</p>
                </div>
                <div className="info-item">
                  <label>Last Login</label>
                  <p>Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
