import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./BlogDetail.css";

function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top when blog changes
    window.scrollTo(0, 0);

    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://loalhost:5000/api/blogs/${blogId}`);
        setBlog(response.data);
      } catch (err) {
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
          {blog.categories.map((category) => (
            <Link to={`/category/${category}`} className="category-tag" key={category}>
              {category}
            </Link>
          ))}
        </div>

        <h1 className="blog-title">{blog.title}</h1>

        <div className="blog-meta">
          <span className="blog-date">{blog.date}</span>
          <span className="blog-author">{blog.author.name}</span>
        </div>

        {blog.coverImage && (
          <div className="blog-cover-image">
            <img src={blog.coverImage} alt={blog.title} />
          </div>
        )}
      </div>

      <div className="blog-content-wrapper">
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

        <div className="blog-content">
          {blog.content.map((section, index) => (
            <div className="blog-section" key={index} id={`section-${index + 1}`}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          ))}

          <div className="blog-author-box">
            <div className="author-image">
              {blog.author.image ? (
                <img src={blog.author.image} alt={blog.author.name} />
              ) : (
                <div className="author-initial">{blog.author.name.charAt(0)}</div>
              )}
            </div>
            <div className="author-info">
              <h3>Written by {blog.author.name}</h3>
              <p className="author-bio">{blog.author.bio}</p>
              <p className="author-company">{blog.author.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
