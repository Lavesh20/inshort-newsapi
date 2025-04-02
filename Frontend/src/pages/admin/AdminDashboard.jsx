import React from "react";
import "./AdminDashboard.css"; // Import the CSS file
import {  useNavigate } from "react-router";




const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleonClick = ()=>{
    console.log("clicked")
    navigate('/en/addnews')  
  }
  const goingBlog = ()=>{
    console.log("clicked")
    navigate('/en/customblog')  
  }
  
  return (
    <div className="admin-dashboard-container">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>You have successfully logged in as an admin.</p>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2 onClick={handleonClick}>Add News</h2>
          <p>View and manage all news.</p>
        </div>
        <div className="dashboard-card">
          <h2 onClick={goingBlog}>Add Blogs/Articles</h2>
          <p>View and manage all blog/articles.</p>
        </div>
         <div className="dashboard-card">
          <h2>News</h2>
          <p>Get all news</p>
        </div> 
        <div className="dashboard-card">
          <h2>Blogs</h2>
          <p>Get all Blogs</p>
        </div> 
      </div>
    </div>
  );
};

export default AdminDashboard;
