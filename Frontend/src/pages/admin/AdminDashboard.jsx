import React from "react";
import "./AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>You have successfully logged in as an admin.</p>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Manage Users</h2>
          <p>View and manage all users.</p>
        </div>
        <div className="dashboard-card">
          <h2>Manage Posts</h2>
          <p>View and manage all blog posts.</p>
        </div>
        {/* <div className="dashboard-card">
          <h2>Analytics</h2>
          <p>View website analytics and reports.</p>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;