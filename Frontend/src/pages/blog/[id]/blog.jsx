import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./BlogDetail.css";

function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Define API base URL
  const API_BASE_URL = "http://localhost:5000"; // Fixed the typo in "localhost"

  useEffect(() => {
    // Scroll to top when blog changes
    window.scrollTo(0, 0);

    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/blogs/${blogId}`);
        console.log(response.data);
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!blog) return <div className="blog-not-found">Blog not found</div>;

  return (
    <div className="blog-detail">
      <div className="blog-detail-header">
        <div className="blog-categories">
          {blog.categories && blog.categories.map((category, index) => (
            <Link to={`/category/${category}`} className="category-tag" key={index}>
              {category}
            </Link>
          ))}
        </div>

        <h1 className="blog-title">{blog.title}</h1>

        <div className="blog-meta">
          <span className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span className="blog-author">{blog.authorName}</span>
        </div>

        {blog.coverImage && (
          <div className="blog-cover-image">
            <img 
              src={blog.coverImage.startsWith('http') ? blog.coverImage : `${API_BASE_URL}${blog.coverImage}`} 
              alt={blog.title} 
            />
          </div>
        )}
      </div>

      <div className="blog-content-wrapper">
        {/* Conditionally render table of contents if it exists */}
        {blog.tableOfContents && blog.tableOfContents.length > 0 && (
          <div className="table-of-contents">
            <h3>Table of Contents</h3>
            <ul>
              {blog.tableOfContents.map((item, index) => (
                <li key={index}>
                  <a href={`#section-${index + 1}`}>{index + 1}. {item}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="blog-content">
          {/* Handle different content structures */}
          {blog.content && Array.isArray(blog.content) && blog.content.map((section, index) => {
            // Check if section is an object with title and paragraphs
            if (typeof section === 'object' && section.title && section.paragraphs) {
              return (
                <div className="blog-section" key={index} id={`section-${index + 1}`}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              );
            } 
            // If it's a simple string, render as paragraph
            else if (typeof section === 'string') {
              return <p key={index}>{section}</p>;
            }
            // If it's an object with just text
            else if (typeof section === 'object' && section.text) {
              return <p key={index}>{section.text}</p>;
            }
            // Fallback for any other structure
            return null;
          })}

          {/* Author information - conditionally render if author data exists */}
          {blog.author ? (
            <div className="blog-author-box">
              <div className="author-image">
                {blog.author.image ? (
                  <img src={blog.author.image} alt={blog.author.name} />
                ) : (
                  <div className="author-initial">{blog.authorName?.charAt(0) || "A"}</div>
                )}
              </div>
              <div className="author-info">
                <h3>Written by {blog.author.name || blog.authorName}</h3>
                {blog.author.bio && <p className="author-bio">{blog.author.bio}</p>}
                {blog.author.company && <p className="author-company">{blog.author.company}</p>}
              </div>
            </div>
          ) : (
            <div className="blog-author-box">
              <div className="author-image">
                <div className="author-initial">{blog.authorName?.charAt(0) || "A"}</div>
              </div>
              <div className="author-info">
                <h3>Written by {blog.authorName}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;