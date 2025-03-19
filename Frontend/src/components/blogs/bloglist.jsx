import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BlogList.css";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/blogs`);
        console.log(response.data);
        setBlogs(response.data);
      } catch (err) {
        setError("Failed to load blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleCardClick = (blogId, e) => {
    if (!e.target.closest(".category-tag")) {
      navigate(`/en/blogs/${blogId}`);
    }
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p className="error-message">{error}</p>;

  // Add this CSS to your page or update your CSS file
  const additionalStyles = `
    .blog-card-image {
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .blog-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  `;

  return (
    <div className="blog-list-page">
      <style>{additionalStyles}</style>
      <div className="category-header">
        <h1>All Blogs</h1>
        <p>Explore our latest blogs</p>
      </div>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <div
            className="blog-card"
            key={blog._id}
            onClick={(e) => handleCardClick(blog._id, e)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleCardClick(blog._id, e);
              }
            }}
          >
            {blog.coverImage && (
              <div className="blog-card-image">
                <img 
                  src={blog.coverImage.startsWith('http') ? blog.coverImage : `${API_BASE_URL}${blog.coverImage}`} 
                  alt={blog.title} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/350x200?text=Image+Not+Found';
                  }}
                />
              </div>
            )}

            <div className="blog-card-content">
              {blog.categories && blog.categories.length > 0 && (
                <div className="blog-card-categories">
                  {blog.categories.map((category, index) => (
                    <span key={index} className="category-tag">
                      {category}
                    </span>
                  ))}
                </div>
              )}
              
              <h2 className="blog-card-title">{blog.title}</h2>
              <p className="blog-card-excerpt">
                {blog.content && blog.content[0] ? 
                  (typeof blog.content[0] === 'string' ? 
                    blog.content[0].substring(0, 100) + '...' : 
                    "Read more...") : 
                  "Read more..."}
              </p>

              <div className="blog-card-meta">
                <span className="blog-date">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span className="blog-author">{blog.authorName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;