import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BlogList.css";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
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
      navigate(`/en/blog/${blogId}`);
    }
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="blog-list-page">
      <div className="category-header">
        <h1>All Blogs</h1>
        <p>Explore our latest blogs</p>
      </div>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <div
            className="blog-card"
            key={blog.id}
            onClick={(e) => handleCardClick(blog.id, e)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleCardClick(blog.id, e);
              }
            }}
          >
            {blog.coverImage && (
              <div className="blog-card-image">
                <img src={blog.coverImage} alt={blog.title} />
              </div>
            )}

            <div className="blog-card-content">
              <h2 className="blog-card-title">{blog.title}</h2>
              <p className="blog-card-excerpt">{blog.excerpt}</p>

              <div className="blog-card-meta">
                <span className="blog-date">{blog.date}</span>
                <span className="blog-author">{blog.author.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
